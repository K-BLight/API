import Router from '@koa/router'

export class BaseEndpoint {
  router: Router

  constructor(prefix: string = process.env.API_PREFIX || '/api/v1') {
    this.router = new Router({ prefix })
  }

  /**
   * Build the endpoint/route and return the modified Router.
   */
  async build(): Promise<Router> {
    return this.router
  }
}
