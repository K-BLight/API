import { logger } from '@4lch4/logger'
import { RouterContext } from '@koa/router'
import { EnvelopedEvent, SlackEvent, UserStatusChangedEvent } from '@slack/bolt'
import { Kafka } from '@upstash/kafka'

export interface UpstashKafkaConfig {
  url: string
  username: string
  password: string
}

export class SlackUtil {
  private kafka: Kafka

  public constructor({ url, username, password }: UpstashKafkaConfig) {
    this.kafka = new Kafka({ url, username, password })
  }

  private getStatusInfo(event: EnvelopedEvent<UserStatusChangedEvent>) {
    return {
      status_emoji: event.event.user.profile.status_emoji,
      status_text: event.event.user.profile.status_text,
    }
  }

  public async handleEventCallback(ctx: RouterContext) {
    const envelope: EnvelopedEvent<SlackEvent> = ctx.request.body

    if (envelope.event.type === 'user_status_changed') {
      logger.info(
        `[SlackEndpoint#handleSlackEvent|user_status_changed]: event: ${JSON.stringify(
          envelope,
          null,
          2
        )}`
      )

      const producer = this.kafka.producer()

      const status = this.getStatusInfo(envelope as EnvelopedEvent<UserStatusChangedEvent>)

      const res = await producer.produce('topic', { status })

      logger.info(`[SlackUtil#handleEventCallback]: res: ${JSON.stringify(res, null, 2)}`)

      ctx.status = 200
      ctx.body = res

      return ctx
    }

    ctx.status = 204

    return ctx
  }

  public handleURLVerification(ctx: RouterContext) {
    const envelope: EnvelopedEvent<SlackEvent> = ctx.request.body

    ctx.status = 200
    ctx.body = envelope.challenge

    logger.debug(`[SlackUtil#handleURLVerification]: challenge: ${envelope.challenge}`)

    return ctx
  }
}
