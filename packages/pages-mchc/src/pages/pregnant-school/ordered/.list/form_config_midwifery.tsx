import { APP_CONFIG, rt_ctx } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
import { EMPTY_PLACEHOLDER, format_gp } from "@lm_fe/utils";
const ctx = rt_ctx
const React = ctx.React

const width = 66
export default defineFormConfig(

    [
        {
            dataIndex: 'id',
            hidden: true,
            form_hidden: true,
        },
        {
            title: '姓名',
            dataIndex: ['pregnancy', 'name'],
            layout: '1/1',
            align: 'center',
            width,
        },
        {
            title: '门诊号',
            dataIndex: ['pregnancy', 'outpatientNO'],
            layout: '1/1',
            align: 'center',
        },
        {
            title: '年龄',
            dataIndex: ['pregnancy', 'age'],
            layout: '1/1',
            align: 'center',
            width: width / 2,
        },

        {
            title: '电话号码',
            dataIndex: ['pregnancy', 'telephone'],
            layout: '1/1',
            align: 'center',

            inputType: 'input'
        },
        {
            title: '证件号码',
            dataIndex: ['pregnancy', 'idNO'],
            layout: '1/1',
            align: 'center',

        },
        {
            title: '孕周',
            dataIndex: ['gestationalWeek'],
            layout: '1/1',
            align: 'center',
            width: width / 2,

        },
        {
            title: 'GP',
            dataIndex: ['pregnancy'],
            layout: '1/1',
            width: width / 2,
            isActive: 0,
            align: 'center',
            render(value = {}, rowData, index) {
                return ctx.utils.format_gp(value)
            },
        },
        {
            title: '预产期',
            dataIndex: ['pregnancy', 'sureEdd'],
            layout: '1/1',
            align: 'center',

        },

        {
            title: '高危等级',
            dataIndex: ['pregnancy', 'highriskGrad'],
            layout: '1/1',
            align: 'center',
            width,
            inputType: 'input'
        },

        {
            title: '项目',
            dataIndex: ['course', 'name'],
            layout: '1/1',
            align: 'center',
        },
        {
            title: '项目日期',
            dataIndex: ['course', 'courseDate'],
            layout: '1/1',
            align: 'center',
            render: (text, record) => {
                return `${record.course.courseDate || ''} ${record.course.period}`;
            },
        },
        {
            title: '预约日期',
            dataIndex: 'reserveDate',
            layout: '1/1',
            align: 'center',
            // render: (text, record) => {
            //     return `${record.reserveDate || EMPTY_PLACEHOLDER} ${record.reserveTime}`;
            // },
        },

        // {
        //     title: '参加人数',
        //     dataIndex: 'companionNum',
        //     align: 'center',
        //     width: APP_CONFIG.CELL_WIDTH_SMALL,
        //     layout: '1/1',

        //     inputType: 'input_number',
        // },

        {
            dataIndex: 'status',
            title: '签到',
            layout: '1/1',
            inputType: 'MC',
            width: width,
            inputProps: { marshal: 0, options: '未签到,已签到,已取消' },

            render: (status: number, rowData: any) => {
                const arr = ['未签到', '已签到', '已取消']
                return arr[status]
            },

        },
    ]
)