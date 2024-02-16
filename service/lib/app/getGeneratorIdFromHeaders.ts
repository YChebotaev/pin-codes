import { IncomingHttpHeaders } from 'node:http'
import jwt from 'jsonwebtoken'
import { getTokenFromHeader } from './getTokenFromHeader'

export const getGeneratorIdFromHeaders = (headers: IncomingHttpHeaders) => {
  if (!headers.authorization) {
    throw new Error('Token not found in header')
  }

  const token = getTokenFromHeader(headers.authorization)
  const tokenPayload = jwt.decode(token, { json: true })

  if (!tokenPayload) {
    throw new Error('Cannot parse token')
  }

  if (tokenPayload.generatorId == null) {
    throw new Error('Token doesn\'t contain generatorId field')
  }

  const generatorId = Number(tokenPayload.generatorId)

  if (Number.isNaN(generatorId)) {
    throw new Error('Cannot parse generatorId field of token')
  }

  return generatorId
}
