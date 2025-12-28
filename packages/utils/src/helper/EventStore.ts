import { AnyObject, EventEmitter } from '@noah-libjs/utils'
import store from 'store'


export type TEventBus<T extends AnyObject> = { bus: EventBus<T> }
export type TEventStore<T extends AnyObject> = TEventBus<T> & T
export class EventBus<T extends AnyObject> extends EventEmitter<{ change: any }> {

    private _data: T
    public get data(): T {
        return this._data
    }
    public set data(value: T) {
        this._data = value
        this.emit('change', '*', value)
    }
    key?: string

    constructor(key?: string, data?: T,) {
        super()
        const bus = this

        this.key = key

        data = data || (store.get(this.genStorePersistKey) || {}) as T
        const busData = this._data = { ...data }
        this.persisitEventStore()
        Object.defineProperties(data, Object.keys(data).reduce((a, k: string) => {
            return Object.assign(a, {
                [k]: {
                    get: () => busData[k],
                    set(val: any) {
                        //@ts-ignore
                        busData[k] = val
                        bus.emit('change', k, { ...busData })
                    },
                    enumerable: true
                }
            })
        }, {}))
    }

    timeId?: NodeJS.Timeout

    private persisitEventStore() {

        this.key && this.on('change', (_: string, val: any) => {
            if (this.timeId) clearTimeout(this.timeId)
            this.timeId = setTimeout(() => {
                store.set(this.genStorePersistKey, val)
                this.timeId = undefined
            }, 1000);
        })
    }
    private get genStorePersistKey() {
        return `${this.key}_v○( ＾皿＾)っpersist…`
    }

}

export function makeEventStore<T extends AnyObject>(key?: string, data?: T,): TEventStore<T> {
    const bus = new EventBus(key, data)
    return Object.assign(bus.data, { bus })
}


