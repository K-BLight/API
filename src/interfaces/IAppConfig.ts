export interface IAppConfig {
  /** The name of the API, defaults to `k-blight-api`. */
  apiName: string

  /** The prefix for the API, defaults to `/api/v1`. */
  apiPrefix: string

  /** The port the API will listen on, defaults to `8080`. */
  apiPort: number

  /** The version of the API, defaults to `0.0.1`. */
  apiVersion: string

  /** The URL of the Upstash Kafka instance, defaults to `localhost:9092`. */
  upstashKafkaUrl: string

  /** The username for the Upstash Kafka instance, defaults to `admin`. */
  upstashKafkaUsername: string

  /** The password for the Upstash Kafka instance, defaults to `admin`. */
  upstashKafkaPassword: string
}
