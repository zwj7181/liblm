import { ICommonOption } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
const options_无有: ICommonOption[] = [
  { label: '无', value: 1 },
  { label: '有', value: 2, warning: true, inputType: 'input' },
]
export default defineFormConfig(
  [
    {


      "name": "基本信息",





      "fields": [{

        "key": "menarche",
        "label": "初潮(岁)",

        "inputType": "input_number",

        required: true,

        "inputProps": { 'placeholder': '请输入初潮' },
        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 14 } },





      }, {

        "key": "menstrualCycle",
        "label": "月经周期(天)",

        "inputType": "input_number",

        required: true,

        "inputProps": { 'placeholder': '请输入月经周期' },
        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 14 } },





      }, {

        "key": "menstrualPeriod",
        "label": "月经持续天数",

        "inputType": "input_number",

        required: true,

        "inputProps": { 'placeholder': '请输入月经持续天数' },
        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 14 } },





      }, {

        "key": "menstrualVolume",
        "label": "经量",

        "inputType": "checkbox_group",

        required: true,
        "specialConfig": { 'type': 'single', 'options': [{ 'value': '多', 'label': '多', 'withInput': false, 'span': 6 }, { 'value': '中', 'label': '中', 'withInput': false, 'span': 6 }, { 'value': '少', 'label': '少', 'withInput': false, 'span': 6 }] },

        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },





      }, {

        "key": "dysmenorrhea__",
        "label": "痛经",

        "inputType": "MC",

        required: true,
        inputProps: { options: options_无有 },
        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },





      }, {

        "key": "gravidity",
        "label": "孕次",

        "inputType": "input_number",

        required: true,

        "inputProps": { 'placeholder': '请输入孕次' },
        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 14 } },





      }, {

        "key": "parity",
        "label": "产次",

        "inputType": "input_number",

        required: true,

        "inputProps": { 'placeholder': '请输入产次' },
        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 14 } },





      }]
    }, {


      "name": "个人史",





      "fields": [{

        "key": "previousHistory__",
        "label": "既往史",

        "inputType": "MC",

        required: true,
        inputProps: { options: options_无有 },

        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },





      }, {

        "key": "surgeryHistory__",
        "label": "手术史",

        "inputType": "MC",

        required: true,
        inputProps: { options: options_无有 },

        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },





      }, {

        "key": "takeMedicine__",
        "label": "服用药物",

        "inputType": "MC",

        required: true,
        inputProps: { options: options_无有 },

        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },





      }, {

        "key": "presentIllness__",
        "label": "现病史",

        "inputType": "MC",

        required: true,
        inputProps: { options: options_无有 },

        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },





      }, {

        "key": "contactHazardousSubstances__",
        "label": "接触有害物质",

        "inputType": "MC",

        required: true,
        inputProps: { options: options_无有 },

        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },





      }, {

        "key": "contactRadioactiveRays__",
        "label": "接触放射线",

        "inputType": "MC",

        required: true,
        inputProps: { options: options_无有 },

        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },





      }, {

        "key": "nearRelation__",
        "label": "近亲结婚",

        "inputType": "MC",

        inputProps: { options: options_无有 },

        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },





      }, {

        "key": "contraception__",
        "label": "避孕措施",

        "inputType": "MC",

     
        inputProps: { options: options_无有 },

        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },





      }, {

        "key": "personalSmoke__",
        "label": "吸烟",

        "inputType": "MC",

    
        inputProps: { options: options_无有 },

        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },





      }, {

        "key": "personalDrink__",
        "label": "饮酒",

        "inputType": "MC",

 
        inputProps: { options: options_无有 },

        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },





      }, {

        "key": "personalOther",
        "label": "其他",

        "inputType": "input",

        

        "inputProps": { 'placeholder': '请输入其他' },
        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 14 } },





      }]
    }, {


      "name": "家族史",





      "fields": [{

        "key": "familyHeritableDisease__",
        "label": "遗传疾病",

        "inputType": "MC",

        required: true,
        inputProps: { options: options_无有 },

        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },





      }, {

        "key": "familyPsychosis__",
        "label": "精神病",

        "inputType": "MC",

        required: true,
        inputProps: { options: options_无有 },

        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },





      }, {

        "key": "birthDefects__",
        "label": "先天畸形",

        "inputType": "MC",

        required: true,
        inputProps: { options: options_无有 },

        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 16 } },





      }, {

        "key": "familyHistoryOther",
        "label": "其他",

        "inputType": "input",

        

        "inputProps": { 'placeholder': '请输入其他' },
        "span": 6,
        "offset": 0,
        "isNewRow": 0,
        "formItemLayout": { 'labelCol': { 'span': 8 }, 'wrapperCol': { 'span': 14 } },





      }]
    }
  ]
)
