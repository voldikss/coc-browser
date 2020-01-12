import http from 'http'
import path from 'path'
import { workspace } from 'coc.nvim'
import { writeFileAsync } from './util'
import { Dispose } from './dispose'

export default class Server extends Dispose {
  private counter = 0
  private server
  constructor(
    private capacity: number,
    private port: number,
    public sourceDir: string,
  ) { super() }

  public async start(): Promise<void> {
    this.server = new http.Server()
    this.server.listen(this.port)
    // if there is already a server running on the port
    // then close this server
    this.server.once('error', () => {
      this.server.close()
    })
    this.server.once('listening', () => {
      // todo: write to CocLog
    })
    let words = ''
    this.server.on('request', (request, response) => {
      request.on('data', data => {
        words += data
      })
      request.on('end', async () => {
        await this.saveWords(words)
      })
      request.on('error', e => {
        workspace.showMessage(`request error from browser: ${e.message}`)
      })
      response.writeHead(200, { 'Content-Type': 'text/plain' })
      response.write('response from coc-browser local server\n')
      response.end()
    })
  }

  public dispose(): void {
    this.server.close(() => {
      // nop
    })
  }

  public async saveWords(text: string): Promise<void> {
    const { sourceDir } = this
    const sourcePath = path.join(sourceDir, `${this.counter % this.capacity}.dat`)
    await writeFileAsync(sourcePath, text)
    this.counter++
  }
}
