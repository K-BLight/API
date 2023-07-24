import { RouterContext } from '@koa/router'
import { EnvelopedEvent, SlackEvent, UserStatusChangedEvent } from '@slack/bolt'
import { Kafka } from '@upstash/kafka'
import { logger } from './Logger.js'

export interface UpstashKafkaConfig {
  url: string
  topic: string
  username: string
  password: string
}

export class SlackUtil {
  private topic: string
  private kafka: Kafka

  public constructor({ url, username, password, topic }: UpstashKafkaConfig) {
    this.kafka = new Kafka({ url, username, password })
    this.topic = topic
  }

  private getStatus(event: EnvelopedEvent<UserStatusChangedEvent>) {
    const { status_emoji } = event.event.user.profile

    if (status_emoji === ':spiral_calendar_pad:') return 'Busy'

    return 'Available'
  }

  public async handleEventCallback(ctx: RouterContext) {
    const envelope: EnvelopedEvent<SlackEvent> = ctx.request.body

    if (envelope.event.type === 'user_status_changed') {
      try {
        logger.info(
          `[SlackEndpoint#handleSlackEvent|user_status_changed]: event: ${JSON.stringify(
            envelope,
            null,
            2
          )}`
        )

        const producer = this.kafka.producer()

        logger.info(
          `[SlackUtil#handleEventCallback]: producer: ${JSON.stringify(producer, null, 2)}`
        )

        const status = this.getStatus(envelope as EnvelopedEvent<UserStatusChangedEvent>)

        logger.info(`[SlackUtil#handleEventCallback]: status: ${JSON.stringify(status, null, 2)}`)

        const res = await producer.produce(this.topic, { status })

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
    const envelope: EnvelopedEvent<SlackEvent> = ctx.request.body

    ctx.status = 200
    ctx.body = envelope.challenge

    logger.debug(`[SlackUtil#handleURLVerification]: challenge: ${envelope.challenge}`)

    return ctx
  }
}
