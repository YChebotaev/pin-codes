import { type createClient } from './lib/createClient'

export type ServiceClient = ReturnType<typeof createClient>

export type AuthRegisterResult = {
  token: string
}

export type AuthLoginResult = {
  token: string
}

export type AuthRestoreResult = {}

export type GeneratorCreateResult = {
  token: string
}

export type GeneratorsListResult = {
  id: number
  generatedCount: number
  size: number
}[]

export type GeneratorsDeleteResult = {}
