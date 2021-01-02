import {
  CompletionItem,
  CompletionItemKind,
  CompletionItemProvider,
  Position,
  ProviderResult,
  Range,
  TextDocument,
  workspace,
} from 'coc.nvim'
import { fsReadFile, fsReadDir, fsRmFile } from './util'
import path from 'path'
import Server from './server'

export class BrowserCompletionProvider implements CompletionItemProvider {
  private sourceDir: string
  constructor(
    server: Server,
    private filterLength: number[],
    private patterns: Record<string, string[]>
  ) { this.sourceDir = server.cacheDir }

  provideCompletionItems(document: TextDocument, position: Position): ProviderResult<CompletionItem[]> {
    const { languageId, uri } = document

    const patterns = this.patterns['*'] || this.patterns[languageId]
    if (!patterns) return []

    const doc = workspace.getDocument(uri)
    if (!doc) return []

    const wordRange = doc.getWordRangeAtPosition(Position.create(position.line, position.character - 1))
    if (!wordRange) return []

    const word = document.getText(wordRange)
    const linePre = document.getText(Range.create(Position.create(position.line, 0), position))
    if (!patterns.length || patterns.some(p => new RegExp(p).test(linePre))) {
      return this.gatherCandidates(word)
    }
    return []
  }

  private async gatherCandidates(word): Promise<CompletionItem[]> {
    const files = await fsReadDir(this.sourceDir)
    return new Promise((resolve, reject) => {
      Promise.all(files.map(f => {
        const sourcePath = path.join(this.sourceDir, f)
        return fsReadFile(sourcePath)
          .then(content => content
            .split(/\n/)
            .filter(w => w.length >= this.filterLength[0] && w.length <= this.filterLength[1]))
          .catch(e => reject(e))
      }))
        .then(results => {
          const words: string[] = Array.prototype.concat.apply([], results)
          const candidates = [...new Set(words)]
            .filter(w => new RegExp(word).test(w))
            .map<CompletionItem>(word => ({
              label: word,
              kind: CompletionItemKind.Text,
              insertText: word,
            }))
          resolve(candidates)
        })
        .catch(e => reject(e))
    })
  }

  public async clearCache(): Promise<void> {
    const sourceFiles = await fsReadDir(this.sourceDir)
    for (const file of sourceFiles) {
      const filepath = path.join(this.sourceDir, file)
      await fsRmFile(filepath)
    }
  }
}
