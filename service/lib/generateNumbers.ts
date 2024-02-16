export const generateNumbers = () => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map(n => ({
      r: Math.random(),
      n
    }))
    .sort((a, b) => a.r - b.r)
    .map(({ n }) => n)
    .join('')
}
