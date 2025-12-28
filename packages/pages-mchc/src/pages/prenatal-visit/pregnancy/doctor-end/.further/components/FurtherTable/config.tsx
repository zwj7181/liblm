import { IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit } from "@lm_fe/service";
import { ColumnsType } from "antd/lib/table";
import { rt_ctx } from "@lm_fe/env";
const ctx = rt_ctx
const React = ctx.React
const c = React.createElement
type TfetusExam = IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit['fetusExam']

function get_table_columns_广三(): ColumnsType<IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit> {
  return [
    {
      title: '日期',
      width: 70,
      dataIndex: 'visitDate',
      align: 'center'
    },
    {
      title: '孕周',
      dataIndex: 'gestationalWeek',
      width: 40,
      align: 'center'
    },
    {
      title: '主诉',
      dataIndex: ['chiefComplaint'],
      align: 'center'
    },

    {
      // title: () => c('span', {}, ['血压', c('em', {}, 'mmHg')]),
      title: () => <span>血压<em>mmHg</em></span>,

      width: 100,
      dataIndex: 'physicalExam',
      align: 'center',
      ellipsis: true,
      render(pe) {
        if (!pe) return ''

        const x1 = (pe.systolic && pe.diastolic) ? `首:${pe.systolic}/${pe.diastolic}；` : ''
        const x2 = (pe.systolic2 && pe.diastolic2) ? `二:${pe.systolic2}/${pe.diastolic2}；` : ''
        const x3 = (pe.systolic3 && pe.diastolic3) ? `三:${pe.systolic3}/${pe.diastolic3}；` : ''
        return `${x1} ${x2} ${x3}`
      }
    },
    {
      // title: () => c('span', {}, ['脉搏', c('em', {}, '次/分')]),
      title: () => <span>脉搏<em>次/分</em></span>,

      width: 40,
      dataIndex: ['physicalExam', 'pulse'],
      align: 'center'
    },
    {
      // title: () => c('span', {}, ['体重', c('em', {}, 'kg')]),
      title: () => <span>体重<em>kg</em></span>,

      dataIndex: ['physicalExam', 'weight'],
      width: 40,
      align: 'center'
    },
    ctx.mchcEnv.in(['广三']) ? {
      // title: () => c('em', {}, '孕期体重增加'),
      title: () => <em>孕期体重增加</em>,

      dataIndex: ['physicalExam', 'weightGain'],
      width: 60,
      align: 'center',
    } : undefined as any,
    {
      // title: () => c('span', {}, ['宫高', c('em', {}, 'cm')]),
      title: () => <span>宫高<em>cm</em></span>,

      dataIndex: ['gynExam', 'fundalHeight'],
      width: 40,
      align: 'center'
    },
    {
      // title: () => c('span', {}, ['腹围', c('em', {}, 'cm')]),
      title: () => <span>腹围<em>cm</em></span>,

      dataIndex: ['gynExam', 'waistHip'],
      width: 40,
      align: 'center'
    },

    {
      ...gen_fetal_info('胎动', 'fetalMovement'), render(value) {
        const arr: TfetusExam = value || []
        return arr.map(_ => _['fetalMovement']).join('/')
      }
    },
    {
      ...gen_fetal_info('胎心率', 'fetalHeartRate'), render(value) {
        const arr: TfetusExam = value || []
        return arr.map(_ => _['fetalHeartRate']).join('/')
      }
    },
    {
      ...gen_fetal_info('位置', 'position'), render(value) {
        const arr: TfetusExam = value || []
        return arr.map(_ => _['position']).join('/')
      }
    },
    {
      ...gen_fetal_info('胎方位', 'fetalPosition'), render(value) {
        const arr: TfetusExam = value || []
        return arr.map(_ => _['fetalPosition']).join('/')
      }
    },
    {
      ...gen_fetal_info('先露', 'presentation'), render(value) {
        const arr: TfetusExam = value || []
        return arr.map(_ => _['presentation']).join('/')
      }
    },
    {
      title: '处置',
      width: 80,
      ellipsis: true,
      dataIndex: ['prescription'],
      align: 'center'
    },
    {
      title: '辅助检查',
      width: 80,
      ellipsis: true,
      dataIndex: ['exam'],
      align: 'center'
    },

    // mchcEnv.in(['广三']) ? {
    //   title: <span>双肺听诊<em></em></span>,
    //   dataIndex: ['physicalExam', 'lungAuscultation'],
    //   align: 'center'
    // } : undefined as any,
    // mchcEnv.in(['广三']) ? {
    //   title: <span>心脏听诊<em></em></span>,
    //   dataIndex: ['physicalExam', 'heartAuscultation'],
    //   align: 'center'
    // } : undefined as any,


    // mchcEnv.in(['广三']) ? {
    //   title: <span>38周后宫颈检查<em></em></span>,
    //   dataIndex: ['gynExam', 'cervix'],
    //   align: 'center'
    // } : undefined as any,
    // mchcEnv.in(['广三']) ? {
    //   title: <span>盆骨出口<em></em></span>,
    //   dataIndex: ['gynExam', 'pelvicBone'],
    //   align: 'center'
    // } : undefined as any,



    {
      title: '其他体征',
      dataIndex: ['cardiacDisease', 'otherNote'],
      width: 80,
      ellipsis: true,
      align: 'center'
    },


    {
      title: '嘱托',
      dataIndex: ['advice'],
      width: 80,
      ellipsis: true,
      align: 'center'
    },



  ].filter(_ => _)
}
function get_table_columns_default(): ColumnsType<IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit> {
  return [
    {
      title: '日期',
      width: 90,
      dataIndex: 'visitDate',
      align: 'center'
    },
    {
      title: '孕周',
      dataIndex: 'gestationalWeek',
      width: 40,
      align: 'center'
    },
    {
      title: '主诉',
      dataIndex: ['chiefComplaint'],
      // align: 'center'
      width: 140,

    },

    {
      // title: () => c('span', {}, ['血压', c('em', {}, 'mmHg')]),
      title: () => <span>血压<em>mmHg</em></span>,
      width: 100,
      dataIndex: 'physicalExam',
      align: 'center',
      ellipsis: true,
      render(pe) {
        if (!pe) return ''

        const x1 = (pe.systolic && pe.diastolic) ? `首:${pe.systolic}/${pe.diastolic};` : ''
        const x2 = (pe.systolic2 && pe.diastolic2) ? `二:${pe.systolic2}/${pe.diastolic2};` : ''
        const x3 = (pe.systolic3 && pe.diastolic3) ? `三:${pe.systolic3}/${pe.diastolic3};` : ''
        return `${x1} ${x2} ${x3}`
      }
    },
    {
      // title: () => c('span', {}, ['脉搏', c('em', {}, '次/分')]),
      title: () => <span>脉搏<em>次/分</em></span>,

      width: 40,
      dataIndex: ['physicalExam', 'pulse'],
      align: 'center'
    },
    {
      // title: () => c('span', {}, ['身高', c('em', {}, 'cm')]),
      title: () => <span>身高<em>cm</em></span>,

      dataIndex: ['physicalExam', 'height'],
      width: 50,
      align: 'center'
    },

    {
      // title: () => c('span', {}, ['体重', c('em', {}, 'kg')]),
      title: () => <span>体重<em>kg</em></span>,

      dataIndex: ['physicalExam', 'weight'],
      width: 50,
      align: 'center'
    },
    {
      title: 'bmi',

      width: 50,
      hidden: !ctx.mchcEnv.in(['广州市八']),
      dataIndex: ['physicalExam', 'bmi'],
      align: 'center'
    },
    {
      // title: () => c('span', {}, ['宫高', c('em', {}, 'cm')]),
      title: () => <span>宫高<em>cm</em></span>,

      dataIndex: ['gynExam', 'fundalHeight'],
      width: 40,
      align: 'center'
    },
    {
      // title: () => c('span', {}, ['腹围', c('em', {}, 'cm')]),
      title: () => <span>腹围<em>cm</em></span>,

      dataIndex: ['gynExam', 'waistHip'],
      width: 40,
      align: 'center'
    },

    {
      ...gen_fetal_info('胎心率', 'fetalHeartRate'), render(value) {
        const arr: TfetusExam = value || []
        return arr.map(_ => _['fetalHeartRate']).join('/')
      }
    },
    {
      ...gen_fetal_info('先露', 'presentation'), render(value) {
        const arr: TfetusExam = value || []
        return arr.map(_ => _['presentation']).join('/')
      }
    },


    {
      title: '下肢水肿',

      dataIndex: ['edema'],
      width: 40,
      align: 'center',
      render(value, record, index) {
        return {
          null: '',
          '': '',
          1: '-',
          2: '+',
          3: '++',
          4: '+++',
          5: '++++',
        }[value]

      },
    },

    {
      title: '其他体征',

      dataIndex: ['cardiacDisease', 'otherNote'],
      width: 120,
      ellipsis: true,
      align: 'center'
    },

    {
      title: '辅助检查',

      width: 80,
      ellipsis: true,
      hidden: ctx.mchcEnv.in(['广州市八']),
      dataIndex: ['exam'],
      align: 'center'
    },

    {
      title: '处理措施',

      // width: 240,
      // ellipsis: true,
      dataIndex: ['prescription'],
      align: 'center'
    },
    {
      title: '下次复诊',

      dataIndex: ['resetAppoint'],
      width: 80,
      ellipsis: true,
      align: 'center',
      render(value, record, index) {
        const { appointmentDate, appointmentPeriod, appointmentType } = record
        if (!appointmentDate) return '-'

        let str1 = appointmentDate.slice(5),
          str2 = '',
          str3 = '';
        if (appointmentPeriod) {
          const period = appointmentPeriod === '1' ? '上午' : '下午';
          str2 = period.slice(0, 1);
        }
        if (appointmentType) {
          const options = ctx.mchcEnv.get_other_options('appointmentTypeOptions').find(_ => _.value == appointmentType)

          str3 = options ? (options.label || '') : ''
        }
        return `${str1} ${str2} ${str3.slice(0, 1)}`
      },
    },
    {
      title: '医生',

      dataIndex: ['doctorName'],
      ellipsis: true,
      width: 50,
      align: 'center'
    },
  ]
}
export default function get_table_columns() {
  const arr = (ctx.mchcEnv.is('广三')) ? get_table_columns_广三() : get_table_columns_default()
  return arr.filter((_: any) => !_.hidden) as ColumnsType<IMchc_Doctor_RvisitInfoOfOutpatient_Rvisit>
}


function gen_fetal_info(title: string, key: keyof TfetusExam[number]) {

  return {
    title: title,
    dataIndex: ['fetusExam'],
    width: 60,
    align: 'center',
  } as any
}