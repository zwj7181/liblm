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
      }
    },
    { title: '孕周', dataIndex: 'gw', isActive: 0 },
    {
      title: '血压',
      children: [
        { title: '收缩压', dataIndex: 'systolic', inputType: 'InputNumber', render(v) { return ctx.ui.render_color(v, v < 90 || v > 130) }, },
        { title: '舒张压', dataIndex: 'diastolic', inputType: 'InputNumber', render(v) { return ctx.ui.render_color(v, v < 60 || v > 90) }, },
      ],
      // render: (text: any, record: any) => this.getText(text, record),
    },
    {
      title: '脉搏',
      dataIndex: 'pulserate',
      inputType: 'InputNumber',
      // render: (text: any, record: any) => {
      //   return <span style={{ color: text < 60 || text > 100 ? 'red' : '' }}>{text}</span>;
      // },
    },
  ]
)

