import { defineFormConfig, IMchc_FormDescriptions_Field_Nullable_Arr } from "@lm_fe/service";
import { ITplConf } from "./types";
import { rt_ctx } from "@lm_fe/env";
const ctx = rt_ctx

const common_result: IMchc_FormDescriptions_Field_Nullable_Arr = [
    { title: '项目名称', name: 'itemName', inputType: 'MA', inputProps: { options: '项目一,项目二' } },
    { title: '英文名称', name: 'itemNO', inputType: 'MA', inputProps: { options: 'a,b,c,d' } },
    { title: '检验结果', name: 'result', inputType: 'MA', inputProps: { options: '阳性,阴性' } },
    { title: '单位', name: 'unit', inputType: 'MA', inputProps: { options: 'mmol,1,L' } },
    { title: '状态', name: 'state', inputType: 'MA', inputProps: { options: '正常,异常', marshal: 0 } },
    { title: '参考范围', name: 'limit', inputType: 'MA', inputProps: {} },
]

const common: IMchc_FormDescriptions_Field_Nullable_Arr = [
    { title: '组套号', name: 'suitNO', inputType: 'MA', inputProps: { disabled: true, }, layout: '1/3', },
    { title: '组套名', name: 'suitName', inputType: 'MA', inputProps: { disabled: true, }, layout: '1/3', },
    { title: '检查日期', name: 'examinationDate', inputType: 'DatePicker', layout: '1/3', },
    // { title: '审核人', name: 'reviewer', inputType: 'MA', inputProps: { disabled: true, }, layout: '1/3', },
    // { title: '样本号', name: 'sampleNO', inputType: 'MA', layout: '1/3', },
    // { title: '状态', name: 'state', inputType: 'MS', inputProps: { options: '未审核,已审核', marshal: 0 }, layout: '1/3', },
    // { title: '备注', name: 'remark', inputType: 'MA', inputProps: {}, layout: '1/1' },
    {
        inputType: 'MyEditTable',
        name: 'reportResults',
        inputProps: {
            formDescriptions: [...common_result]
        }
    }
]

const tmp_conf: ITplConf[] = [{

    tpl_name: '白带常规',
    tpl_form: [...common,],
    tpl_values: {
        suitNO: 'bdcg',
        suitName: '白带常规',
        reportResults: [
            { itemNO: 'DCGR', itemName: '滴虫感染', limit: '' },
            { itemNO: 'PH', itemName: 'PH值', limit: '0-4.5' },
            { itemNO: 'ACW', itemName: '胺臭味实验', limit: '' },
            { itemNO: 'QID', itemName: '清洁度', limit: '' },
            { itemNO: 'CT2', itemName: '淋球菌筛查', limit: '' },
            { itemNO: 'NZLLI', itemName: '念珠菌感染', limit: '' },
            { itemNO: 'SY', itemName: '沙眼衣原体筛查', limit: '' },
            { itemNO: 'XSXB', itemName: '线索细胞', limit: '' },
        ]
    }
},
{
    tpl_name: '血型',
    tpl_form: [...common,],
    tpl_values: {
        suitNO: 'xx',
        suitName: '血型',
        reportResults: [
            { itemNO: 'ABO', itemName: '血型', unit: '', },
            { itemNO: 'RH', itemName: 'RH', unit: '', }
        ]
    }
},
{

    tpl_name: '血糖',
    tpl_form: [...common,],
    tpl_values: {
        "suitNO": "xt",
        "suitName": "血糖",
        "reportResults": [
            {
                "itemNO": "GLU",
                "itemName": "血糖",
                "limit": "3.9-6.1",
                "unit": "mmol/1/L"
            }
        ]
    }
},
{

    tpl_name: '乙肝血清学检查',
    tpl_form: [...common,],
    tpl_values: {
        "suitNO": "ygldb",
        "suitName": "乙肝血清学检查",
        "reportResults": [
            {
                "itemNO": "HBsAg",
                "itemName": "表面抗原",
                "limit": "阴性-阳性",
                "unit": "-"
            },
            {
                "itemNO": "HBsAb",
                "itemName": "表面抗体",
                "limit": "阴性-阳性",
                "unit": "-"
            },
            {
                "itemNO": "HBeAg",
                "itemName": "e抗原",
                "limit": "阴性-阳性",
                "unit": "-"
            },
            {
                "itemNO": "HBeAb",
                "itemName": "e抗体",
                "limit": "阴性-阳性",
                "unit": "-"
            },
            {
                "itemNO": "HBcAb",
                "itemName": "核心抗体",
                "limit": "阴性-阳性",
                "unit": "-"
            }
        ]
    }
},

{

    tpl_name: '肝肾功能检查',
    tpl_form: [...common,],
    tpl_values: {
        "suitNO": "gg",
        "suitName": "肝肾功能检查",
        "reportResults": [
            {
                "itemNO": "ALT",
                "itemName": "谷丙转氨酶",
                "limit": "0-45",
                "unit": "U/L"
            },
            {
                "itemNO": "CREA",
                "itemName": "肌酐",
                "limit": "44-115",
                "unit": "umol/L"
            },
        ]
    }
},
{

    tpl_name: '甲状腺功能检查',
    tpl_form: [...common,],
    tpl_values: {
        "suitNO": "gzq",
        "suitName": "甲状腺功能检查",
        "reportResults": [
            {
                "itemNO": "TSH",
                "itemName": "促甲状腺激素",
                "limit": "0.44-5.45",
                "unit": "IU/mL"
            }
        ]
    }
},
{
    "tpl_name": "优生五项",
    "tpl_form": [...common,
    ],
    "tpl_values": {
        "suitNO": "yswx",
        "suitName": "优生五项",
        "reportResults": [
            {
                "itemNO": "RuV-IgG-",
                "itemName": "风疹病毒IgG",
                "limit": "-",
            },
            {
                "itemNO": "CMV-IgG-",
                "itemName": "巨细胞病毒IgG",
                "limit": "-",
            },
            {
                "itemNO": "TOX-IgG-",
                "itemName": "弓形虫IgG",
                "limit": "-",
            },
            {
                "itemNO": "CMV-IgM-",
                "itemName": "巨细胞病毒IgM",
                "limit": "-",
            },
            {
                "itemNO": "TOX-IgM-",
                "itemName": "弓形虫IgM",
                "limit": "-",
            }
        ]
    }
},
{

    tpl_name: '梅毒螺旋体筛查',
    tpl_form: [...common,],
    tpl_values: {
        "suitNO": "md",
        "suitName": "梅毒螺旋体筛查",
        "reportResults": [
            {
                "itemNO": "TP",
                "itemName": "梅毒螺旋体筛查",
                "limit": "-",
            }
        ]
    }
},


]

export default tmp_conf