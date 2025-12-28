import { ICommonOption, mchcEnv, rt_ctx } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx

const options_正常异常: ICommonOption[] = [
    { label: '正常', value: 1 },
    { label: '异常', value: 2, warning: true, inputType: 'input' },
]
const options_正常异常未查: ICommonOption[] = [
    { label: '正常', value: 1 },
    { label: '异常', value: 2, warning: true, inputType: 'input' },
    { label: '未查', value: 3, },
    { label: '其他', value: 4, inputType: 'input' },
]
const options_阴性阳性未查: ICommonOption[] = [
    { label: '阴性', value: 1 },
    { label: '阳性', value: 2, warning: true, inputType: 'input' },
    { label: '未查', value: 3, },
    { label: '其他', value: 4, inputType: 'input' },
]
export default defineFormConfig(
    [{
        "key": "hiv__",
        "label": "HIV",
        "inputType": "MC",
        required: () => ctx.required,
        inputProps: { options: options_阴性阳性未查 },
        layout: '1/3',
    }, {
        "key": "tst",
        "label": "TST",
        "inputType": "input_with_label",
        required: () => ctx.required,
        "specialConfig": { 'type': 'number', 'labelBefore': '', 'labelAfter': 'uIU/ml' },
        "inputProps": { 'report': true },
        "span": 8,
        "offset": 0,
        "formItemLayout": { 'labelCol': { 'span': 6 }, 'wrapperCol': { 'span': 18 } },
    }, {
        "key": "womanRh",
        "label": "女方RH",
        "inputType": "MS",
        required: () => ctx.required,
        inputProps: { options: mchcEnv.get_options('rh血型'), marshal: 0 },
        layout: '1/3',
    }, {
        "key": "womanThalassemia__",
        "label": "女方地贫",
        "inputType": "MC",
        required: () => ctx.required,
        inputProps: { options: options_正常异常未查 },
        layout: '1/3',
    }, {
        "key": "hbsag",
        "label": "HBsAg",
        "inputType": "input",
        required: () => ctx.required,
        layout: '1/3',

    }, {
        "key": "hbsab",
        "label": "HBsAb",
        "inputType": "input",
        required: () => ctx.required,
        layout: '1/3',

    }, {
        "key": "hbeag",
        "label": "HBeAg",
        "inputType": "input",
        required: () => ctx.required,
        layout: '1/3',

    }, {
        "key": "hbeab",
        "label": "HBeAb",
        "inputType": "input",
        required: () => ctx.required,
        layout: '1/3',

    }, {
        "key": "hbcab",
        "label": "HBcAb",
        "inputType": "input",
        required: () => ctx.required,
        layout: '1/3',

    }, {
        "key": "hcvAb__",
        "label": "丙肝抗体",
        "inputType": "MC",
        required: () => ctx.required,
        inputProps: { options: options_阴性阳性未查 },
        layout: '1/3',
    }, {
        "key": "bloodRoutine__",
        "label": "血常规",
        "inputType": "MC",
        required: () => ctx.required,
        inputProps: { options: options_正常异常未查 },
        layout: '1/3',
    }, {
        "key": "routineUrine__",
        "label": "尿常规",
        "inputType": "MC",
        required: () => ctx.required,
        inputProps: { options: options_正常异常未查 },
        layout: '1/3',
    }, {
        "key": "hcvRna__",
        "label": "丙肝RNA",
        "inputType": "MC",
        required: () => ctx.required,
        inputProps: { options: options_阴性阳性未查 },
        layout: '1/3',
    }, {
        "key": "gsixDP",
        "label": "G6DP",
        "inputType": "input_with_label",
        required: () => ctx.required,
        "specialConfig": { 'type': 'number', 'labelBefore': '', 'labelAfter': 'U/L' },
        layout: '1/3',

    }, {
        "key": "chestCheckDiagnose",
        "label": "胸部DR检查诊断",
        "inputType": "input",
        required: () => ctx.required,
        layout: '1/3',

    }, {
        "key": "syphilis__",
        "label": "梅毒",
        "inputType": "MC",
        required: () => ctx.required,
        inputProps: { options: options_阴性阳性未查 },
        layout: '1/3',
    }, {
        "key": "toxoIgm",
        "label": "TOXO IgM",
        "inputType": "input_with_label",
        required: () => ctx.required,
        "specialConfig": { 'type': 'number', 'labelBefore': '', 'labelAfter': 'AU/ml' },
        layout: '1/3',

    }, {
        "key": "toxoIgg",
        "label": "TOXO IgG",
        "inputType": "input_with_label",
        required: () => ctx.required,
        "specialConfig": { 'type': 'number', 'labelBefore': '', 'labelAfter': 'AU/ml' },
        layout: '1/3',

    }, {
        "key": "cmvIgm",
        "label": "CMV IgM",
        "inputType": "input_with_label",
        required: () => ctx.required,
        "specialConfig": { 'type': 'number', 'labelBefore': '', 'labelAfter': 'AU/ml' },
        layout: '1/3',

    }, {
        "key": "cmvIgg",
        "label": "CMV IgG",
        "inputType": "input_with_label",
        required: () => ctx.required,
        "specialConfig": { 'type': 'number', 'labelBefore': '', 'labelAfter': 'AU/ml' },
        layout: '1/3',

    }, {
        "key": "creE",
        "label": "CRE-E",
        "inputType": "input_with_label",
        required: () => ctx.required,
        "specialConfig": { 'type': 'number', 'labelBefore': '', 'labelAfter': 'umol/L' },
        layout: '1/3',

    }, {
        "key": "rubellaIgg",
        "label": "Rubella IgG",
        "inputType": "input_with_label",
        required: () => ctx.required,
        "specialConfig": { 'type': 'number', 'labelBefore': '', 'labelAfter': 'AU/ml' },
        layout: '1/3',

    }, {
        "key": "trichomonasSecreta__",
        "label": "分泌物滴虫",
        "inputType": "MC",
        required: () => ctx.required,
        inputProps: { options: options_阴性阳性未查 },
        layout: '1/3',
    }, {
        "key": "serumGlucose",
        "label": "血清葡萄糖",
        "inputType": "input_with_label",
        required: () => ctx.required,
        "specialConfig": { 'type': 'number', 'labelBefore': '', 'labelAfter': 'mmol/L' },
        layout: '1/3',

    }, {
        "key": "manAbo",
        "label": "男方血型",
        "inputType": "MS",
        required: () => ctx.required,
        inputProps: { options: mchcEnv.get_options('abo血型'), marshal: 0 },
        layout: '1/3',
    }, {
        "key": "manRh",
        "label": "男方RH",
        "inputType": "MS",
        required: () => ctx.required,
        inputProps: { options: mchcEnv.get_options('rh血型'), marshal: 0 },
        layout: '1/3',
    }, {
        "key": "manThalassemia__",
        "label": "男方地贫",
        "inputType": "MC",
        required: () => ctx.required,
        inputProps: { options: options_正常异常未查 },
        layout: '1/3',
    }, {
        "key": "womanAbo",
        "label": "女方血型",
        "inputType": "MS",
        required: () => ctx.required,
        inputProps: { options: mchcEnv.get_options('abo血型'), marshal: 0 },
        layout: '1/3',
    }, {
        "key": "gonococcus__",
        "label": "淋球菌",
        "inputType": "MC",
        inputProps: { options: options_阴性阳性未查 },
        layout: '1/3',
    }, {
        "key": "chlamydiaTrachomatis__",
        "label": "沙眼衣原体",
        "inputType": "MC",
        inputProps: { options: options_阴性阳性未查 },
        layout: '1/3',
    }, {
        "key": "mycoplasmaHominis__",
        "label": "人型支原体",
        "inputType": "MC",
        inputProps: { options: options_阴性阳性未查 },
        layout: '1/3',
    }, {
        "key": "other",
        "label": "其他",
        "inputType": "input",
        isNewRow: 1,
        layout: '1/2',

    }, {
        "key": "gynecologicalUltrasonicDiagnosis",
        "label": "妇科超声诊断",
        "inputType": "input",
        required: () => ctx.required,
        layout: '1/2',

    }, {
        "key": "checkDoctor",
        "label": "检查医生",
        "inputType": "MA",
        layout: '1/3',
        inputProps: { memorieskey: '妇保-检查医生' },

    }]
)
