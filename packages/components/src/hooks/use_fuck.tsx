import { mchcEnv } from "@lm_fe/env";
import { useEffect, useState } from "react";


export function use_fuck(store_k?: string) {
    let fuck_k = store_k ? `fuck_${store_k}` : null
    const [fuck, _set_fuck] = useState(fuck_k ? mchcEnv.store.get(fuck_k) : false)

    function set_fuck(s: boolean) {
        if (fuck_k) {
            mchcEnv.store.set(fuck_k, s)
        }
        _set_fuck(s)
    }

    function toggle_fuck() {
        set_fuck(!fuck)
    }
    return {
        set_fuck, toggle_fuck, fuck
    }
}
