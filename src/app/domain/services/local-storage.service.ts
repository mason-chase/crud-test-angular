import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService<T> {
  private key!: string
  constructor(@Inject(String) key: string) {
    this.key = key
  }
  public updateStorage(value: T) {
    let _value = JSON.stringify(value)
    localStorage.setItem(this.key, _value)
  }
  public getStorage(): T | undefined {
    let value = localStorage.getItem(this.key)
    if (value)
      return JSON.parse(value) as T
    else
      return undefined
  }
}