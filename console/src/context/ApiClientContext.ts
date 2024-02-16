import { createContext } from 'react'
import type { ServiceClient } from '@pincodes/service-client'

export const ApiClientContext = createContext<ServiceClient | null>(null)
