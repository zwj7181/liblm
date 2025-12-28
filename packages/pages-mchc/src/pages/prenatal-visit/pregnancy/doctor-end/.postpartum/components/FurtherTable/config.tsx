import { IMchc_Doctor_RvisitAfterDeliveryInfoOfOutpatient_Record } from "@lm_fe/service";
import { ColumnsType } from "antd/lib/table";
import { rt_ctx } from "@lm_fe/env";
const ctx = rt_ctx
const React = ctx.React
const c = React.createElement


function get_table_columns_default(): ColumnsType<IMchc_Doctor_RvisitAfterDeliveryInfoOfOutpatient_Record> {
  return [
    {
      dataIndex: 'visitDate',
      title: '随访日期',
      width: 88,
      render: (text, record) => ctx.utils.formatDate(text),
    },
    {
      dataIndex: 'physicalExam', title: '血压', width: 108,

      render(pe) {
        if (!pe) return ''

        const x1 = (pe.systolic && pe.diastolic) ? `首:${pe.systolic}/${pe.diastolic}；` : ''
        const x2 = (pe.systolic2 && pe.diastolic2) ? `二:${pe.systolic2}/${pe.diastolic2}；` : ''
        const x3 = (pe.systolic3 && pe.diastolic3) ? `三:${pe.systolic3}/${pe.diastolic3}；` : ''
        return `${x1} ${x2} ${x3}`
      }

    },
    { dataIndex: ['physicalExam', 'weight'], title: '体重', width: 68 },
    { dataIndex: 'chiefComplaint', title: '主诉', width: 200 },
    { dataIndex: 'mentalstateNote', title: '心理状况', width: 100 },
    { dataIndex: ['gynecologicalExam', 'breastNote'], title: '乳房', width: 100 },
    { dataIndex: ['gynecologicalExam', 'lochia'], title: '恶露', width: 100 },
    { dataIndex: ['gynecologicalExam', 'vulva'], title: '外阴', width: 100 },
    { dataIndex: ['gynecologicalExam', 'cervix'], title: '宫颈', width: 100 },
    { dataIndex: ['gynecologicalExam', 'uterus'], title: '子宫', width: 100 },
    { dataIndex: ['gynecologicalExam', 'adnexa'], title: '附件', width: 100 },
    { dataIndex: ['gynecologicalExam', 'pelvicfloor'], title: '盆底评分', width: 100 },
    { dataIndex: ['gynecologicalExam', 'pelvicfloorNote'], title: '盆底恢复', width: 100 },
    { dataIndex: ['gynecologicalExam', 'otherNote'], title: '其他', width: 100 },
    { dataIndex: 'highrisk', title: '高危转归', width: 100 },
    { dataIndex: 'inspection', title: '检验检查', width: 200 },
    { dataIndex: 'diagnosis', title: '诊断' },
    { dataIndex: 'advice', title: '处理意见', width: 200 },
    { dataIndex: 'doctorName', title: '随访医生', width: 68 },
  ]
}
export default function get_table_columns() {
  const arr = get_table_columns_default()
  return arr.filter((_: any) => !_.hidden) as ColumnsType<IMchc_Doctor_RvisitAfterDeliveryInfoOfOutpatient_Record>
}

