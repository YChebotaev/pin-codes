import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> =>
  knex.schema.createTable('tenants', table => {
    table.increments('id')

    table.string('name')
    table.string('email')
    table.string('password')
    table.string('passwordSalt')

    table.boolean('deleted').nullable()
    table.bigInteger('createdAt')
    table.bigInteger('updatedAt').nullable()

    table.index('email')
  })

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable('tenants')
