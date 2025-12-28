
import { getPresetOptions, rt_ctx } from '@lm_fe/env';
import { defineFormConfig } from '@lm_fe/service';
const ctx = rt_ctx
export default function () {
  return defineFormConfig(
    [
      {
        label: '就诊卡号',
        name: 'outpatientNO',
        inputType: 'PatientAutoComplete',
        filterType: 'contains',
        inputProps: {
          width: 140,
        }
      },

      ctx.mchcEnv.is('南医增城')
        ? {
          label: 'ID号',
          name: 'patientNO',
          inputType: 'Input',
          filterType: 'contains',
          inputProps: {
            width: 140,
          }
        }
        : null,

      {
        label: '姓名',
        inputType: 'input',
        name: 'name',
        inputProps: {
          width: 110,
        }
      },
      {
        label: '孕期状态',
        inputType: 'select',
        filterType: 'in',
        name: 'periodState',
        inputProps: {
          options: getPresetOptions('孕期状态'),
          // defaultValue: '1',
          width: 100,

        }
      },
      {
        label: '证件号码',
        inputType: 'input',
        name: 'idNO',

        inputProps: {
          width: 160,
        }
      },
      {
        label: '手机号码',
        inputType: 'input',
        name: 'telephone',
        inputProps: {
          width: 130,
        }
      },
      {
        label: '档案状态',
        inputType: 'select',
        filterType: 'in',
        name: 'recordstate',

        // defaultValue: '1',
        inputProps: {
          width: 86,
          options: [
            // { label: '全部', value: null },
            { label: '待审核', value: '0,null' },
            { label: '已审核', value: '1,6' },
          ],
        },
      },
      {
        label: '审核人',
        inputType: 'input',
        name: 'auditorName',
        inputProps: {
          width: 110,
        }
      },

      ctx.mchcEnv.is('广州市八') ? {
        label: '未成年上报',
        inputType: 'MS',
        name: 'underageReport',
        inputProps: {
          width: 60,
          options: '否,是',
        }
      } : null,
      ctx.mchcEnv.is('广州市八') ? {
        label: 'Rh阴性上报',
        inputType: 'MS',
        name: 'rhNegativeReport',
        inputProps: {
          width: 60,
          options: '否,是',
          // marshal: 0
        }
      } : null,
      {
        name: 'lastModifiedDate',

        label: '修改时间',
        inputType: 'rangeDate',

        // paramType: 'startAndEnd',
      },
      {
        name: 'createDate',

        label: '创建时间',
        inputType: 'rangeDate',

        // paramType: 'startAndEnd',
      },
      {
        name: 'validateDate',

        label: '审核时间',
        inputType: 'rangeDate',

        // paramType: 'startAndEnd',
      },
      {
        name: 'edd',

        label: '预产期',
        inputType: 'rangeDate',

        // paramType: 'startAndEnd',
      },

      // {
      //   label: '',
      //   inputType: 'IdNOButton',
      //   name: 'auditorName',
      //   inputProps: {
      //     width: 150,
      //   }
      // },
      // customerService: {
      //   label: '客服专员',
      //   inputType: 'select',
      //   filterType: 'equals',
      //   options: dictionary('Common.customerService'),
      //   style: {
      //     width: 86,
      //   },
      // },
    ]
  )
}