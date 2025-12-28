import { APP_CONFIG, rt_ctx } from '@lm_fe/env';
import { defineFormConfig } from '@lm_fe/service';
const ctx = rt_ctx
const React = ctx.React
export function form_config(is_入: boolean) {
  return defineFormConfig(
    [
      {
        "key": "id",
        form_hidden: true,
        hidden: true,
      },
      {
        "key": "pregnancy.id",
        form_hidden: true,
        hidden: true,

      },
      {
        title: '个人信息',
        children: [


          {
            "key": "pregnancy.outpatientNO",
            "label": "就诊卡号",
            "inputType": "PatientSelect",
            "disabledDeps": function disabledDeps(f) {
              return !!f.getFieldValue('id');
            },
            width: APP_CONFIG.CELL_WIDTH_SMALL,
            ellipsis: true,
            "inputProps": {

              "onPatientSelect": function onPatientAutoComplete(v, form) {
                form?.setFieldValue('pregnancy', v);
              }
            },
            layout: '1/3',
          },
          {
            title: '姓名',
            dataIndex: 'pregnancy.name',
            ellipsis: true,
            layout: '1/3',
            inputProps: { disabled: true },

            width: 86,
          },
          {
            "key": "pregnancy.checkupNO",
            "label": "产检编号",
            "inputType": "input",
            inputProps: { disabled: true },
            layout: '1/3',
            hidden: true,
          },
          {
            title: '手机号码',
            dataIndex: 'pregnancy.telephone',
            layout: '1/3',
            inputProps: { disabled: true },
            width: APP_CONFIG.CELL_WIDTH_SMALL,
          },
          {
            title: '年龄',
            dataIndex: 'pregnancy.age',
            inputProps: { disabled: true },
            layout: '1/3',

            width: 56,
          },


          {
            "key": "pregnancy.currentGestationalWeek",
            "label": "孕周",
            "inputType": "input",
            "inputProps": { 'disabled': true },
            layout: '1/3',
            hidden: true,
          },
          {
            title: '高危等级',
            isActive: 0,
            dataIndex: 'pregnancy.highriskGrade',
            align: 'center',
            width: 68,
            render: (text: string) => {
              return text && <span style={{ marginRight: 0 }}>{text}</span>;
            },
          },
        ]
      },
      {
        title: '转诊信息',
        children: [
          {
            title: '转诊类型',
            dataIndex: 'referralDirection',
            inputType: 'MS',

            inputProps: { marshal: 0, options: '平级,上级,下级' },
            width: 68,
            layout: '1/3',
            align: 'center',

          },
          {
            title: '转诊时间',
            dataIndex: 'referralDate',
            inputType: "MyDatePicker",
            width: 86,
            layout: '1/3',

          },
          {
            title: is_入 ? '原单位' : '转至单位',
            key: 'referralOrganization.id',
            inputType: "MS",

            inputProps: {
              marshal: 0,
              // fetch_options() {
              //   return ctx.utils.cache_fetch(
              //     'referral-organizations',
              //     () => ctx.request.get<{
              //       "id": 1,
              //       "grade": 1,
              //       "gradeName": null,
              //       "gradeNumber": null,
              //       "gradeLetter": null,
              //       "name": "华侨医院",
              //     }[]>('/api/referral-organizations')
              //   )
              //     .then(({ data }) => data.map(_ => ({ label: _.name, value: _.id })))
              // },
              fetch_options: {
                url: '/api/referral-organizations',
                labelKey: 'name',
                valueKey: 'id'
              }
            },
            layout: '1/3',
          },

          {
            title: is_入 ? '原科室' : '转至科室',
            dataIndex: 'referralDept',
            width: APP_CONFIG.CELL_WIDTH_SMALL,
            layout: '1/3',

          },


          {
            "key": "referralContactNumber",
            "label": "原科室联系电话",
            "inputType": "input",
            layout: '1/3',
            hidden: true,

          },
          {
            "key": "referralDoctor",
            "label": "申请者",
            "inputType": "input",
            layout: '1/3',
            hidden: true,

          },
          {
            "key": "recorder",
            "label": "记录者",
            "inputType": "input",

            layout: '1/3',
            required: true,
            hidden: true,
          },
          {
            title: '原因',
            dataIndex: 'reason',
            width: APP_CONFIG.CELL_WIDTH_LARGE,
            "inputType": "text_area",
            layout: '2/3',
          },
        ]
      }
    ]
  )
}
