import { rt_ctx } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx

export default defineFormConfig(
    [
        {
            title: '就诊卡号',
            dataIndex: 'patientNo',
            inputType: 'PatientSelect',
            disabledDeps(f) {
                return !!f.getFieldValue('id')
            },
            inputProps: {
                onPatientSelect(v, form) {
                    if (form) {
                        form.setFieldsValue({ name: v.name })
                    }
                },
            },
            layout: '1/3',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            layout: '1/3',
            inputProps: { disabled: true }
        },
        {
            title: '检查医院',
            dataIndex: 'organization',
            layout: '1/3',
        },

        {
            title: '项目类型',
            dataIndex: 'type',
            layout: '1/3',
            inputType: 'MS',
            required: true,
            inputProps: { options: '检验报告,检查报告', marshal: 0 }
        },
        {
            title: '项目名称',
            dataIndex: 'title',
            required: true,
            layout: '1/3',
            inputType: 'MA',
            inputProps: { options: '血常规,传染病五项' }
        },
        {
            title: '上传日期',
            dataIndex: 'reportDate',
            layout: '1/3',
            required: true,

            inputType: 'DatePicker',

        },
        // {
        //   title: '上传日期',
        //   dataIndex: 'uploadDate',
        //   width: APP_CONFIG.CELL_WIDTH_SMALL,
        //   render: (text) => dayjs(text).format('YYYY-MM-DD'),
        // },
        {
            title: '操作人',
            dataIndex: 'recorder',
            layout: '1/3',
            form_hidden: true

        },
        {
            title: '结果',
            dataIndex: 'result',
            layout: '1/3',
            form_hidden: true
        },
        {
            title: '文件类型',
            dataIndex: 'fileType',
            layout: '1/3',
            required: true,
            inputType: 'MC',
            inputProps: { options: 'PDF,图片', marshal: 0 },
            hidden: true
        },
        {
            title: '上传文件',
            dataIndex: 'path',
            inputType: 'UploadFile',
            inputProps: { action: "/api/uploadVideo" },
            showDeps: { fileType: [1], },
            layout: '1/1',
            required: true,

            hidden: true,

        },
        {
            title: '上传图片',
            dataIndex: 'path',
            inputType: 'UploadFile',
            inputProps: { action: "/api/uploadVideo", mode: 'multiple', listType: 'picture', linker: '`#' },
            showDeps: { fileType: [2] },
            required: true,

            layout: '1/1',
            hidden: true

        },


    ]
)