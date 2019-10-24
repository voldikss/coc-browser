import http from 'http'
import path from 'path'
import { workspace } from 'coc.nvim'
import { writeFileAsync } from './util'

export default class Server {
  private counter = 0
  constructor(
    private capacity: number,
    private port: number,
    public sourceDir: string,
  ) { }

  public async start(): Promise<void> {
    const server = new http.Server()
    server.listen(this.port)
    // if there is already a server running on the port
    // then close this server
    server.once('error', () => {
      server.close()
    })
    server.once('listening', () => {
      // todo: write to CocLog
    })
    server.on('request', (request, response) => {
      let words = ''
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

  public async stop() {
    // TODO
  }

  public async saveWords(text: string): Promise<void> {
    const { sourceDir } = this
    const sourcePath = path.join(sourceDir, `${this.counter % this.capacity}.dat`)
    await writeFileAsync(sourcePath, text)
    this.counter++
  }
}
