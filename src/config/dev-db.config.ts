import { ConnectionOptions } from 'typeorm';

export const configDev: ConnectionOptions =  {
  type: "mssql",
  host: "localhost",
  port: 1433,
  username: "gift_draw_db",
  password: "testdb",
  database: "gift_draw_local",
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: false
};
