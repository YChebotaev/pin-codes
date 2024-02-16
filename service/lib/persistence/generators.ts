import { knex } from '../knex'
import type { Generator } from './types'

export const generatorCreate = async ({ tenantId, numbers }: { tenantId: number, numbers: string }) => {
  const [{ id }] = await knex
    .insert({
      tenantId,
      size: 4,
      generatedCount: 0,
      numbers,
      createdAt: new Date().getTime()
    })
    .into('generators')
    .returning<{ id: number }[]>('id')

  return id
}

export const generatorsListAllByTenantId = async (tenantId: number) => {
  return (await knex
    .select<Generator[]>('*')
    .from('generators')
    .where('tenantId', tenantId)).filter(({ deleted }) => !deleted)
}

export const generatorIncrGeneratedCount = async (id: number) => {
  const { generatedCount } = await knex
    .select('generatedCount')
    .from('generators')
    .where('id', id)
    .first<Pick<Generator, 'generatedCount'>>()

  await knex('generators')
    .update({
      generatedCount: generatedCount + 1,
      updatedAt: new Date().getTime()
    })
    .where('id', id)
    .returning('id')
}

export const generatorSetSize = async (id: number, size: number) => {
  await knex('generators')
    .update({
      size,
      updatedAt: new Date().getTime()
    })
    .where('id', id)
    .returning('id')
}

export const generatorGet = async (id: number) => {
  return knex
    .select('*')
    .from('generators')
    .where('id', id)
    .first<Generator>()
}

export const generatorDelete = async (id: number) => {
  return knex('generators')
    .delete()
    .where('id', id)
}
