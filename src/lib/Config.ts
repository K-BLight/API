import { hostname } from 'os'
import { ApiConfig, AppConfig, UpstashConfig } from '../types'

/**
 * Creates an object containing all of the configuration values for the API and returns them. If any
 * of the values are missing, a default value will be used instead:
 *
 * - `API_NAME`: `k-blight-api`
 * - `API_VERSION`: `0.0.1`
 * - `API_PORT`: `8080`
 * - `API_PREFIX`: `/api/v1`
 *
 * @returns An object containing all of the configuration values for the API.
 */
export function getApiConfig(): ApiConfig {
  return {
    name: process.env.API_NAME || 'k-blight-api',
    version: process.env.API_VERSION || '0.0.1',
    port: parseInt(process.env.API_PORT || '8080'),
    prefix: process.env.API_PREFIX || '/api/v1',
  }
}

/**
 * Creates an object containing all of the configuration values for Upstash and returns them if
 * they all exist. For example, if there is no `UPSTASH_KAFKA_URL`, `UPSTASH_KAFKA_USERNAME`, or
 * `UPSTASH_KAFKA_PASSWORD` environment variable, an error will be thrown indicating they're
 * missing. This is because all of these values are required for the API to function. The only
 * upstash value that can be missing is the `UPSTASH_KAFKA_TOPIC` environment variable, which will
 * default to the hostname of the machine the API is running on.
 *
 * @returns An object containing all of the Upstash configuration values.
 */
export function getUpstashConfig(): UpstashConfig {
  const url = process.env.UPSTASH_KAFKA_URL
  const username = process.env.UPSTASH_KAFKA_USERNAME
  const password = process.env.UPSTASH_KAFKA_PASSWORD
  const topic = process.env.UPSTASH_KAFKA_TOPIC || hostname()

  if (!url) throw new Error('Missing required environment variable: UPSTASH_KAFKA_URL')
  if (!username) throw new Error('Missing required environment variable: UPSTASH_KAFKA_USERNAME')
  if (!password) throw new Error('Missing required environment variable: UPSTASH_KAFKA_PASSWORD')
  if (!topic) throw new Error('Missing required environment variable: UPSTASH_KAFKA_TOPIC')

  return { url, username, password, topic }
}

/**
 * Creates an object containing all of the configuration values for the API and returns them if they
 * all exist. For example, if there is no `UPSTASH_KAFKA_URL`, `UPSTASH_KAFKA_USERNAME`, or
 * `UPSTASH_KAFKA_PASSWORD` environment variable, an error will be thrown indicating they're
 * missing. This is because all of these values are required for the API to function. The only
 * upstash value that can be missing is the `UPSTASH_KAFKA_TOPIC` environment variable, which will
 * default to the hostname of the machine the API is running on.
 *
 * @returns An object containing all of the application's configuration.
 */
export function getAppConfig(): AppConfig {
  return { api: getApiConfig(), upstash: getUpstashConfig() }
}
