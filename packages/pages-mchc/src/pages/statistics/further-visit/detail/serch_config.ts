import { width } from "@lm_fe/pages";
import { defineFormConfig } from "@lm_fe/service";

export default defineFormConfig([
    {
        name: 'visitDate',
        label: '产检日期',
        inputType: 'rangeDate',
    },
    {
        name: 'visitType',

        label: '产检类型',
        inputType: 'select',
        filterType: 'equals',
        inputProps: {
            options: [
                { label: '首诊', value: '0' },
                { label: '复诊', value: '1' },
                { label: '产后', value: '2' },
                { label: '全部', value: '' },
            ],
        }
    },
    {
        name: 'visitStatus',

        label: '复诊状态',
        inputType: 'select',
        filterType: 'equals',
        inputProps: {
            options: [
                { label: '未复诊', value: '0' },
                { label: '已复诊', value: '1' },
                { label: '全部', value: null },
            ],
        }

    },
    {
        name: 'highriskGrade',

        label: '高危等级',
        inputType: 'select',
        filterType: 'equals',
        inputProps: {
            options: [
                { label: 'Ⅰ', value: 'Ⅰ' },
                { label: 'Ⅱ', value: 'Ⅱ' },
                { label: 'Ⅲ', value: 'Ⅲ' },
                { label: 'Ⅳ', value: 'Ⅳ' },
                { label: 'Ⅴ', value: 'Ⅴ' },
            ],
        }
    },
    {
        name: 'gestationalWeekStart',
        label: '孕周',
        inputType: 'input',
    },

])