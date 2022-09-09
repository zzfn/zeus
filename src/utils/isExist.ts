export function isExist(id: string | undefined) {
  return id !== undefined && id.length && id !== '_';
}
