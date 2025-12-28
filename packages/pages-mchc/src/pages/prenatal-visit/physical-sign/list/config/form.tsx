import { mchcEnv } from '@lm_fe/env';
let engagementOption = [
  { label: '入', value: '入' },
  { label: '未', value: '未' },
  { label: '半', value: '半' },
]
let fetusesMeasureTableConfig = JSON.stringify({
  "tableColumns": [
    {
      "title": "胎心率",
      "dataIndex": "fetalHeartRate",
      "inputType": "input_number",
      "align": "center",
      "editable": true
    },
    {
      "title": "位置",
      "dataIndex": "fetalPosition",
      "align": "center",
      "inputType": "select_with_options_or_input",
      "inputProps": {
        "options": [
          {
            "label": "左上",
            "value": "左上"
          },
          {
            "label": "左下",
            "value": "左下"
          },
          {
            "label": "右上",
            "value": "右上"
          },
          {
            "label": "右下",
            "value": "右下"
          },
          {
            "label": "脐上",
            "value": "脐上"
          },
          {
            "label": "脐下",
            "value": "脐下"
          }
        ]
      },
      "editable": true
    },
    {
      "title": "胎方位",
      "dataIndex": "position",
      "align": "center",
      "inputType": "select_with_options_or_input",
      "inputProps": {
        "options": [
          {
            "label": "LOT",
            "value": "LOT"
          },
          {
            "label": "LOA",
            "value": "LOA"
          },
          {
            "label": "ROT",
            "value": "ROT"
          },
          {
            "label": "ROA",
            "value": "ROA"
          }
        ]
      },
      "editable": true
    },
    {
      "title": "先露",
      "dataIndex": "presentation",
      "align": "center",
      "inputType": "select_with_options_or_input",
      "inputProps": {
        "options": [
          {
            "label": "头",
            "value": "头"
          },
          {
            "label": "臀",
            "value": "臀"
          },
          {
            "label": "肩",
            "value": "肩"
          },
          {
            "label": "-",
            "value": "-"
          }
        ]
      },
      "editable": true
    }
  ]
})
if (mchcEnv.in(['郫都'])) {
  engagementOption = [
    { label: '浮', value: '浮' },
    { label: '半入', value: '半入' },
    { label: '入', value: '入' },
  ]
  fetusesMeasureTableConfig = JSON.stringify({
    "tableColumns": [
      {
        "title": "胎动",
        "dataIndex": "fetalMovement",
        "align": "center",
        "inputType": "select_with_options_or_input",
        "width": "100",
        "inputProps": {
          "options": [
            {
              "label": "无",
              "value": "无"
            },
            {
              "label": "有",
              "value": "有"
            },
            {
              "label": "120-140",
              "value": "120-140"
            },
          ]
        },
        "editable": true
      },
      {
        "title": "胎心率",
        "dataIndex": "fetalHeartRate",
        "inputType": "input_number",
        "align": "center",
        "width": "100",
        "editable": true
      },
      {
        "title": "位置",
        "dataIndex": "fetalPosition",
        "align": "center",
        "inputType": "select_with_options_or_input",
        "inputProps": {
          "options": [
            {
              "label": "左上",
              "value": "左上"
            },
            {
              "label": "左下",
              "value": "左下"
            },
            {
              "label": "右上",
              "value": "右上"
            },
            {
              "label": "右下",
              "value": "右下"
            },
            {
              "label": "脐上",
              "value": "脐上"
            },
            {
              "label": "脐下",
              "value": "脐下"
            }
          ]
        },
        "editable": true
      },
      {
        "title": "胎方位",
        "dataIndex": "position",
        "align": "center",
        "inputType": "select_with_options_or_input",
        "inputProps": {
          "options": [
            { "label": "LOA", "value": "LOA" },
            { "label": "LOT", "value": "LOT" },
            { "label": "LOP", "value": "LOP" },
            { "label": "ROA", "value": "ROA" },
            { "label": "ROT", "value": "ROT" },
            { "label": "ROP", "value": "ROP" },
            { "label": "LSA", "value": "LSA" },
            { "label": "LST", "value": "LST" },
            { "label": "LSP", "value": "LSP" },
            { "label": "RSA", "value": "RSA" },
            { "label": "RST", "value": "RST" },
            { "label": "RSP", "value": "RSP" },
            { "label": "LScA", "value": "LScA" },
            { "label": "RScA", "value": "RScA" },
            { "label": "RScP", "value": "RScP" },
          ]
        },
        "editable": true
      },
      {
        "title": "先露",
        "dataIndex": "presentation",
        "align": "center",
        "inputType": "select_with_options_or_input",
        "inputProps": {
          "options": [
            {
              "label": "头",
              "value": "头"
            },
            {
              "label": "臀",
              "value": "臀"
            },
            {
              "label": "肩",
              "value": "肩"
            },
            {
              "label": "-",
              "value": "-"
            }
          ]
        },
        "editable": true
      }
    ]
  })
}
export const modalFormDescriptions = {
  outpatientNO: {
    key: 'outpatientNO',
    label: '就诊卡号',
    rules: [{ required: true, message: '就诊卡号是必填项' }],
    inputType: 'patient_auto_complete',
    inputProps: {
      urlPath: '/api/pregnancies',
      style: {
        width: 156,
      },
    },
    span: 8,
    offset: 0,
  },
  name: {
    key: 'name',
    label: '姓名',
    inputType: 'input',
    span: 8,
    offset: 0,
  },
  createDate: {
    key: 'createDate',
    label: '创建时间',
    inputType: 'single_date_picker',
    span: 8,
    offset: 0,
    inputProps: {
      disabled: true,
      style: {
        width: 156,
      },
    },
  },
  bloodPressure: {
    key: 'bloodPressure',
    label: '血压-首测',
    inputType: 'pressure',
    span: 8,
    offset: 0,
  },
  bloodPressure2: {
    key: 'bloodPressure2',
    label: '血压-二测',
    inputType: 'pressure',
    span: 8,
    offset: 0,
  },
  bloodPressure3: {
    key: 'bloodPressure3',
    label: '血压-三测',
    inputType: 'pressure',
    span: 8,
    offset: 0,
  },
  'physicalExamMeasure.height': {
    key: 'physicalExamMeasure.height',
    label: '身高',
    unit: 'cm',
    inputType: 'input_number',
    span: 8,
    offset: 0,
    inputProps: {
      style: {
        width: 156,
      },
    },
  },
  'physicalExamMeasure.weight': {
    key: 'physicalExamMeasure.weight',
    label: '体重',
    unit: 'kg',
    inputType: 'input_number',
    span: 8,
    offset: 0,
    inputProps: {
      style: {
        width: 156,
      },
    },
  },
  'physicalExamMeasure.pulse': {
    key: 'physicalExamMeasure.pulse',
    label: '脉搏',
    unit: 'bpm',
    inputType: 'input_with_range',
    special_config: '{"min":60,"max":100,"tip":"脉搏的正常范围值是60~100bpm"}',
    span: 8,
    offset: 0,
    inputProps: {
      style: {
        width: 156,
      },
    },
  },
  'gynecologicalExamMeasure.fundalHeight': {
    key: 'gynecologicalExamMeasure.fundalHeight',
    label: '宫高',
    unit: 'cm',
    inputType: 'input_number',
    span: 8,
    offset: 0,
    inputProps: {
      style: {
        width: 156,
      },
    },
  },
  'gynecologicalExamMeasure.waistHip': {
    key: 'gynecologicalExamMeasure.waistHip',
    label: '腹围',
    unit: 'cm',
    inputType: 'input_number',
    span: 8,
    offset: 0,
    inputProps: {
      style: {
        width: 156,
      },
    },
  },
  'gynecologicalExamMeasure.engagement': {
    key: 'gynecologicalExamMeasure.engagement',
    label: '衔接',
    inputType: 'normal_select',
    inputProps: {
      options: engagementOption,
      style: {
        width: 156,
      },
    },
    span: 8,
    offset: 0,
  },
  fetusesMeasure: {
    key: 'fetusesMeasure',
    label: '胎儿信息',
    inputType: 'edit_in_table',
    specialConfig: fetusesMeasureTableConfig,
    span: 24,
    offset: 0,
    formItemLayout: {
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 22,
      },
    },
  },
};

export const queryFormDescriptions = {
  outpatientNO: {
    label: '就诊卡号',
    inputType: 'input',
    filterType: '',
  },
  createDate: {
    label: '体检日期',
    inputType: 'rangeDate',
    filterType: '',
  },
};

export default {
  queryFormDescriptions,
  modalFormDescriptions,
};
