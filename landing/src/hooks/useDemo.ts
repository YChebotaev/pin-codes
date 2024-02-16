import { useState } from 'react'

export const useDemo = (payload: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [lastValue, setLastValue] = useState<{ code: string } | null>(null)
  const [lastError, setLastError] = useState<object | null>(null)

  return {
    isLoading,
    lastValue,
    lastError,
    async generate() {
      setIsLoading(true)
      setLastError(null)

      const resp = await fetch(`${process.env['NEXT_PUBLIC_SERVICE_URL']!}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env['NEXT_PUBLIC_DEMO_TENANT_TOKEN']!}`
        },
        body: payload
      })

      if (resp.status === 200) {
        const data = await resp.json()

        setLastValue(data)
      } else {
        const error = await resp.json()

        setLastError(error)
      }

      setIsLoading(false)
    }
  }
}
