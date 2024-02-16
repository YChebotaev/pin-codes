import { createHash } from 'node:crypto'
import { tenantGetByEmail } from '../../persistence'

export const authLogin = async ({ email, password }: {
  email: string
  password: string
}) => {
  const tenant = await tenantGetByEmail(email)

  if (!tenant) {
    throw new Error('Tenant password does not match')
  }

  const { passwordSalt, password: tenantPasswordHash } = tenant
  const passwordPepper = process.env['PASSWORD_PEPPER']!
  const passwordHash = createHash('sha256')
    .update(passwordSalt)
    .update(passwordPepper)
    .update(password)
    .digest('hex')

  if (tenantPasswordHash === passwordHash) {
    return tenant.id
  }
}
