import { logger } from '@4lch4/backpack'
import { RouterContext } from '@koa/router'
import { SlackEventEnvelope, UpstashConfig } from '../types/index'
import { KafkaUtil } from './index'

export class SlackUtil {
  private kUtil: KafkaUtil

  public constructor(config: UpstashConfig) {
    this.kUtil = new KafkaUtil(config)
  }

  /**
   * Validates the provided Slack event to ensure it is an event that meets the following criteria:
   *
   * - The event is a `user_status_changed` or `user_huddle_changed` event.
   * - The event is from the user `Devin Leaman`.
   *
   * @param envelope The Slack event to validate.
   */
  private validateEvent(envelope: SlackEventEnvelope): boolean {
    const validEvents = ['user_status_changed', 'user_huddle_changed']

    // Check if the event is a valid event type.
    if (validEvents.includes(envelope.event.type)) {
      // Check if the event is from Devin/Myself.
      if (envelope.event.user.real_name === 'Devin Leaman') return true
    }

    return false
  }

  public async handleEventCallback(ctx: RouterContext) {
    const envelope: SlackEventEnvelope = ctx.request.body

    if (this.validateEvent(envelope)) {
      try {
        logger.info(
          `[SlackEndpoint#handleSlackEvent|user_status_changed]: event: ${JSON.stringify(
            envelope,
            null,
            2,
          )}`,
        )

        const res = await this.kUtil.sendStatus(envelope)

        logger.info(`[SlackUtil#handleEventCallback]: res: ${JSON.stringify(res, null, 2)}`)

        ctx.status = 202
        ctx.body = res

        return ctx
      } catch (error) {
        logger.error(`[SlackUtil#handleEventCallback]: error: ${JSON.stringify(error, null, 2)}`)

        ctx.status = 500

        return ctx
      }
    }

    ctx.status = 204

    return ctx
  }

  public handleURLVerification(ctx: RouterContext) {
    const envelope: SlackEventEnvelope = ctx.request.body

    ctx.status = 200
    ctx.body = envelope.challenge

    logger.debug(`[SlackUtil#handleURLVerification]: challenge: ${envelope.challenge}`)

    return ctx
  }
}
