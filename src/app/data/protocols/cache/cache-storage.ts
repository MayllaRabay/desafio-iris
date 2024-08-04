export interface CacheStorage {
  get: (key: string) => any
  set: (key: string, value: any) => void
  remove: (key: string) => void
  contains: (key: string) => boolean
}
