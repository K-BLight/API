import { logger } from '@4lch4/backpack'
import { Elysia } from 'elysia'
import { SlackEventEnvelope } from '~/types'
import { KafkaUtil, getUpstashConfig } from '../lib'

function validateEvent(envelope: SlackEventEnvelope): boolean {
  const validEvents = ['user_status_changed', 'user_huddle_changed']

  // Check if the event is a valid event type.
  if (validEvents.includes(envelope.event.type)) {
    // Check if the event is from Devin/Myself.
    if (envelope.event.user.real_name === 'Devin Leaman') return true
  }

  return false
}

const kafkaUtil = new KafkaUtil(getUpstashConfig())

export const SlackRoute = (app: Elysia) =>
  app.post('/slack', async ctx => {
    const envelope = ctx.body as SlackEventEnvelope
    logger.debug(`[SlackRoute#post]: POST request received...`)

    switch (envelope.type) {
      case 'url_verification':
        return envelope.challenge

      case 'event_callback': {
        if (validateEvent(envelope)) {
          try {
            logger.info(
              `[SlackEndpoint#handleSlackEvent|user_status_changed]: event: ${JSON.stringify(
                envelope,
                null,
                2,
              )}`,
            )

            const res = await kafkaUtil.sendStatus(envelope)

            logger.info(`[SlackUtil#handleEventCallback]: res: ${JSON.stringify(res, null, 2)}`)

            ctx.set.status = 202

            return res
          } catch (error) {
            logger.error(
              `[SlackUtil#handleEventCallback]: error: ${JSON.stringify(error, null, 2)}`,
            )

            ctx.set.status = 500

            return error
          }
        } else {
          ctx.set.status = 500

          return {
            message: 'Invalid event',
          }
        }
      }

      default:
        logger.error(`[SlackEndpoint#handleSlackEvent]: unknown event type: ${envelope.type}`)
        return 'OK'
    }
  })
