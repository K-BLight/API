import Router from '@koa/router'
import { HealthEndpoint } from './Health.js'
import { SlackEndpoint } from './Slack.js'

const Endpoints = [HealthEndpoint, SlackEndpoint]

export async function getRoutes(prefix?: string): Promise<Router[]> {
  const routes: Router[] = []

  for (const Endpoint of Endpoints) {
    const endpoint = new Endpoint(prefix)
    routes.push(await endpoint.build())
  }

  return routes
}
