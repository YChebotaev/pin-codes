import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import jwt from 'jsonwebtoken'
import { logger } from '../logger'
import { getGeneratorIdFromHeaders } from './getGeneratorIdFromHeaders'
import { generateNumbers } from '../generateNumbers'
import { getTenantIdFromHeaders } from './getTenantIdFromHeaders'
import { tokenGuard } from './tokenGuard'
import { authRegister, authLogin, create, redeem, lookup } from './handlers'
import { generatorCreate, generatorDelete, generatorsListAllByTenantId } from '../persistence'

export const app = fastify({ logger })

app.register(fastifyCors, { origin: true })

app.post<{
  Body: {
    name: string
    email: string
    password: string
    passwordConfirm: string
  }
}>('/auth/register', {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'email', 'password', 'passwordConfirm'],
      additionalProperties: false,
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        passwordConfirm: { type: 'string' },
      }
    }
  }
}, async ({ body: { name, email, password, passwordConfirm } }) => {
  const tenantId = await authRegister({ name, email, password, passwordConfirm })

  return {
    token: jwt.sign({ tenantId }, process.env['JWT_SECRET']!)
  }
})

app.post<{
  Body: {
    email: string
    password: string
  }
}>('/auth/login', {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      additionalProperties: false,
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      }
    }
  }
}, async ({ body: { email, password } }) => {
  const tenantId = await authLogin({ email, password })

  if (!tenantId) {
    throw new Error('Tenant password does not match')
  }

  return {
    token: jwt.sign({ tenantId }, process.env['JWT_SECRET']!)
  }
})

app.get<{
  Params: {
    tenantId: string
  }
}>('/tenants/:tenantId/generators', async ({ headers, params: { tenantId: tenantIdStr } }) => {
  // TODO: Make security

  const tenantId = Number(tenantIdStr)
  const generators = await generatorsListAllByTenantId(tenantId)

  return generators.map(({ id, generatedCount, size }) => ({
    id,
    generatedCount,
    size
  }))
})

app.delete<{
  Params: {
    tenantId: string
    generatorId: string
  }
}>('/tenants/:tenantId/generators/:generatorId', async ({ headers, params: { tenantId: tenantIdStr, generatorId: generatorIdStr } }) => {
  // TODO: Make security

  const tenantId = Number(tenantIdStr)
  const generatorId = Number(generatorIdStr)

  await generatorDelete(generatorId)
})

app.post<{
  Params: {
    tenantId: string
  }
}>('/tenants/:tenantId/generators', async ({ params: { tenantId: tenantIdStr } }) => {
  // TODO: Make security

  const tenantId = Number(tenantIdStr)

  const generatorId = await generatorCreate({
    tenantId,
    numbers: generateNumbers()
  })

  return {
    token: jwt.sign({ tenantId, generatorId }, process.env['JWT_SECRET']!)
  }
})

app.post<{
  Body: {
    payload: any
  }
}>('/create', {
  schema: {
    headers: {
      Authorization: { type: 'string' }
    },
    body: {
      type: 'object',
      required: ['payload'],
      additionalProperties: false,
      properties: {
        payload: {}
      }
    }
  }
}, async ({ headers, body: { payload } }) => {
  tokenGuard(headers)

  const generatorId = getGeneratorIdFromHeaders(headers)

  return create({ generatorId, payload })
})

app.get<{
  Querystring: {
    code: string
  }
}>('/lookup', {
  schema: {
    headers: {
      Authorization: { type: 'string' }
    },
    querystring: {
      type: 'object',
      properties: {
        code: { type: 'string' }
      }
    }
  }
}, async ({ headers, query: { code } }) => {
  tokenGuard(headers)

  const tenantId = getTenantIdFromHeaders(headers)

  return lookup({ tenantId, code })
})

app.post<{
  Body: {
    code: string
  }
}>('/redeem', {
  schema: {
    headers: {
      Authorization: { type: 'string' }
    },
    body: {
      type: 'object',
      required: ['code'],
      additionalProperties: false,
      properties: {
        code: { type: 'string' }
      }
    }
  }
}, async ({ headers, body: { code } }) => {
  tokenGuard(headers)

  const tenantId = getGeneratorIdFromHeaders(headers)

  return redeem({ tenantId, code })
})
