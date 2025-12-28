import { rt_ctx } from '@lm_fe/env';
import { defineFormConfig } from '@lm_fe/service';
const ctx = rt_ctx
const React = ctx.React
export default defineFormConfig(
  [
    {
      title: 'pregnancy',
      dataIndex: 'pregnancy.id',
      hidden: true,
      form_hidden: true
    },
    {
      title: '日期',
      dataIndex: 'timestamp',
      inputType: 'DatePicker',
      inputProps: {
        format: ctx.utils.formatDateTime.format,
        showTime: true,
        disabled: true,

      },
      layout: '1',
    },
    { title: '孕周', dataIndex: 'gw', isActive: 0 },

    {
      title: '开始时间',
      dataIndex: 'duration',
      inputType: 'DatePicker',
      inputProps: {
        format: ctx.utils.formatDateTime.format,
        showTime: true
      },
      layout: '1',

    },
    {
      title: '结束时间',
      dataIndex: 'now',
      inputType: 'DatePicker',
      inputProps: {
        format: ctx.utils.formatDateTime.format,
        showTime: true
      },
      layout: '1',

    },
    {
      title: '持续(分钟)',
      dataIndex: 'now',
      isActive: 0,
      render(value, rowData, index) {
        var diff = ctx.utils.diff_between(value, rowData.duration, 'minute')
        return diff ? diff.toFixed(0) : ''
      },
      layout: '1',


    },

    {
      title: '次数',
      dataIndex: 'result',
      inputType: 'InputNumber',
      layout: '1',

      // render: (text: any, record: any) => {
      //   return <span style={{ color: text < 60 || text > 100 ? 'red' : '' }}>{text}</span>;
      // },
    },
  ]
)

