import { IncomingHttpHeaders } from 'node:http'
import jwt from 'jsonwebtoken'
import { getTokenFromHeader } from './getTokenFromHeader'

export const getTenantIdFromHeaders = (headers: IncomingHttpHeaders) => {
  if (!headers.authorization) {
    throw new Error('Token not found in header')
  }

  const token = getTokenFromHeader(headers.authorization)
  const tokenPayload = jwt.decode(token, { json: true })

  if (!tokenPayload) {
    throw new Error('Cannot parse token')
  }

  if (tokenPayload.tenantId == null) {
    throw new Error('Token doesn\'t contain tenantId field')
  }

  const tenantId = Number(tokenPayload.tenantId)

  if (Number.isNaN(tenantId)) {
    throw new Error('Cannot parse tenantId field of token')
  }

  return tenantId
}
