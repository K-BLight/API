import { Successful } from '@4lch4/koa-oto'
import { logger } from '@4lch4/logger'
import { RouterContext } from '@koa/router'
import { StatusChangedEvent } from '../interfaces/index.js'
import { BaseEndpoint } from '../lib/index.js'

export class SlackEndpoint extends BaseEndpoint {
  async handleSlackEvent(ctx: RouterContext) {
    const event: StatusChangedEvent = ctx.request.body

    logger.info(`[SlackEndpoint#handleSlackEvent]: event: ${JSON.stringify(event)}`)

    return Successful.ok(ctx)
  }

  override async build() {
    this.router.post('/slack', ctx => {
      return this.handleSlackEvent(ctx)
    })

    return this.router
  }
}
