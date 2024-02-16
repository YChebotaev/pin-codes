import { createHash, randomBytes } from 'node:crypto'
import { tenantCreate } from '../../persistence'

export const authRegister = async ({ name, email, password, passwordConfirm }: {
  name: string
  email: string
  password: string
  passwordConfirm: string
}) => {
  const passwordSalt = randomBytes(20).toString('hex')
  const passwordPepper = process.env['PASSWORD_PEPPER']!
  const passwordHash = createHash('sha256')
    .update(passwordSalt)
    .update(passwordPepper)
    .update(password)
    .digest('hex')

  return tenantCreate({
    name,
    email,
    password: passwordHash,
    passwordSalt
  })
}
