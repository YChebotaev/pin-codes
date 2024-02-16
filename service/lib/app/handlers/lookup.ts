import { pinCodeGetByCode } from '../../persistence'

export const lookup = async ({ tenantId, code }: { tenantId: number, code: string }) => {
  const pinCode = await pinCodeGetByCode(tenantId, code)

  if (!pinCode) {
    throw new Error('Pin code not found')
  }

  return {
    payload: pinCode.payload
  }
}