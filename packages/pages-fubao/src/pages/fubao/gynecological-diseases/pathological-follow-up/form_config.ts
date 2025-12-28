import { getSameOptions } from "@lm_fe/env";
import { IMchc_FormDescriptions_Field, SMchc_Knowledges, SMchc_Questionnaire } from "@lm_fe/service";
import { formatDate, formatDateTimeNoSecond } from "@lm_fe/utils";


interface IData {
    "id": 49,
    "checkDate": "2024-09-30",
    "checkOrganization": "123",
    "name": "孙文",
    "telephone": "15574005542",
    "screeningType": "乳腺癌筛查",
    "screeningSuggest": "定期检查",
    "pathologicalExaminationDate": "2024-10-28",
    "pathologicalExaminationResult": "123",
    "treatment": "其他",
    "notificationNote": "其他",
    "notificationOtherNote": "wwww",
    "notificationWay": "微信",
    "notificationDate": "2024-10-28",
    "loseTrack": 0,
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

        label: "随访登记",
        children: [
            {
                label: "随访内容",
                name: "notificationContent",

                inputType: 'text_area',
                layout: '1/1'
            },
            {
                label: "随访方式",
                name: "notificationWay",
                inputProps: {
                    options: getSameOptions('电话,短信,微信,现场'),
                    marshal: 0,
                },
                inputType: 'MC',
                layout: '1/2'
            },
            {
                label: "随访状态",
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
                label: "随访日期",
                name: "notificationDate",
                inputType: 'DatePicker',
                layout: '1/2'
            },
            {
                label: "病理检查日期",
                name: "pathologicalExaminationDate",
                inputType: 'DatePicker',
                layout: '1/2'
            },
            {
                label: "检查机构",
                name: "checkOrganization",
                inputType: 'input',
                layout: '1/2'
            },
            {
                label: "病理检查情况",
                name: "pathologicalExaminationResult",
                inputType: 'input',
                layout: '1/2'
            },
            {
                label: "治疗方法",
                name: "treatment",
                inputType: 'MA',
                inputProps: {
                    options: '无,宫颈冷冻,宫颈锥切,子宫切除手术,放疗,化疗,手术,其他'
                },
                layout: '1/2'
            },
        ]

    },



]