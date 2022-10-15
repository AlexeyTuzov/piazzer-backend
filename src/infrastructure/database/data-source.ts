import { DataSource, DataSourceOptions } from 'typeorm'
import * as dotenv from 'dotenv'
dotenv.config()

export const dataSourceOptions: DataSourceOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),

	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,

	synchronize: false,
	logging: process.env.DB_DEBUG !== 'false',

	entities: ['dist/src/**/*.entity.js'],
	migrations: ['dist/src/infrastructure/database/migrations/*.js'],
}

const dataSource = new DataSource({
	...dataSourceOptions,
	host: 'localhost',
})
export default dataSource
