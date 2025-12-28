import { mchcEnv } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";

export const form_confg = defineFormConfig([
    {
        "key": "syncDate",
        "label": "上次同步时间",
        "inputType": 'DatePicker',

        "inputProps": { 'disabled': true, showTime: true },
        layout: '1/3'


    },
    {
        "key": "syncBtn",
        "label": "同步数据",
        "inputType": "MyButton",

        "inputProps": {},
        layout: '1/3'


    },
    {
        "key": "partnerBg",
        "label": "男方血型",
        "inputType": "select",
        "inputProps": { 'options': mchcEnv.get_other_options('aboOptions'), marshal: 0, 'placeholder': 'ABO血型', },
        layout: '1/3',
        isNewRow: 1,

    },
    {
        "key": "partnerRh",
        "label": "男方RH血型",

        "inputType": "select",


        "inputProps": { marshal: 0, 'options': mchcEnv.get_other_options('rhOptions'), 'style': { 'marginLeft': '-1px' } },
        layout: '1/3'

    }, {
        key: "partnerThalassemia__",
        "label": "男方地贫",
        "inputType": "checkbox",

        "inputProps": { options: '正常,异常i,未查,其他i', },
        layout: '1/3'

    },
    {
        "key": "personalBg",
        "label": "女方血型",
        "inputType": "select",


        "inputProps": { 'options': mchcEnv.get_other_options('aboOptions'), marshal: 0, 'disabled': true, },
        layout: '1/3',
        "isNewRow": 1,

    }, {
        "key": "personalRh",
        "label": "女方RH血型",

        "inputType": "select",


        "inputProps": { 'options': mchcEnv.get_other_options('rhOptions'), marshal: 0, 'disabled': true },
        layout: '1/3'

    }, {
        key: "personalThalassemia__",
        "label": "女方地贫",
        "inputType": "checkbox",

        "inputProps": { options: '正常,异常i,未查,其他i', },
        layout: '1/3'

    }, {
        "key": "tsh",
        "label": "TSH",
        "inputType": "InputNumber",

        unit: 'uIU/ml',
        layout: '1/3',
        "isNewRow": 1,

    }, {
        "key": "t3",
        "label": "游离T3",
        "inputType": "InputNumber",

        unit: 'pmol/L',
        layout: '1/3'

    }, {
        "key": "t4",
        "label": "游离T4",
        "inputType": "InputNumber",

        unit: 'pmol/L',
        layout: '1/3'

    }, {
        "key": "hb",
        "label": "HB",
        "inputType": "InputNumber",

        unit: 'g/L',
        layout: '1/3',
        "isNewRow": 1,

    }, {
        "key": "mcv",
        "label": "MCV",
        "inputType": "InputNumber",

        unit: 'fL',
        layout: '1/3'

    }, {
        "key": "plt",
        "label": "PLT",
        "inputType": "InputNumber",

        unit: 'x10^9/L',
        layout: '1/3'

    }, {
        key: "urokinase__",
        "label": "尿蛋白",
        "inputType": "checkbox",

        "inputProps": {
            // sp: [{ label: '弱阳性', value: 21 }],
            options: '阴性,弱阳性,阳性i,未查,其他i',

        },
        layout: '1/3'

    }, {
        "key": "hbsag",
        "label": "HBsAg",
        "inputType": "MA",

        "inputProps": { options: mchcEnv.get_other_options('hbOptions'), },
        layout: '1/3'

    }, {
        "key": "hbsab",
        "label": "HBsAb",
        "inputType": "MA",

        "inputProps": { 'options': mchcEnv.get_other_options('hbOptions'), },
        layout: '1/3'

    }, {
        "key": "hbeag",
        "label": "HBeAg",
        "inputType": "MA",

        "inputProps": { 'options': mchcEnv.get_other_options('hbOptions'), },
        layout: '1/3'

    }, {
        "key": "hbeab",
        "label": "HBeAb",
        "inputType": "MA",

        "inputProps": { 'options': mchcEnv.get_other_options('hbOptions'), },
        layout: '1/3',
        "isNewRow": 1,

    }, {
        "key": "hbcab",
        "label": "HBcAb",
        "inputType": "MA",

        "inputProps": { 'options': mchcEnv.get_other_options('hbOptions'), },
        layout: '1/3'

    }, {
        "key": "hbvdna",
        "label": "HBV DNA",
        "inputType": "InputNumber",

        unit: 'IU/ml',
        layout: '1/3'

    }, {
        "key": "alt",
        "label": "ALT",
        "inputType": "InputNumber",

        unit: 'U/L',
        layout: '1/3',
        "isNewRow": 1,

    }, {
        "key": "ast",
        "label": "AST",
        "inputType": "InputNumber",

        unit: 'U/L',
        layout: '1/3'

    }, {
        "key": "pt",
        "label": "PT",
        "inputType": "InputNumber",
        'unit': 'sec',
        "inputProps": { 'min': 0, 'max': 20, 'disabled': true },
        layout: '1/3',
        "isNewRow": 1,

    }, {
        "key": "inr",
        "label": "INR",
        "inputType": "InputNumber",

        "inputProps": { 'min': 0, 'max': 2, 'step': 0.1, 'disabled': true },
        layout: '1/3'

    }, {
        "key": "aptt",
        "label": "APTT",
        "inputType": "InputNumber",
        'unit': 'sec',
        "inputProps": { 'min': 0, 'max': 50, 'disabled': true },
        layout: '1/3'

    }, {
        "key": "tt",
        "label": "TT",
        "inputType": "InputNumber",
        'unit': 'sec',
        "inputProps": { 'min': 0, 'max': 20, 'disabled': true },
        layout: '1/3',
        "isNewRow": 1,

    }, {
        "key": "fib",
        "label": "FIB",
        "inputType": "InputNumber",
        'unit': 'g/L',
        "inputProps": { 'min': 0, 'max': 5, 'step': 0.1, 'disabled': true },
        layout: '1/3'

    }, {
        "key": "sf",
        "label": "SF",
        "inputType": "InputNumber",

        unit: 'ng/ml',
        layout: '1/3'

    }, {
        key: "hcvResult__",
        "label": "丙肝抗体",
        "inputType": "checkbox",

        "inputProps": { options: '阴性,阳性i,未查', },
        layout: '1/3'

    }, {
        key: "hcvrnaResult__",
        "label": "丙肝RNA",
        "inputType": "checkbox",

        "inputProps": { options: '阴性,阳性i,未查', },
        layout: '1/3'

    }, {
        key: "syphilisResult__",
        "label": "梅毒",
        "inputType": "checkbox",

        "inputProps": { options: '阴性,阳性i,未查', },
        layout: '1/3'

    }, {
        key: "hivResult__",
        "label": "HIV",
        "inputType": "checkbox",

        "inputProps": { options: '阴性,阳性i,未查', },
        layout: '1/3'

    }, {
        key: "gbsResult__",
        "label": "GBS",
        "inputType": "checkbox",

        "inputProps": { options: '阴性,阳性i,未查', },
        layout: '1/3'

    }, {
        key: "g6pdResult__",
        "label": "G6PD",
        "inputType": "checkbox",

        "inputProps": { options: '阴性,阳性i,未查', },
        layout: '1/3'

    }, {
        key: "downsScreenEarly",
        "label": "早唐",
        "inputType": "checkbox",

        "inputProps": { options: mchcEnv.get_other_options('downsScreenOptions'), marshal: 0, },
        layout: '1/3'

    }, {
        key: "downsScreenMiddle",
        "label": "中唐",
        "inputType": "checkbox",

        "inputProps": { options: mchcEnv.get_other_options('downsScreenOptions'), marshal: 0, },
        layout: '1/3'

    }, {
        key: "nipt",
        "label": "NIPT",
        "inputType": "checkbox",

        "inputProps": { options: mchcEnv.get_other_options('downsScreenOptions'), marshal: 0, },
        layout: '1/3'

    }, {
        key: "prenatalDiagnosisResult",
        "label": "产前诊断",
        "inputType": "checkbox",

        "inputProps": {
            options: [{ label: '正常', value: 1 },
            { label: '异常', value: 2 },
            { label: '拒绝产前诊断和知情同意书', value: 4 },], marshal: 0,
        },
        layout: '1/3'

    }, {
        key: "ogttResult__",
        "label": "OGTT",
        "inputType": "checkbox",

        "inputProps": { options: mchcEnv.get_other_options('ogttOptions'), },
        layout: '1/3'

    },
    {
        "key": "other",
        "label": "其他",
        "inputType": "input",
        layout: '1/3'

    },
    {
        "key": "id",
        "inputType": "input",
        form_hidden: true,
    }
])