import { ExtensionContext, languages, workspace } from 'coc.nvim'
import { BrowserCompletionProvider } from './provider'
import { statAsync, mkdirAsync } from './util'
import Server from './server'

export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration('coc.browser')
  const isEnable = config.get<boolean>('enable', true)
  if (!isEnable) return

  const { subscriptions, storagePath } = context

  const stat = await statAsync(storagePath)
  if (!stat || !stat.isDirectory()) {
    await mkdirAsync(storagePath)
  }

  let capacity = config.get<number>('capacity')
  if (capacity <= 0 || capacity >= 10) capacity = 5

  const server = new Server(capacity, storagePath)
  await server.start()
  const browserCompletionProvider = new BrowserCompletionProvider(server)

  subscriptions.push(
    languages.registerCompletionItemProvider(
      'coc-browser',
      config.get<string>('shortcut', "WEB"),
      null,
      browserCompletionProvider,
      [],
      config.get<number>('priority', 5)
    )
  )
}
