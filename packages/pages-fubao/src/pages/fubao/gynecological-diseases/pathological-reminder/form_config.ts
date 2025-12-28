import { getSameOptions } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field, SMchc_Knowledges, SMchc_Questionnaire } from "@lm_fe/service";
import { formatDate, formatDateTimeNoSecond } from "@lm_fe/utils";


interface IData {
    "id": 49,
    "checkDate": "2024-09-30",
    "name": "孙文",
    "telephone": "15574005542",
    "screeningType": "乳腺癌筛查",
    "screeningSuggest": "定期检查",
    "notificationWay": "电话",
    "notificationDate": "2024-10-28",
    "notificationPerson": "admin121111",
    "notificationNote": "后续复查",
    "notificationOtherNote": "111",
    "loseTrack": 1,
    "notificationStatus": 1,
    "deleteFlag": 0,
    "breastCancerScreeningId": 31,
    "twoCancerScreeningId": 16
}


export const form_config: IMchc_FormDescriptions_Field[] = [
    {

        label: "姓名",
        name: "name",
        inputType: 'MA',
        layout: '1/3'
    },

    {

        label: "电话号码",
        name: "telephone",
        inputType: 'MA',
        layout: '1/3'
    },

    {

        label: "检查日期",
        name: "checkDate",
        inputType: 'DatePicker',
        layout: '1/3'
    },
    {

        label: "检查类型",
        name: "screeningType",
        inputType: 'MA',
        layout: '1/3'
    },
    {

        label: "建议",
        name: "screeningSuggest",
        inputType: 'MA',
        layout: '1/3'
    },
    {

        label: "通知登记",
        children: [
            {
                label: "通知内容",
                name: "notificationContent",

                inputType: 'text_area',
                layout: '1/1'
            },
            {
                label: "通知方式",
                name: "notificationWay",
                inputProps: {
                    options: getSameOptions('电话,短信,微信,现场'),
                    marshal: 0,
                },
                inputType: 'MC',
                layout: '1/2'
            },
            {
                label: "通知状态",
                name: "notificationStatus",
                inputProps: {
                    marshal: 0,
                    options: '成功,失败'
                },
                inputType: 'MC',
                layout: '1/2'
            },
            {
                label: "知识库",
                name: "knowledgeId",
                inputProps: {
                    marshal: 0,
                    fetch_options: () => SMchc_Knowledges.to_options(),
                },
                inputType: 'MS',
                layout: '1/2'
            },
            {
                label: "问卷",
                name: "questionnaireId",
                inputProps: {
                    fetch_options: () => SMchc_Questionnaire.to_options(),
                    marshal: 0,
                },
                inputType: 'MS',
                layout: '1/2'
            },

            {
                label: "是否失访",
                name: "loseTrack",
                inputType: 'MC',
                inputProps: {
                    marshal: 0,
                    options: '否,是'
                },
                layout: '1/2'
            },
            {
                label: "备注",
                name: "notificationNote",
                inputType: 'MA',
                inputProps: {
                    options: '未接听,号码错误,后续排查,拒绝复查,其他'
                },
                layout: '1/2'
            },


            {
                label: "通知日期",
                name: "notificationDate",
                inputType: 'DatePicker',
                layout: '1/2'
            },
            {
                label: "通知人",
                name: "notificationPerson",
                inputType: 'input',
                layout: '1/2'
            },
        ]

    },



]