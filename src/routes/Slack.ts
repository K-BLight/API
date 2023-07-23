import { Successful } from '@4lch4/koa-oto'
import { logger } from '@4lch4/logger'
import { RouterContext } from '@koa/router'
import { ISlackEvent } from '../interfaces/index.js'
import { BaseEndpoint } from '../lib/index.js'

export class SlackEndpoint extends BaseEndpoint {
  async handleSlackEvent(ctx: RouterContext) {
    const event: ISlackEvent = ctx.request.body

    logger.info(`[SlackEndpoint#handleSlackEvent]: event: ${JSON.stringify(event, null, 2)}`)

    switch (event.type) {
      case 'url_verification': {
        ctx.status = 200
        ctx.body = event.challenge

        return ctx
      }

      case 'event_callback': {
        if (event.event?.type === 'user_status_changed') {
          logger.info(`[SlackEndpoint#handleSlackEvent|user_status_changed]: event: ${JSON.stringify(event, null, 2)}`)
        }
      }
    }

    return Successful.ok(ctx)
  }

  override async build() {
    this.router.post('/slack', ctx => {
      return this.handleSlackEvent(ctx)
    })

    return this.router
  }
}
