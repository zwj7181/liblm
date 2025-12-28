import { rt_ctx } from "@lm_fe/env";
import { pressure_fd } from "@lm_fe/pages";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx
export default defineFormConfig(
    [
        {
            "key": "id",
            form_hidden: true,
        },
        {
            "key": "outEmrId",
            form_hidden: true,
        },



        pressure_fd(
            { label: '血压首测', isNewRow: true, },
            { name: 'physicalExam.systolic', required: true },
            { name: 'physicalExam.diastolic', required: true }
        ),
        pressure_fd(
            { label: '血压二测' },
            { name: 'physicalExam.systolic2' },
            { name: 'physicalExam.diastolic2' }
        ),
        pressure_fd(
            { label: '血压三测' },
            { name: 'physicalExam.systolic3' },
            { name: 'physicalExam.diastolic3' }
        ),
        {
            "key": "physicalExam.weight",
            "label": "体重",
            "inputType": "input",
            "inputProps": { 'type': 'number', 'unit': 'kg' },
            layout: '1/4',
        },
        {

            "key": "chiefComplaint",
            "label": "主诉",
            "inputType": "textareaWithTemplate",
            isNewRow: 1,
            inputProps: {
                'rows': 2,
                TemplateTextarea_type: [
                    { title: '科室', type: 16, depid: 2 },
                    { title: '个人', type: 17 },
                ]
            },
            // "inputProps": { 'minRows': 2, 'maxRows': 5, 'title': '主诉模板', 'departmentTempalteType': 16, 'personalTempalteTType': 17, 'departmentId': 2 },
            layout: '1/2',
        },
        {

            "key": "phi",
            "label": "现病史",
            "inputType": "textareaWithTemplate",
            // "inputProps": { 'minRows': 2, 'maxRows': 5, 'title': '现病史模板', 'departmentTempalteType': 8, 'personalTempalteTType': 9, 'departmentId': 2 },
            inputProps: {
                'rows': 2,
                TemplateTextarea_type: [
                    { title: '科室', type: 8, depid: 2 },
                    { title: '个人', type: 9 },
                ]
            },
            layout: '1/2',
        },
        {
            "key": "mentalstateNote",
            "label": "心理状况",
            "inputType": "MA",
            "inputProps": { 'options': ctx.mchcEnv.get_other_options('mentalstateOptions') },
            layout: '1/4',
        }, {
            "key": "gynecologicalExam.breastNote",
            "label": "乳房",
            "inputType": "MA",
            "inputProps": { 'options': ctx.mchcEnv.get_other_options('breastOptions') },
            layout: '1/4',
        }, {
            "key": "gynecologicalExam.lochia",
            "label": "恶露",
            "inputType": "MA",
            "inputProps": { 'options': ctx.mchcEnv.get_other_options('lochiaOptions') },
            layout: '1/4',
        }, {
            "key": "gynecologicalExam.vulva",
            "label": "外阴",
            "inputType": "MA",
            "inputProps": { 'options': ctx.mchcEnv.get_other_options('vulvaOptions') },
            layout: '1/4',
        }, {
            "key": "gynecologicalExam.cervix",
            "label": "宫颈",
            "inputType": "MA",
            "inputProps": { 'options': ctx.mchcEnv.get_other_options('vulvaOptions') },
            layout: '1/4',
        }, {
            "key": "gynecologicalExam.uterus",
            "label": "子宫",
            "inputType": "MA",
            "inputProps": { 'options': ctx.mchcEnv.get_other_options('vulvaOptions') },
            layout: '1/4',
        }, {
            "key": "gynecologicalExam.adnexa",
            "label": "附件",
            "inputType": "MA",
            "inputProps": { 'options': ctx.mchcEnv.get_other_options('vulvaOptions') },
            layout: '1/4',
        }, {
            "key": "gynecologicalExam.pelvicfloor",
            "label": "盆底评分",
            "inputType": "input",
            layout: '1/4',
        }, {
            "key": "gynecologicalExam.pelvicfloorNote",
            "label": "盆底恢复",
            "inputType": "MA",
            "inputProps": { 'options': ctx.mchcEnv.get_other_options('pelvicfloorOptions') },
            layout: '1/4',
        },

        {
            "key": "highrisk",
            "label": "高危转归",
            "inputType": "MA",
            "inputProps": { 'options': ctx.mchcEnv.get_other_options('highriskOptions') },
            layout: '1/4',
        },
        {
            "key": "gynecologicalExam.otherNote",
            "label": "其他",
            "inputType": "input",
            layout: '1/4',
        },
        {

            "key": "inspection",
            "label": "检验检查",
            "inputType": "textareaWithResult",
            isActive: true,
            "inputProps": {
                'rows': 2,
                TemplateTextarea_type: [{ title: '检验结果', url: '/api/getLabExamImportTree' }, { title: '超声结果', url: '/api/getImageExamImportTree' }],
                gen_obj: function () {
                    return { pregnancyId: ctx.utils.single_id() }
                },
            },
            layout: '1/2',
            "isNewRow": 1,
        },


        {

            "key": "exam",
            "label": "辅助检查",
            "inputType": "textareaWithTemplate",
            inputProps: {
                TemplateTextarea_type: [
                    { title: '个人', type: 14 },
                    { title: '科室', type: 13, depid: 2 },
                ]
            },
            layout: '1/2',
        },
        {
            "key": "diagnosis",
            "label": "诊断",
            "inputType": "MA",
            "inputProps": { 'options': ctx.mchcEnv.get_other_options('diagnosisOptions') },
            layout: '1/2',
            "isNewRow": 1,
        }, {
            "key": "advice",
            "label": "处理意见",
            "inputType": "input",
            layout: '1/2',
        }, {
            "key": "visitDate",
            "label": "随访日期",
            "inputType": "date",
            layout: '1/4',
            "isNewRow": 1,
        }, {
            "key": "doctorName",
            "label": "随访医生",
            "inputType": "input",
            layout: '1/4',
        }

    ]
)
