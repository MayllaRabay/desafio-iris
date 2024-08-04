import { CacheStorage } from "@/app/data/protocols/cache"

export class LocalStorageAdapter implements CacheStorage {
  get(key: string): any {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }

  set(key: string, value: any): void {
    return value && localStorage.setItem(key, JSON.stringify(value))
  }

  remove(key: string): void {
    return localStorage.removeItem(key)
  }

  contains(key: string): boolean {
    return !!localStorage.getItem(key)
  }
}
