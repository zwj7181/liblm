import { getOptionValue, mchcEnv, rt_ctx } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx


export default function () {
    const value_已分娩 = getOptionValue('孕期状态', '已分娩') + ''
    const value_终止妊娠 = getOptionValue('孕期状态', '终止妊娠') + ''
    const value_转院 = getOptionValue('孕期状态', '转院') + ''
    return defineFormConfig(
        [
            { key: 'id', form_hidden: true },
            {
                // "id": 12592,
                "key": "recordstate",
                "label": "档案状态",
                "inputType": "MC",

                inputProps: { uniqueKey: 'recordStateMapping', marshal: 0 },
                layout: '1/3',

            },
            {
                // "id": 12593,
                "key": "periodState",
                "label": "孕期状态",
                "inputType": "MC",
                processLocal(v, form) {
                    if (v != 5 || !form)
                        return
                    form.setFieldsValue({
                        referralOutInfo: {
                            recorder: ctx.mchcEnv.user_data.firstName
                        }
                    })
                },
                inputProps: { uniqueKey: '孕期状态', marshal: 0 },
                layout: '2/3',

            },
            {
                // "id": 12594,
                "key": "closingDate",
                "label": "终止时间",
                "inputType": "DatePicker",
                isNewRow: 1,
                showDeps: {
                    ['periodState']: [value_终止妊娠]
                },
                layout: '1/3',

            },
            {
                // "id": 12595,
                "key": "closingGestationalWeek",
                "label": "终止孕周",
                "inputType": "input",
                showDeps: {
                    ['periodState']: [value_终止妊娠]
                },

                layout: '1/3',

            }, {
                // "id": 12596,
                "key": "closingNote",
                "label": "终止原因",
                "inputType": "input",
                showDeps: {
                    ['periodState']: [value_终止妊娠]
                },


                layout: '1/3',
            },
            {
                // "id": 12597,
                "key": "deliveryDate",
                "label": "分娩时间",
                "inputType": "DatePicker",
                isNewRow: 1,
                showDeps: {
                    ['periodState']: [value_已分娩]
                },

                layout: '1/3',

            }, {
                // "id": 12598,
                "key": "deliveryGestationalWeek",
                "label": "分娩孕周",
                "inputType": "input",
                showDeps: {
                    ['periodState']: [value_已分娩]
                },


                layout: '1/3',

            }, {
                // "id": 12599,
                "key": "deliveryMode",
                "label": "分娩方式",
                // "inputType": "select_with_options",
                inputType: 'MS',
                showDeps: {
                    ['periodState']: [value_已分娩]
                },
                "inputProps": {
                    // mode: 'multiple',
                    uniqueKey: mchcEnv.in(['南医增城']) ? '分娩方式' : '分娩方式s',
                    marshal: 0,

                },
                // "specialConfig": { 'type': 'string', 'mode': 'multiple', 'options': [{ 'value': '1', 'label': '顺产' }, { 'value': '2', 'label': '剖宫产' }, { 'value': '3', 'label': '钳产' }, { 'value': '4', 'label': '吸引产' }, { 'value': '5', 'label': '臀助产' }] },
                layout: '1/3',

            },
            {
                // "id": 12619,
                "key": "referralOutInfo.reason",
                "label": "转出原因",
                "inputType": "text_area",
                isNewRow: 1,
                showDeps: {
                    ['periodState']: [value_转院]
                },

                required: true,
                layout: '2/3',

            }, {
                // "id": 12620,
                "key": "referralOutInfo.referralDate",
                "label": "转出时间",
                "inputType": "DatePicker",
                showDeps: {
                    ['periodState']: [value_转院]
                },

                required: true,
                layout: '1/3',

            }, {
                // "id": 12621,
                "key": "referralOutInfo.organizationId",
                "label": "转至单位",
                "inputType": "MyReferralOrganizationSelect",
                showDeps: {
                    ['periodState']: [value_转院]
                },
                "inputProps": {
                    directionKey: 'referralOutInfo.referralDirection',

                },
                required: true,
                layout: '1/3',

            }, {
                // "id": 12626,
                "key": "referralOutInfo.referralDept",
                "label": "转至科室",
                "inputType": "input",
                showDeps: {
                    ['periodState']: [value_转院]
                },

                layout: '1/3',

            }, {
                // "id": 12622,
                "key": "referralOutInfo.referralDirection",
                "label": "转诊类型",
                "inputType": "checkbox_group",
                showDeps: {
                    ['periodState']: [value_转院]
                },

                "specialConfig": { 'type': 'single', 'options': [{ 'value': 1, 'label': '平级', 'span': 6, 'withInput': false }, { 'value': 2, 'label': '上级', 'withInput': false, 'span': 6 }, { 'value': 3, 'label': '下级', 'withInput': false, 'span': 6 }] },

                layout: '1/3',

            }, {
                // "id": 12623,
                "key": "referralOutInfo.referralDoctor",
                "label": "申请者",
                "inputType": "input",
                showDeps: {
                    ['periodState']: [value_转院]
                },

                layout: '1/3',

            }, {
                // "id": 12624,
                "key": "referralOutInfo.referralContactNumber",
                "label": "科室联系电话",
                "inputType": "input",
                showDeps: {
                    ['periodState']: [value_转院]
                },

                layout: '1/3',

            }, {
                // "id": 12625,
                "key": "referralOutInfo.recorder",
                "label": "记录者",
                "inputType": "MA",
                showDeps: {
                    ['periodState']: [value_转院]
                },
                required: true,
                layout: '1/3',

            }]
    )
}