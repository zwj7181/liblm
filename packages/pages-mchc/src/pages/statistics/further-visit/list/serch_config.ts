import { width } from "@lm_fe/pages";
import { defineFormConfig } from "@lm_fe/service";

export default defineFormConfig([
    {
        name: 'visitDate',
        label: '建档日期',
        inputType: 'rangeDate',
    },

    {
        name: 'isSum',
        label: '查询合计',
        inputType: 'MSW',
        inputProps: {
        }
    },

])