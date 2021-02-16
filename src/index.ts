import { ExtensionContext, languages, workspace, commands } from 'coc.nvim'
import { BrowserCompletionProvider } from './completion'
import { fsStat, fsMkdir } from './util'
import Server from './server'

export async function activate(context: ExtensionContext): Promise<void> {
  const { subscriptions, storagePath } = context
  const stat = await fsStat(storagePath)
  if (!(stat?.isDirectory())) {
    await fsMkdir(storagePath)
  }

  const config = workspace.getConfiguration('browser')

  const server = new Server(
    config.get<number>('port'),
    storagePath
  )
  await server.start()
  subscriptions.push(server)

  const browserCompletionProvider = new BrowserCompletionProvider(
    server,
    config.get<Record<string, string[]>>('patterns')
  )

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
      config.get<string>('shortcut'),
      null,
      browserCompletionProvider,
      [],
      config.get<number>('priority'),
      [],
    )
  )
}
