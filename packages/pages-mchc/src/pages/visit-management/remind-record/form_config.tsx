import { APP_CONFIG, rt_ctx } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";

const ctx = rt_ctx
const React = ctx.React


export default defineFormConfig(
  [
    {
      title: '姓名',
      dataIndex: ['prenatalVisit', 'pregnancy', 'name'],
      width: APP_CONFIG.CELL_WIDTH_SMALL,

      align: 'center',
    },
    {
      title: '就诊卡号',
      dataIndex: ['prenatalVisit', 'pregnancy', 'outpatientNO'],
      width: APP_CONFIG.CELL_WIDTH_SMALL,

    },
    {
      title: '预产期',
      dataIndex: ['prenatalVisit', 'pregnancy', 'edd'],
    },
    {
      title: '当前孕周',
      dataIndex: ['prenatalVisit', 'pregnancy', 'currentGestationalWeek'],
      width: APP_CONFIG.CELL_WIDTH_SMALL,
    },
    {
      title: '上次就诊时间',
      dataIndex: 'lastVisitDate',
    },
    {
      title: '复诊预约日期',
      dataIndex: ['prenatalVisit', 'appointmentDate'],
    },
    // 提醒方式 1 短信 2微信 3电话
    {
      title: '提醒方式',
      dataIndex: 'remindWay',
      width: APP_CONFIG.CELL_WIDTH_SMALL,
      render: (text) => {
        let index = text ? text : 0;
        const state = ['', '短信', '微信', '电话'];
        return state[index];
      },
    },
    {
      title: '发送时间',
      dataIndex: 'sendTime',
    },
    {
      title: '发送状态',
      dataIndex: 'sendStatus',
      width: APP_CONFIG.CELL_WIDTH_SMALL,
      render: (text) => {
        let index = text ? text : 0;
        const state = ['', '成功', '失败', '未知'];
        return state[index];
      },
    },
    {
      title: '异常提示',
      dataIndex: 'errorMsg',
      width: APP_CONFIG.CELL_WIDTH_SMALL,
    },
    {
      title: '发送内容',
      dataIndex: 'content',
      width: APP_CONFIG.CELL_WIDTH_LARGE,

    },
    {
      title: '操作',
      dataIndex: 'content',
      render: (a, record) => {
        const remindType = ctx.props.remindType
        const req_url = {
          1: "/api/prenatal-visit-logs/apppointmentRemind",
          2: "/api/prenatal-visit-logs/timeoutRemind",
        }
        const url = req_url[remindType]
        return ctx.ui.render_btn('发送', () => {
          const params = {
            remindWay: record.remindWay, // 提醒方式 1 短信 2微信
            ids: [record.id],
            prenatalVisitIds: [ctx.utils.get(record, 'prenatalVisit.id') || ctx.utils.get(record, 'prenatalVisitId'),],
          };
          ctx.request.post(url, params, { successText: '发送操作成功，详情请看发送记录~' })
            .then(() => ctx.props.table_helper.handleSearch())
        }, { size: 'small' })

      },
    },
  ]
)