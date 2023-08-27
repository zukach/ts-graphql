import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import { Product } from './entities/Products'

dotenv.config()

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Product],
  synchronize: true,
})