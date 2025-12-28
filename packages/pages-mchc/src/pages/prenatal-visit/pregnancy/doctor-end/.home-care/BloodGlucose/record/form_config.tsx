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
      title: '测量时间', dataIndex: 'period', inputType: 'MS',
      layout: '1',
      inputProps: {
        marshal: 0,
        options: [
          { label: '早餐前', value: 0 },
          { label: '早餐后', value: 1 },
          { label: '午餐前', value: 2 },
          { label: '午餐后', value: 3 },
          { label: '晚餐前', value: 4 },
          { label: '晚餐后', value: 5 },
          { label: '睡 前', value: 6 },
          //@ts-ignore
          ctx.mchcEnv.in(['越秀妇幼']) ? { label: '零 点', value: 7 } : null,
        ]
      }
    },
    {
      title: '血糖值(mmol/L)',
      dataIndex: 'result',
      inputType: 'InputNumber',
      layout: '1',


      render(v, row) {
        var is_err = false
        switch (row.period) {
          case 0:
            is_err = v > 5.6
            break;
          case 1:
            is_err = v > 6.7

            break;
          case 2:
            is_err = v > 5.6

            break;
          case 3:
            is_err = v > 6.7

            break;
          case 4:
            is_err = v > 5.6

            break;
          case 5:
            is_err = v > 6.7
            break;
          case 6:
            is_err = v > 5.3
            break;

          default:
            break;
        }
        return ctx.ui.render_color(v, is_err)
      },
    },


    {
      title: '是否注射胰岛素',
      dataIndex: 'insulin',
      inputType: 'MSW',
      layout: '1',
    },
    {
      title: '胰岛素注射量(U)',
      dataIndex: 'insulinnote',
      inputType: 'input',
      layout: '1',
    },
    {
      title: '饮食情况',
      dataIndex: 'diet',
      inputType: 'input',
      layout: '1',
    },
    {
      title: '运动情况',
      dataIndex: 'exercise',
      inputType: 'input',
      layout: '1',
    },


  ]
)

