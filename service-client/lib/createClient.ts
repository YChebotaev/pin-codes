import axios from 'axios'
import type {
  AuthRestoreResult,
  AuthLoginResult,
  AuthRegisterResult,
  GeneratorCreateResult,
  GeneratorsListResult,
  GeneratorsDeleteResult
} from '../types'

export const createClient = ({
  baseURL,
  getToken
}: {
  baseURL: string
  getToken?(): string | null
}) => {
  const client = axios.create({ baseURL })

  if (getToken) {
    client.interceptors.request.use((config) => {
      const token = getToken()

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    })
  }

  return {
    auth: {
      async register({
        name,
        email,
        password,
        passwordConfirm
      }: {
        name: string
        email: string
        password: string
        passwordConfirm: string
      }) {
        const { data } = await client.post<AuthRegisterResult>('/auth/register', {
          name,
          email,
          password,
          passwordConfirm
        })

        return data
      },
      async login({
        email,
        password
      }: {
        email: string
        password: string
      }) {
        const { data } = await client.post<AuthLoginResult>('/auth/login', {
          email,
          password
        })

        return data
      },
      async restore({ email }: { email: string }) {
        const { data } = await client.post<AuthRestoreResult>('/auth/restore', { email })

        return data
      }
    },
    tenant(tenantId: number) {
      return {
        generators: {
          async create() {
            const { data } = await client.post<GeneratorCreateResult>(`/tenants/${tenantId}/generators`)

            return data
          },
          async list() {
            const { data } = await client.get<GeneratorsListResult>(`/tenants/${tenantId}/generators`)

            return data
          },
          async delete(generatorId: number) {
            const { data } = await client.delete<GeneratorsDeleteResult>(`/tenants/${tenantId}/generators/${generatorId}`)

            return data
          }
        }
      }
    }
  }
}
