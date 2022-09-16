const connection = process.env.POSTGRES_CONNECTION;
const host = process.env.POSTGRES_HOST;
const port = process.env.POSTGRES_PORT;
const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DB;

module.exports = {
  type: connection,
  host,
  port,
  username,
  password,
  database,

  entities: ['dist/**/entities/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
  migrations: ['dist/infrastructure/database/migrations/*.js'],
  migrationsTableName: 'migrations',
  cli: {
    migrationsDir: 'src/infrastructure/database/migrations',
  },
};
