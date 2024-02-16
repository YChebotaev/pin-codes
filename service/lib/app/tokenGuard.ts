import { IncomingHttpHeaders } from 'node:http'
import jwt from 'jsonwebtoken'
import { getTokenFromHeader } from './getTokenFromHeader'

export const tokenGuard = (headers: IncomingHttpHeaders) => {
  if (!headers.authorization) {
    throw new Error('Token not found in header')
  }

  const token = getTokenFromHeader(headers.authorization)
  const jwtSecret = process.env['JWT_SECRET']

  if (!jwtSecret) {
    throw new Error('JWT_SECRET not set')
  }

  return jwt.verify(token, jwtSecret)
}
