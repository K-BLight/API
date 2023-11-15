import { HealthCheckRoutes, printRoutes } from '@4lch4/backpack/elysia'
import { logger } from '@4lch4/backpack/lib'
import { readPackageJSON } from '@4lch4/backpack/utils'
import { serverTiming } from '@elysiajs/server-timing'
import { swagger } from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
// import { AndroidRoute, GitHubRoutes, TodoistRoutes } from './routes'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageJson = await readPackageJSON(join(__dirname, '..', 'package.json'))

export const app = new Elysia({ prefix: '/api/v1', name: packageJson.displayName })
  .use(serverTiming())
  .use(HealthCheckRoutes('/status'))
  .use(
    swagger({
      documentation: {
        info: {
          title: packageJson.displayName!,
          version: packageJson.version!,
          description: packageJson.description!,
          license: { name: packageJson.license! },
          contact: {
            name: '4lch4',
            email: 'hey@4lch4.email',
            url: 'https://4lch4.com',
          },
        },
        servers: [
          {
            url: 'http://localhost:4242/api/v1',
            description: 'Localhost',
          },
          {
            description: 'Test',
            url: 'https://test.notigate.4lch4.io/api/v1',
          },
          {
            description: 'Production',
            url: 'https://notigate.4lch4.io/api/v1',
          },
        ],
        tags: [
          {
            name: 'Notification',
            description: 'Routes for receiving notifications from various services.',
          },
          {
            name: 'Health',
            description: 'Routes for checking the health of the API.',
          },
        ],
      },
    }),
  )
  .listen(process.env.API_PORT || 4242)

printRoutes(app.routes)

logger.success(`[index]: Server has come online at ${app.server?.hostname}:${app.server?.port}!`)
