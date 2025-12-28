import { dyn_cb, safeGetFromFuncOrData } from "@lm_fe/utils";
import { gen_rt_ctx, IRTCtx } from "./runtime_ctx";








export function safe_get_symbol<T = any>(str: any, props?: any, default_v?: T) {
    let ret: T | undefined
    if (typeof str !== 'string') return ret
    const is_err = dyn_cb((ctx) => { eval(str) }, () => gen_rt_ctx('instance_ctx', props),)
    if (is_err) {
        ret = default_v
    }
    return ret
}

export function safe_get_object_symbol(value: any, props?: any, default_v?: any,) {
    let maybe_fn = safe_get_symbol(value, props, default_v)
    return safeGetFromFuncOrData(maybe_fn, default_v)
}
