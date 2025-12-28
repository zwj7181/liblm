import { width } from "@lm_fe/pages";
import { defineFormConfig } from "@lm_fe/service";

export default defineFormConfig([
    {
        name: 'outpatientNO',
        label: '就诊卡号',
        inputType: 'input',

    },
    {
        name: 'archivesNO',
        label: '建档号',
        inputType: 'input',

    },
    {
        name: 'validateDate',
        label: '建档日期',
        inputType: 'rangeDate',

    },
    {
        name: 'recordstate',
        label: '档案状态',
        inputType: 'select',
        filterType: 'in',
        inputProps: {
            options: [
                { label: '全部', value: null },
                { label: '未审核', value: '0,null' },
                { label: '已审核', value: '1,6' },
            ]
        }
    },
    // {
    //     name: 'customerService',
    //     label: '客服专员',
    //     inputType: 'select',
    //     filterType: 'equals',
    // },

    {
        name: 'firstRecord',
        label: '是否孕保',
        inputType: 'select',

        filterType: 'equals',
        inputProps: {
            options: [
                { label: '是', value: 'true' },
                { label: '否', value: 'false' },
            ]
        }
    },
    {
        name: 'currentGestationalWeekInt',
        // filterType: 'greaterOrEqualThan,lessOrEqualThan',
        label: '当前孕周',
        inputType: 'ArrayInput',
        inputProps: {
            separator: '~',
            options: [
                { inputType: 'input', props: { width: 64 } },
                { inputType: 'input', props: { width: 64 } },
            ]
        }

    },
    // {
    //     name: 'currentGestationalWeekInt',
    //     filterType: 'lessOrEqualThan',

    //     label: '结束当前孕周',
    //     inputType: 'input_number',


    // },
])