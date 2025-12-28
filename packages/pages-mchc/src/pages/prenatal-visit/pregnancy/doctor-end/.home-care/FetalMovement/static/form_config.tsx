import { rt_ctx } from '@lm_fe/env';
import { defineFormConfig } from '@lm_fe/service';
const ctx = rt_ctx
const React = ctx.React
export default defineFormConfig(
  [
    {
      title: '日期',
      dataIndex: 'monitorDate',
      key: 'monitorDate',
      render: (text: any, record: any) => ctx.utils.formatDateTime(text),
    },
    { title: '孕周', dataIndex: 'gw', key: 'gw' },
    {
      title: '第一次数胎动',
      children: [
        { title: '时长（分钟）', dataIndex: 'firstDuration', key: 'firstDuration' },
        { title: '次数（次）', dataIndex: 'firstCount', key: 'firstCount' },
      ],
    },
    {
      title: '第二次数胎动',
      children: [
        { title: '时长（分钟）', dataIndex: 'secondDuration', key: 'secondDuration' },
        { title: '次数（次）', dataIndex: 'secondCount', key: 'secondCount' },
      ],
    },
    {
      title: '第三次数胎动',
      children: [
        { title: '时长（分钟）', dataIndex: 'thirdDuration', key: 'thirdDuration' },
        { title: '次数（次）', dataIndex: 'thirdCount', key: 'thirdCount' },
      ],
    },
    { title: '总次数（次）', dataIndex: 'sumCount', key: 'sumCount' },
    {
      title: '12小时评估结果',
      dataIndex: 'result',
      key: 'result',
      render(text: any, record: any) {
        return ctx.ui.render_color(text, text === '异常');
      }
    },
  ]
)

