import path from "node:path";
import { type Knex } from "knex";

const dbName = process.env['DB_NAME']
const dbUser = process.env['DB_USER']
const dbUserPassword = process.env['DB_USER_PASSWORD']

let config: Knex.Config

if (dbName && dbUser && dbUserPassword) {
  config = {
    client: "pg",
    connection: {
      host: "localhost",
      database: dbName,
      user: dbUser,
      password: dbUserPassword,
    }
  }
} else {
  config = {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "dev.sqlite3"),
    },
  }
}

export { config }
