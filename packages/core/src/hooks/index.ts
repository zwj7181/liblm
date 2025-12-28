import { AnyObject, TEventStore } from "@lm_fe/utils"
import { useEffect, useRef, useState } from "react"
export function useEventStore<T extends AnyObject>(store: TEventStore<T>,) {
    const [_data, set_data] = useState({ ...store.bus.data })
    const ref = useRef(new Set<string>('*'))
    const flag = useRef(false)
    const keys = useRef(Object.keys(store.bus.data))
    useEffect(() => {
        const cb = (k: string, data: any) => {
            if (ref.current.has(k)) {
                set_data(data)
            }
        }
        store.bus.on('change', cb)
        return () => {
            store.bus.off('change', cb)
        };
    }, [store])
    function setPropertyGuard() {
        flag.current || Object.defineProperties(_data, keys.current.reduce((a, k: string) => {
            return Object.assign(a, {
                [k]: {
                    get() {
                        ref.current.add(k)
                        return store.bus.data[k]
                    },

                }
            })
        }, {}))
        flag.current = true

    }
    setPropertyGuard()
    return _data

}