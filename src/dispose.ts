// from https://github.com/iamcco/coc-zi/blob/master/src/common/dispose.ts
import { Disposable } from 'coc.nvim'

export class Dispose implements Disposable {
  private subscriptions: Disposable[] = []

  private push(subs: Disposable): void {
    this.subscriptions.push(subs)
  }

  public dispose(): void {
    if (this.subscriptions.length) {
      this.subscriptions.forEach(subs => {
        subs.dispose()
      })
      this.subscriptions = []
    }
  }
}
