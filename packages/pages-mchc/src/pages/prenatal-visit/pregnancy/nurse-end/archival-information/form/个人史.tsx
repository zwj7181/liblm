import { getPresetOptions, mchcEnv, rt_ctx } from "@lm_fe/env";
import { not_yes_input } from "@lm_fe/pages";
import { defineFormConfig, IMchc_FormDescriptions_Field, IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";
import { FormInstance } from "antd";

const ctx = rt_ctx



export function 个人史_pack(isPure = false, needOther = false) {

    let f_k = (k: string) => `${isPure ? 'pmh' : 'pregnancyInfo'}.${k}`
    const res = defineFormConfig([


        not_yes_input(f_k('smoke'), '吸烟', {}, { inputProps: { addonAfter: '支/天' } }),
        not_yes_input(f_k('alcohol'), '饮酒', {}, { inputProps: { addonAfter: 'ml/天' } }),
        not_yes_input(f_k('hazardoussubstances'), '接触有害物质',),
        not_yes_input(f_k('radioactivity'), '接触放射线',),
        not_yes_input(f_k('medicine'), '近期是否服药',),











    ]).__lazy_config
    if (needOther) {
        res.push(
            not_yes_input(f_k('other'), '其他',),

        )
    }
    return res
}

