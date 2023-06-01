import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

const KEY_NOT_FOUND = 'Key is not found!'

@Injectable(
    {
        providedIn: `root`
    }
)
export class LocalStorage {
    private isInBrowser: boolean;

    constructor(
        @Inject(PLATFORM_ID) private platformId: {}) {
        this.isInBrowser = isPlatformBrowser(this.platformId);
    }

    public get IsInBrowser(): boolean {
        return this.isInBrowser;
    }

    public localStorage = () => {
        return localStorage;
    }

    /**
    * stores data into localStorage by taking care of SSR
    * @param key for reference to date
    * @param value data to be stored
    */
    public setItem(key: string, value: string) {
        if (this.isInBrowser) {
            this.localStorage().setItem(key, value);
        }
        else {
            this.isNotInBrowser();
        }
    }

    /**
    * get data from localStorage by taking care of SSR
    * @param key for reference key to retrive value
    */
    public getItem(key: string): string {
        if (this.IsInBrowser) {
            return this.localStorage().getItem(key) || (key + ' ==> ' + KEY_NOT_FOUND);
        }
        return '';
    }

    /**
    * remove local Storage
    * @param key for reference key to remove value
    */
    public removeItem(key: string) {
        if (this.IsInBrowser) {
            this.localStorage().removeItem(key);
        }
        else {
            this.isNotInBrowser();
        }
    }

    isNotInBrowser() {
        throw new Error("Is not a browser!");
    }
}