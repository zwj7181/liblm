import { APP_CONFIG, rt_ctx } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx
const React = ctx.React


export default defineFormConfig(
    [
        {
            title: '课程标题',
            dataIndex: 'name',
            align: 'center',
            width: APP_CONFIG.CELL_WIDTH_MIDDLE,
            layout: '1/1',
        },
        {
            key: 'poster',
            label: '课程封面',
            inputType: 'image_upload_preview',
            hidden: true,
            layout: '1/1',

        },
        {
            title: '课程简述',
            dataIndex: 'intro',
            hidden: true,
            align: 'center',
            width: APP_CONFIG.CELL_WIDTH_MIDDLE,
            layout: '1/1',

        },
        {
            title: '主讲人',
            dataIndex: 'teacher',
            align: 'center',
            layout: '1/1',
            width: APP_CONFIG.CELL_WIDTH_SMALL,
        },



        {
            title: '主讲人职位',
            dataIndex: 'position',
            inputType: 'input',
            hidden: true,
            layout: '1/1',

        },

        {
            title: '开课时间',
            dataIndex: 'courseDate',
            align: 'center',
            layout: '1/2',
            inputType: 'DatePicker',

            width: APP_CONFIG.CELL_WIDTH_LARGE,
            render: (value, rowData) => {
                const { courseDate, period } = rowData
                return `${courseDate}  ${period} `;
            },
        },
        {
            title: '',
            dataIndex: 'period',
            align: 'center',
            layout: '1/2',
            hidden: true,
            inputType: 'ArrayInput',
            processLocal(v?: string[],) {
                if (!v) return ''
                if (v.length < 2) return ''
                return v.join(' - ')
            },
            processRemote(v?: string,) {
                const a = v?.split(' - ') ?? []
                return [a[0], a[1]]
            },
            inputProps: {
                marshal: 2,
                options: [
                    { inputType: 'DatePicker', props: { time_only: true, format: 'HH:mm' } },
                    { inputType: 'DatePicker', props: { time_only: true, format: 'HH:mm' } },
                ]
            }

        },
        {
            title: '开课地点',
            dataIndex: 'location',
            ellipsis: true,
            layout: '1/1',
            width: APP_CONFIG.CELL_WIDTH_MIDDLE,
        },
        {
            title: '可预约人数',
            dataIndex: 'limitNum',
            align: 'center',
            layout: '1/1',
            width: APP_CONFIG.CELL_WIDTH_SMALL,
        },
        {
            title: '已预约孕妇数',
            dataIndex: 'reserveNum',
            isActive: 0,
            ellipsis: true,
            width: 100,
            layout: '1/1',
            align: 'center',
            render: (recordstate: any, rowData: any) => {
                return (
                    <div onClick={() => { ctx.mchcEnv.event.emit('custom_msg', { type: 'courses.reserveNum', data: rowData }) }} style={{ color: '#007AFF', cursor: 'pointer' }}>
                        {recordstate}
                    </div>
                );
            },
        },
        {
            title: '费用(元)',
            dataIndex: 'fee',
            layout: '1/1',
            align: 'center',
            width: APP_CONFIG.CELL_WIDTH_SMALL,
        },
        {
            title: '创建人',
            dataIndex: 'createdBy',
            isActive: 0,
            layout: '1/1',
            align: 'center',
            width: APP_CONFIG.CELL_WIDTH_SMALL,
        },
        {
            title: '已预约人数',
            dataIndex: 'reservedAttendeeNum',
            isActive: 0,
            layout: '1/1',
            align: 'center',
            width: 120,
        },
        {
            title: '实际人数',
            dataIndex: 'actualAttendeeNum',
            layout: '1/1',
            isActive: 0,
            align: 'center',
            width: APP_CONFIG.CELL_WIDTH_SMALL,
        },
        {
            title: '创建时间',
            layout: '1/1',
            dataIndex: 'createdDate',
            width: APP_CONFIG.CELL_WIDTH_LARGE,
            isActive: 0,
            align: 'center',
        },
    ]
)