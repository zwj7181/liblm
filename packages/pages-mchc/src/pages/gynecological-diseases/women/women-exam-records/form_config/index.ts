import { mchcEnv } from "@lm_fe/env";


export async function load_form_config_women_exam_records() {
    if (mchcEnv.is('建瓯'))
        return import('./建瓯')
    return import('./default')
}