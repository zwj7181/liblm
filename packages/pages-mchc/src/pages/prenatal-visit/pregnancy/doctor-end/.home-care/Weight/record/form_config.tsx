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
      title: '体重值',
      dataIndex: 'result',
      inputType: 'InputNumber',
      layout: '1',
      render(v, row) {
        return ctx.ui.render_color(v + row.unit || 'kg', row.status)
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      inputType: 'MS',
      layout: '1',
      inputProps: {
        marshal: 0,
        options: [
          { label: '偏高', value: 1 },
          { label: '正常', value: 0 },
          { label: '偏低', value: -1 },
        ]
      },
    },
    {
      title: '单位',
      hidden: true,
      dataIndex: 'unit',
      inputType: 'MA',
      layout: '1',
      inputProps: {
        options: 'kg,g,斤'
      },
    }

  ]
)

