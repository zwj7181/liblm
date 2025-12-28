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
            "title": "姓名",
            "dataIndex": [
                "pregnancy",
                "name"
            ],
            "layout": "1/1",
            "align": "center",
            "width": 128
        },
        {
            "title": "证件号码",
            "dataIndex": [
                "pregnancy",
                "idNO"
            ],
            "layout": "1/1",
            "align": "center",
            "width": 128
        },
        {
            "title": "电话号码",
            "dataIndex": [
                "pregnancy",
                "telephone"
            ],
            "layout": "1/1",
            "align": "center",
            "width": 128,
            "inputType": "input"
        },
        {
            "title": "预约时间",
            "dataIndex": "reserveTime",
            "layout": "1/1",
            "align": "center",
            "width": 128
        },
        {
            "title": "课程名称",
            "dataIndex": [
                "course",
                "name"
            ],
            "layout": "1/1",
            "align": "center",
            "width": 128
        },
        {
            "title": "开课时间",
            "dataIndex": "courseTime",
            "layout": "1/1",
            "align": "center",
            "width": 128,
            "render": function (text, record) { return ''.concat(record.course.courseDate, ' ').concat(record.course.period) }
        },
        {
            "title": "参加人数",
            "dataIndex": "companionNum",
            "align": "center",
            "width": 96,
            "layout": "1/1",
            "inputType": "input_number"
        },
        {
            "dataIndex": "status",
            "title": "签到",
            "layout": "1/1",
            "inputType": "MC",
            "width": 50,
            "inputProps": {
                "marshal": 0,
                "options": "未签到,已签到,已取消"
            },
            "render": function (status, rowData) { return ['未签到', '已签到', '已取消'][status] }
        }
    ]
)