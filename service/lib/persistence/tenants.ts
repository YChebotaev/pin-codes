import { knex } from '../knex'
import type { Tenant } from './types'

export const tenantCreate = async ({ name, email, password, passwordSalt }: { name: string, email: string, password: string, passwordSalt: string }) => {
  const [{ id }] = await knex
    .insert({
      name,
      email,
      password,
      passwordSalt,
      createdAt: new Date().getTime()
    })
    .into('tenants')
    .returning<{ id: number }[]>('id')

  return id
}

export const tenantGetByEmail = async (email: string) => {
  return knex
    .select('*')
    .from('tenants')
    .where('email', email)
    .first<Tenant>()
}
