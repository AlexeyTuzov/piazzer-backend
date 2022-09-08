import { Global, Module } from "@nestjs/common";
import { DataSource } from "typeorm";
import TypeOrmDataSource from "./typeorm.datasource";

@Global()
@Module({
    providers: [
        {
            provide: DataSource,
            useFactory: async () => {
                TypeOrmDataSource.setOptions({
                    type: 'postgres',
                    host: process.env.POSTGRES_HOST,
                    username: process.env.POSTGRES_USER,
                    database: process.env.POSTGRES_DB,
                    password: process.env.POSTGRES_PASSWORD || 'root',
                    port: Number(process.env.POSTGRES_PORT),
                    entities: [`${__dirname}/**/**.entity{.js,.ts}`],
                    migrations: [`${__dirname}/migrations/**/*{.ts,.js}`]
                })
                await TypeOrmDataSource.initialize();
                return TypeOrmDataSource;
            }
        }
    ],
    exports: [DataSource]
})
export default class DataSourceModule { };