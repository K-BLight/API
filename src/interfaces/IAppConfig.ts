export interface IAppConfig {
  /** The name of the API, defaults to `k-blight-api`. */
  apiName: string

  /** The prefix for the API, defaults to `/api/v1`. */
  apiPrefix: string

  /** The port the API will listen on, defaults to `8080`. */
  apiPort: number

  /** The version of the API, defaults to `0.0.1`. */
  apiVersion: string
}
