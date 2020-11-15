import { ConnectionOptions } from 'typeorm';

export const configProd: ConnectionOptions =  {
  type: "mssql",
  host: "localhost",
  port: 1433,
  username: "------b",
  password: "---",
  database: "-------",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: false
};
