import { ExtensionContext, languages, workspace, commands } from 'coc.nvim'
import { BrowserCompletionProvider } from './completion'
import { fsStat, fsMkdir } from './util'
import Server from './server'

export async function activate(context: ExtensionContext): Promise<void> {
  const { subscriptions, storagePath } = context

  const config = workspace.getConfiguration('browser')

  const stat = await fsStat(storagePath)
  if (!(stat?.isDirectory())) {
    await fsMkdir(storagePath)
  }

  const capacity = config.get<number>('capacity')
  const port = config.get<number>('port', 8888)

  const server = new Server(capacity, port, storagePath)
  await server.start()

  const browserCompletionProvider = new BrowserCompletionProvider(
    server,
    config.get('minLength'),
    config.get('maxLength'),
    config.get('patterns')
  )

  subscriptions.push(server)

  subscriptions.push(
    commands.registerCommand(
      'browser.clearCache',
      async () => {
        await browserCompletionProvider.clearCache()
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
      config.get<number>('priority', 5),
      [],
    )
  )
}
