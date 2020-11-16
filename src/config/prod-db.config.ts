import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';

export const configProd: SqlServerConnectionOptions =  {
  type: "mssql",
  host: process.env.DB_HOST,
  port: 1433,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  options: {
    encrypt: true
  },
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: false
};
