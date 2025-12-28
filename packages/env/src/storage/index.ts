import store from 'store'
import sessionStorage from 'store/storages/sessionStorage'

class MchcStorage implements StoreJsAPI {
    version: string = "0.0.1";
    enabled: boolean = true;
    each(callback: (val: any, namespacedKey: string) => void): void {
        if (this.is_sess()) return sessionStorage.each(callback)
        return store.each(callback)
    }
    hasNamespace(namespace: string): boolean {
        return false
    }
    createStore(plugins?: Function[], namespace?: string): StoreJsAPI {
        return store
    }
    addPlugin(plugin: Function): void {
        throw new Error('Method not implemented.');
    }
    namespace(namespace: string): StoreJsAPI {
        throw new Error('Method not implemented.');
    }
    [name: string]: any;
    length = 0;
    is_sess() {
        return window.mchcEnv.in(['南医附属'])
    }
    clearAll(): void {
        if (this.is_sess()) return sessionStorage.clearAll()
        return store.clearAll()
    }
    get(key: string): string | null {
        if (this.is_sess()) return sessionStorage.read(key)
        return store.get(key)

    }

    remove(key: string): void {
        if (this.is_sess()) return sessionStorage.remove(key)
        return store.remove(key)
    }
    set(key: string, value: any): void {
        if (this.is_sess()) return sessionStorage.write(key, value)
        return store.set(key, value)
    }

}

export const mchcStorage = window.mchcStorage = new MchcStorage