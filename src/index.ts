import { printRoutes } from '@4lch4/koa-router-printer'
import Koa from 'koa'
import { koaBody } from 'koa-body'
import Helmet from 'koa-helmet'
import { getAppConfig } from './lib/index.js'
import { getRoutes } from './routes/index.js'
import { logger } from '@4lch4/logger'

const { apiName, apiPort, apiPrefix, apiVersion } = getAppConfig()

const app = new Koa()

app.use(Helmet())
app.use(koaBody())

for (const route of await getRoutes(apiPrefix)) {
  app.use(route.routes())
  app.use(route.allowedMethods())
}

printRoutes(app)

app.listen(apiPort, () => {
  logger.success(`${apiName}-v${apiVersion} has come online, listening on port ${apiPort}!`)
})
