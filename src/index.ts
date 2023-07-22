import { printRoutes } from '@4lch4/koa-router-printer'
import { logger } from '@4lch4/logger'
import Koa from 'koa'
import { koaBody } from 'koa-body'
import Helmet from 'koa-helmet'
import { getAppConfig } from './lib/index.js'
import { getRoutes } from './routes/index.js'

const AppConfig = getAppConfig()

const app = new Koa()

app.use(Helmet())
app.use(koaBody())

for (const route of await getRoutes(AppConfig.apiPrefix)) {
  app.use(route.routes())
  app.use(route.allowedMethods())
}

printRoutes(app)

app.listen(AppConfig.apiPort, () => {
  logger.success(
    `${AppConfig.apiName}-v${AppConfig.apiVersion} has come online, listening on port ${AppConfig.apiPort}!`
  )
})
