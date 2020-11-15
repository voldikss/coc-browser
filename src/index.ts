import { ExtensionContext, languages, workspace, commands } from 'coc.nvim'
import { BrowserCompletionProvider } from './completion'
import { fsStat, fsMkdir } from './util'
import Server from './server'

export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration('browser')
  const isEnable = config.get<boolean>('enable', true)
  if (!isEnable) return

  const { subscriptions, storagePath } = context

  const stat = await fsStat(storagePath)
  if (!(stat?.isDirectory())) {
    await fsMkdir(storagePath)
  }

  let capacity = config.get<number>('capacity')
  const port = config.get<number>('port', 8888)
  if (capacity <= 0 || capacity >= 10) capacity = 5

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
