import { useContext } from 'react'
import { ApiClientContext } from '../context'

export const useApiClient = () => useContext(ApiClientContext)!
