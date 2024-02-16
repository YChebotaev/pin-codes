export const generatePinCode = (size: number, numbers: string) => {
  const arr: string[] = new Array(size)

  for (let i = 0; i < size; i++) {
    arr[i] = numbers[Math.floor(Math.random() * numbers.length)]
  }

  return arr.join('').padStart(size, '0')
}
