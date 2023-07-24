import { WinstonTransport as AxiomTransport } from '@axiomhq/axiom-node'
import Winston, { transports as WinstonTransports } from 'winston'

export const logger = Winston.createLogger({
  level: 'info',
  format: Winston.format.json(),
  defaultMeta: {
    service: 'k-blight-api',
    version: '0.0.1',
  },
  transports: [
    new AxiomTransport({
      dataset: process.env.AXIOM_DATA_SET,
      token: process.env.AXIOM_TOKEN,
      orgId: process.env.AXIOM_ORG_ID,
    }),
    new WinstonTransports.Console({
      format: Winston.format.combine(Winston.format.colorize(), Winston.format.simple()),
    }),
  ],
})
