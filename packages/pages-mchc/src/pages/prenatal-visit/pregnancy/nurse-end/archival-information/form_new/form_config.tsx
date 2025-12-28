import { mchcEnv } from "@lm_fe/env";
import { get_preset_form_config } from "@lm_fe/service";



export function preset_config() {

    // if (!mchcEnv.in(['郫都', '潮汕']))
    //     return

    const preset = get_preset_form_config('门诊_建档')
    return preset


}


export function load_form_config_nurse_end() {

    if (mchcEnv.is('建瓯'))
        return import('./建瓯')

    return import('../form/form_config')


}