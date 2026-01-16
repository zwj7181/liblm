import { safe_json_parse } from '@lm_fe/utils';
import { mchcConfig } from 'src/state';
import store from 'store'
import sessionStorage from 'store/storages/sessionStorage'
class MchcStorage implements StoreJsAPI {
    version: string = "0.0.1";
    enabled: boolean = true;
    private __session?: boolean
    use_session() {
        return this.__session = this.__session ?? mchcConfig.get('本地数据存储') === 'Session'
    }

    each(callback: (val: any, namespacedKey: string) => void): void {
        if (this.use_session()) return sessionStorage.each(callback)
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
    clearAll(): void {
        if (this.use_session()) return sessionStorage.clearAll()
        return store.clearAll()
    }
    get(key: string): string | null {
        if (this.use_session()) {
            const raw = sessionStorage.read(key)
            return safe_json_parse(raw)
        }
        return store.get(key)

    }

    remove(key: string): void {
        if (this.use_session()) return sessionStorage.remove(key)
        return store.remove(key)
    }
    set(key: string, value: any): void {
        if (this.use_session()) {
            return sessionStorage.write(key, JSON.stringify(value))
        }
        return store.set(key, value)
    }

}

export const mchcStorage = window.mchcStorage = new MchcStorage