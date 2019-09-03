import {
  CompletionContext,
  CompletionItemProvider
} from 'coc.nvim'
import {
  CompletionItem,
  CompletionItemKind,
  CancellationToken,
  Position,
  TextDocument
} from 'vscode-languageserver-protocol'
import { readFileAsync, readdirAsync } from './util'
import path from 'path'
import Server from './server'

export class BrowserCompletionProvider implements CompletionItemProvider {

  private sourceDir: string
  constructor(server: Server) {
    this.sourceDir = server.sourceDir
  }

  public async provideCompletionItems(
    _document: TextDocument,
    _position: Position,
    _token: CancellationToken,
    _context: CompletionContext,
  ): Promise<CompletionItem[]> {
    const words = await this.gatherCandidates()
    return words.map<CompletionItem>(word => ({
      label: word,
      kind: CompletionItemKind.Text,
      insertText: word,
    }))
  }

  private async gatherCandidates(): Promise<string[]> {
    const words: string[] = []
    const files = await readdirAsync(this.sourceDir)
    let sourcePath: string
    let content: string
    for (const file of files) {
      sourcePath = path.join(this.sourceDir, file)
      content = await readFileAsync(sourcePath)
      words.push(...content.split(/\n/))
    }
    return words
  }
}
