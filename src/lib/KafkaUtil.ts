import { logger } from '@4lch4/backpack'
import { Kafka } from '@upstash/kafka'
import { SlackEventEnvelope, Status, UpstashConfig } from '../types/index'

export class KafkaUtil {
  private topic: string
  private kafka: Kafka

  public constructor({ url, username, password, topic }: UpstashConfig) {
    this.kafka = new Kafka({ url, username, password })
    this.topic = topic

    logger.info(`[KafkaUtil#constructor]: KafkaUtil initialized with topic: ${this.topic}`)
  }

  private getStatus(event: SlackEventEnvelope): Status {
    const { status_emoji } = event.event.user.profile

    if (status_emoji === ':spiral_calendar_pad:') return Status.Busy

    if (status_emoji === ':lunch:') return Status.Away

    if (event.event.user.profile.huddle_state === 'in_a_huddle') return Status.Busy

    return Status.Available
  }

  public async sendStatus(envelope: SlackEventEnvelope) {
    try {
      const status = this.getStatus(envelope)

      logger.info(`[SlackUtil#sendStatus]: status: ${JSON.stringify(status, null, 2)}`)

      const producer = this.kafka.producer()

      const res = await producer.produce(this.topic, { status })

      return res
    } catch (error) {
      throw error
    }
  }
}
