import { IMchc_FormDescriptions_Field_Nullable, SLocal_State } from "@lm_fe/service"
import { expect_array, formatDate, safe_json_parse } from "@lm_fe/utils"

export const form_config: IMchc_FormDescriptions_Field_Nullable[] = [{
  "id": 820,
  "moduleName": "folic-acid-file",
  "name": "用户信息",
  "sort": 0,
  "children": [
    // {
    //   "id": 18464,
    //   "key": "highRiskFactors",
    //   "label": "高危因素",
    //   "inputType": "checkbox_with_inputv2",
    //   "rules": [{ "required": true, "message": "高危因素是必填项" }],
    //   "specialConfig": {
    //     "type": "multiple", "options": [
    //       { "value": 0, "label": "无", "withInput": false, "along": true, "span": 4 },
    //       { "value": 1, "label": "既往生育神经缺陷胎儿", "withInput": false, "span": 4 },
    //       { "value": 2, "label": "服用抗癫痫药物", "withInput": false, "span": 4 },
    //       { "value": 3, "label": "其他", "withInput": true, "span": 4 }
    //     ]
    //   },
    //   "span": 16,
    //   "offset": 0,
    //   "formItemLayout": { "labelCol": { "span": 3 }, "wrapperCol": { "span": 20 } },
    // 
    // },
    {
      "id": 18464,
      "key": "highRiskFactors",
      "label": "高危因素",
      inputType: 'MC',
      required: true,
      layout: '1/1',
      inputProps: {
        options: '无,既往生育神经缺陷胎儿,服用抗癫痫药物,其他',
        type: 'multiple',
      },
      processRemote(v, form) {
        const obj = safe_json_parse(v, {})
        if (Array.isArray(obj)) return obj
        const checkedValues = expect_array(obj.checkedValues)
        console.log('checkedValues', { checkedValues })
        return checkedValues.map(_ => ({ value: _ }))
      }
    },
    {
      "id": 18465,
      "key": "filingDate",
      "label": "建档日期",
      "inputType": "single_date_picker",
      "tranferRules": { "type": "dayjs()" },
      "rules": [{ "required": true, "message": "建档日期是必填项" }],

      "span": 8,
      "offset": 0,
      "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
    
    }, {
      "id": 18459,
      "key": "name",
      "label": "姓名",
      "inputType": "input",
      "rules": [{ "required": true, "message": "姓名是必填项" }],

      "span": 8,
      "offset": 0,
      "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
    
    }, {
      "id": 18460,
      "key": "telephone",
      "label": "电话号码",
      "inputType": "input",
      "rules": [{ "required": true, "message": "电话号码是必填项" }, { "type": "string", "min": 11, "message": "请输入11位手机号码" }, { "max": 11, "message": "请输入正确的手机号码格式" }],

      "inputProps": { "placeholder": "请输入电话号码" },
      "span": 8,
      "offset": 0,
      "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
    
    }, {
      "id": 18461,
      "key": "idType",
      "label": "证件类型",
      "inputType": "normal_select",
      "rules": [{ "required": true, "message": "证件类型是必填项" }],

      "span": 8,
      "offset": 0,
      "isNewRow": 1,
      "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
    
    }, {
      "id": 18462,
      "key": "idNO",
      "label": "证件号码",
      "inputType": "id_number_input",
      "rules": [{ "required": true, "message": "证件号码是必填项" }],

      "inputProps": { "placeholder": "请输入证件号码" },
      "span": 8,
      "offset": 0,
      "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
    
    }, {
      "id": 18463,
      "key": "age",
      "label": "年龄",
      "inputType": "input_number",
      "rules": [{ "required": true, "message": "年龄是必填项" }],

      "span": 8,
      "offset": 0,
      "formItemLayout": { "labelCol": { "span": 6 }, "wrapperCol": { "span": 16 } },
    
    }]
},
{
  "id": 821,
  "name": "发放叶酸",
  "sort": 0,
  "children": [
    // {
    //   "id": 18466,
    //   "key": "folateDistributionRecords",

    //   "inputType": "optimize_edit_in_table",
    //   "rules": [{ "required": false, "message": "null是必填项" }],
    //   "specialConfig": { "editable": true, "tableColumns": [{ "key": "issueDate", "title": "发放日期", "editor": { "input_type": "single_date_picker" } }, { "key": "currentStage", "title": "当前阶段", "editor": { "input_type": "select_with_options", "input_props": { "options": [{ "label": "备孕", "value": "备孕" }, { "label": "孕早期", "value": "孕早期" }] } } }, { "key": "gestationalWeek", "title": "孕周", "editor": { "input_type": "input" } }, { "key": "issueNumber", "title": "发放数量(瓶)", "editor": { "input_type": "input" } }, { "title": "有效日期", "children": [{ "key": "effectiveDateBegin", "title": "开始日期", "isNeedDefaultVal": false, "editor": { "input_type": "single_date_picker" } }, { "key": "effectiveDateEnd", "title": "结束日期", "isNeedDefaultVal": false, "editor": { "input_type": "single_date_picker" } }] }, { "key": "registerPerson", "title": "登记者", "isNeedLoginUser": true, "editor": { "input_type": "input" } }, { "key": "followUpDate", "title": "随访时间", "isNeedDefaultVal": false, "editor": { "input_type": "single_date_picker" } }, { "key": "followUpCondition", "title": "随访情况", "editor": { "input_type": "select_with_options", "input_props": { "options": [{ "label": "正常", "value": "正常" }, { "label": "号码错误", "value": "号码错误" }, { "label": "未接听", "value": "未接听" }] } } }, { "key": "followUpWay", "title": "随访方式", "editor": { "input_type": "select_with_options", "input_props": { "options": [{ "label": "电话", "value": "电话" }, { "label": "微信", "value": "微信" }, { "label": "现场", "value": "现场" }] } } }, { "key": "takeCondition", "title": "服用情况", "editor": { "input_type": "select_with_options", "input_props": { "options": [{ "label": "规律", "value": "规律" }, { "label": "间断", "value": "间断" }, { "label": "未服", "value": "未服" }] } } }, { "key": "remark", "title": "备注", "editor": { "input_type": "input" } }] },

    //   "span": 24,
    //   "offset": 0,
    //   "formItemLayout": { "labelCol": { "span": 0 }, "wrapperCol": { "span": 24 } },
    // 
    // },
    {
      "id": 18466,
      "key": "folateDistributionRecords",

      "inputType": "MyEditTable",
      "rules": [{ "required": false, "message": "null是必填项" }],

      inputProps: {
        marshal: 0,
        showEdit: true,
        genRowData(list) { return { issueDate: formatDate(), effectiveDateBegin: formatDate(), registerPerson: SLocal_State.getUserData().login } },
        // frontCols: [{ title: '序号', render(a, b, c) { return c + 1 }, align: 'center', width: 86 }],
        formDescriptions: [
          {

            dataIndex: 'issueDate',
            title: '发放日期',
            inputType: 'DatePicker',
          },
          {
            dataIndex: 'currentStage',
            title: '当前阶段',
            inputType: 'MA',
            inputProps: {
              options: '备孕,孕早期',
            },
          },
          {
            dataIndex: 'gestationalWeek',
            title: '孕周',
            inputType: 'MA',
          },
          {
            dataIndex: 'issueNumber',
            title: '发放数量(瓶)',
            inputType: 'MA',
          },
          {
            "title": "有效日期",
            dataIndex: 'effectiveDate',
            inputType: 'ArrayInput',
            width: 240,
            inputProps: {
              options: [
                { inputType: 'DatePicker' },
                { inputType: 'DatePicker' },
              ]
            },
            processRemote(v?: string,) {
              const arr = safe_json_parse(v)
              if (Array.isArray(arr)) return arr
              const obj = v?.split?.('~') ?? []

              return JSON.stringify(obj)
            }
          },
          {
            dataIndex: 'registerPerson',
            title: '登记者',
            inputType: 'MA',
          },
          {

            dataIndex: 'followUpDate',
            title: '随访时间',
            inputType: 'DatePicker',
          },
          {
            dataIndex: 'followUpCondition',
            title: '随访情况',
            inputType: 'MA',
            inputProps: {
              options: '正常,号码错误,未接听',
            },
          },
          {
            dataIndex: 'followUpWay',
            title: '随访方式',
            inputType: 'MA',
            inputProps: {
              options: '电话,微信,现场',
            },
          },
          {
            dataIndex: 'takeCondition',
            title: '服用情况',
            inputType: 'MA',
            inputProps: {
              options: '规律,间断,未服',
            },
          },

          { "dataIndex": "remark", "title": "备注", inputType: 'MA', }
        ]
      },
      "span": 24,
      "offset": 0,
      "formItemLayout": { "labelCol": { "span": 0 }, "wrapperCol": { "span": 24 } },
    
    }
  ]
}
]