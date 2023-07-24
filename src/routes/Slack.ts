import { Successful } from '@4lch4/koa-oto'
import { RouterContext } from '@koa/router'
import { EnvelopedEvent, SlackEvent } from '@slack/bolt'
import { BaseEndpoint, SlackUtil, logger } from '../lib/index.js'

export class SlackEndpoint extends BaseEndpoint {
  async handleSlackEvent(ctx: RouterContext) {
    const envelope: EnvelopedEvent<SlackEvent> = ctx.request.body
    const slackUtil = new SlackUtil({
      url: process.env.UPSTASH_KAFKA_URL || '',
      username: process.env.UPSTASH_KAFKA_USERNAME || '',
      password: process.env.UPSTASH_KAFKA_PASSWORD || '',
      topic: process.env.UPSTASH_KAFKA_TOPIC || '',
    })

    logger.info(`[SlackEndpoint#handleSlackEvent]: event: ${JSON.stringify(envelope, null, 2)}`)

    switch (envelope.type) {
      // @ts-ignore This is a valid case, but the type definition doesn't account for it. It occurs
      // when Slack is verifying the URL while setting up the app.
      case 'url_verification':
        return slackUtil.handleURLVerification(ctx)

      case 'event_callback':
        return slackUtil.handleEventCallback(ctx)

      default:
        logger.error(`[SlackEndpoint#handleSlackEvent]: unknown event type: ${envelope.type}`)
        return Successful.ok(ctx)
    }
  }

  override async build() {
    this.router.post('/slack', async ctx => this.handleSlackEvent(ctx))

    return this.router
  }
}
