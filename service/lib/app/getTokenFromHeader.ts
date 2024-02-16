export const getTokenFromHeader = (headerStr: string) => {
  return headerStr.startsWith('Bearer ') ? headerStr.slice(7) : headerStr
}
