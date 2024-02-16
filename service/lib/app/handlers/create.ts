import {
  generatorGet,
  generatorSetSize,
  pinCodeGetByCode,
  pinCodeCreate,
  generatorIncrGeneratedCount
} from '../../persistence'
import { generatePinCode } from '../../generatePinCode'

export const create = async ({ generatorId, payload }: { generatorId: number, payload: any }) => {
  const generator = await generatorGet(generatorId)

  if (!generator) {
    throw new Error('Cannot find generator with given tenant')
  }

  const maxNumber = Math.pow(10, generator.size)

  if (generator.generatedCount >= maxNumber - 300) {
    generator.size += 1

    await generatorSetSize(generator.id, generator.size)
  }

  let code: string

  do {
    code = generatePinCode(generator.size, generator.numbers)

    const pinCode = await pinCodeGetByCode(generator.id, code)

    if (!pinCode) {
      break
    }
  } while (true)

  await pinCodeCreate({
    tenantId: generator.tenantId,
    generatorId: generator.id,
    code,
    payload
  })

  await generatorIncrGeneratedCount(generator.id)

  return {
    code
  }
}
