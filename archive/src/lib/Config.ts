import { IAppConfig } from '../interfaces/index.js'

export function getAppConfig(): IAppConfig {
  return {
    apiName: process.env.API_NAME || 'k-blight-api',
    apiVersion: process.env.API_VERSION || '0.0.1',
    apiPort: parseInt(process.env.API_PORT || '8080'),
    apiPrefix: process.env.API_PREFIX || '/api/v1',
    upstashKafkaUrl: process.env.UPSTASH_KAFKA_URL || 'localhost:9092',
    upstashKafkaUsername: process.env.UPSTASH_KAFKA_USERNAME || 'admin',
    upstashKafkaPassword: process.env.UPSTASH_KAFKA_PASSWORD || 'admin',
  }
}
