import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService<T> {
  private key!: string;

  constructor(@Inject(String) key: string) {
    this.key = key;
  }

  public updateLocalStorage(data: T) {
    let mdata = JSON.stringify(data);
    localStorage.setItem(this.key, mdata);
  }

  public getLocalStorage(): T | undefined {
    let mdata = localStorage.getItem(this.key);
    if (mdata) {
      return JSON.parse(mdata) as T;
    } else {
      return undefined;
    }
  }
}
