import { mchcEnv } from "@lm_fe/env";





export function form_config() {

    if (mchcEnv.is('建瓯'))
        return import('./form/建瓯')

    return import('./form/form_config')


}