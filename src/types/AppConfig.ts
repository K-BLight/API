/**
 * This type defines the shape of the object containing all of the configuration values used
 * throughout the API.
 */
export type AppConfig = {
  /** Contains the config values relevant to the API alone, such as the port. */
  api: ApiConfig

  /** Contains the config values relevant to my Upstash tenant. */
  upstash: UpstashConfig
}

/** Contains the config values relevant to the API alone, such as the port. */
export type ApiConfig = {
  /** The name of the API, defaults to `k-blight-api`. */
  name: string

  /** The prefix for the API, defaults to `/api/v1`. */
  prefix: string

  /** The port the API will listen on, defaults to `8080`. */
  port: number

  /** The version of the API, defaults to `0.0.1`. */
  version: string
}

/** Contains the config values relevant to my Upstash tenant. */
export type UpstashConfig = {
  /** The URL of my Upstash Kafka tenant. */
  url: string

  /** The username for the Upstash tenant. */
  username: string

  /** The password for the Upstash tenant. */
  password: string

  /** The topic for the Upstash tenant. */
  topic: string
}
