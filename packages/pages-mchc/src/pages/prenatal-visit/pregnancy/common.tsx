import { mchcEnv } from "@lm_fe/env";
import { not_yes_input } from "@lm_fe/pages";
import { defineFormConfig, IMchc_FormDescriptions_Field } from "@lm_fe/service";
import { ICommonOption, identity } from "@lm_fe/utils";
function get_无有option(suffix?: string) {
    const options: ICommonOption[] = [
        { value: false, label: '无' },
        { value: true, label: '有', warning: true, inputType: 'Input', suffix },
    ]
    return options
}
function make_one(label: string, name: string, prefix: string, hiden = false): IMchc_FormDescriptions_Field {
    const _pre = prefix ? `${prefix}.` : ''

    const a = not_yes_input(_pre + `fmh.${name}`, label, {
        'required': true,

    })
    a.isActive = !hiden
    return a
    return {
        isActive: !hiden,
        "key": _pre + `fmh.${name}__`,
        label,

        "inputType": "MC",
        'required': true,

        "inputProps": { options: get_无有option() },
        layout: '1/3',

    }
}
export function form_config_家族史(prefix = ''): IMchc_FormDescriptions_Field {
    return {
        "label": "家族史",
        children: [
            make_one('高血压', 'hypertension', prefix),
            make_one('糖尿病', 'diabetes', prefix),
            make_one('遗传疾病', 'heritableDisease', prefix),
            make_one('痴呆', 'dementia', prefix, mchcEnv.in(['广三'])),
            make_one('先天畸形', 'birthdefects', prefix),


            make_one('结核', 'tuberculosis', prefix),
            make_one('精神病', 'mentalDisease', prefix, mchcEnv.in(['广三'])),
            make_one('地贫', 'thalassemia', prefix),
            make_one('g6pd缺乏', 'g6pdLack', prefix),
            make_one('双胎', 'twins', prefix),

            make_one('心脏病', 'cardiacDisease', prefix, mchcEnv.in(['广三'])),
            make_one('肝炎', 'hepatitis', prefix, mchcEnv.in(['广三'])),
            make_one('肾病', 'nephropathy', prefix, mchcEnv.in(['广三'])),
            make_one('甲状腺疾病', 'thyroidDisease', prefix, mchcEnv.in(['广三'])),
            make_one('其他', 'other', prefix),
            {
                "key": "既往史一键勾选",
                "label": "一键勾选",
                "inputType": "check_invert_button",
                "layout": "1/3"
            },



        ]

    }
}