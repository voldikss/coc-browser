import { ExtensionContext, languages, workspace, commands } from 'coc.nvim'
import { BrowserCompletionProvider } from './provider'
import { statAsync, mkdirAsync } from './util'
import Server from './server'

export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration('browser')
  const isEnable = config.get<boolean>('enable', true)
  if (!isEnable) return

  const { subscriptions, storagePath } = context

  const stat = await statAsync(storagePath)
  if (!stat || !stat.isDirectory()) {
    await mkdirAsync(storagePath)
  }

  let capacity = config.get<number>('capacity')
  const port = config.get<number>('port', 8888)
  if (capacity <= 0 || capacity >= 10) capacity = 5

  const server = new Server(capacity, port, storagePath)
  await server.start()

  const minLength = config.get<number>('minLength')
  const maxLength = config.get<number>('maxLength')
  const browserCompletionProvider = new BrowserCompletionProvider(server, minLength, maxLength)

  subscriptions.push(server)

  subscriptions.push(
    commands.registerCommand(
      'browser.clearCandidates',
      async () => {
        await browserCompletionProvider.clearCandidates()
      }
    )
  )

  subscriptions.push(
    languages.registerCompletionItemProvider(
      'coc-browser',
      config.get<string>('shortcut', "WEB"),
      null,
      browserCompletionProvider,
      [],
      [],
      config.get<number>('priority', 5)
    )
  )
}
