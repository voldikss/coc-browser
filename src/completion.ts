import {
  CompletionItemProvider,
  workspace,
} from 'coc.nvim'
import {
  CompletionItem,
  CompletionItemKind,
  Position,
  Range,
  TextDocument
} from 'vscode-languageserver-protocol'
import { fsReadFile, fsReadDir, fsRmFile } from './util'
import path from 'path'
import Server from './server'

export class BrowserCompletionProvider implements CompletionItemProvider {

  private sourceDir: string
  constructor(
    server: Server,
    private minLength: number,
    private maxLength,
    private patterns
  ) { this.sourceDir = server.sourceDir }

  public async provideCompletionItems(document: TextDocument, position: Position): Promise<CompletionItem[]> {
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
        let sourcePath = path.join(this.sourceDir, f)
        return fsReadFile(sourcePath)
          .then(content => content
            .split(/\n/)
            .filter(w => w.length >= this.minLength && w.length <= this.maxLength))
          .catch(_ => [])
      }))
        .then(results => {
          let words: string[] = Array.prototype.concat.apply([], results)
          let candidates = [...new Set(words)]
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

  public async clearCandidates(): Promise<void> {
    const sourceFiles = await fsReadDir(this.sourceDir)
    for (const file of sourceFiles) {
      const filepath = path.join(this.sourceDir, file)
      await fsRmFile(filepath)
    }
  }
}
