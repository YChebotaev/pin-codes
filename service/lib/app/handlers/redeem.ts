import { pinCodeGetByCode, pinCodeDelete } from '../../persistence'

export const redeem = async ({ tenantId, code }: { tenantId: number, code: string }) => {
  const pinCode = await pinCodeGetByCode(tenantId, code)

  if (!pinCode) {
    throw new Error('Pin code not found')
  }

  await pinCodeDelete(pinCode.id)

  return {
    payload: pinCode.payload
  }
}