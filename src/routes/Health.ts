import { BaseEndpoint } from '../lib/index.js'
import { Successful } from '@4lch4/koa-oto'

export class HealthEndpoint extends BaseEndpoint {
  override async build() {
    this.router.get('/health/liveness', ctx => Successful.ok(ctx))
    this.router.get('/health/readiness', ctx => Successful.ok(ctx))

    return this.router
  }
}
