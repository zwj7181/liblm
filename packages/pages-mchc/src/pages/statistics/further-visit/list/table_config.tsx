import { APP_CONFIG, rt_ctx } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx
const React = ctx.React
export default defineFormConfig([
  {
    title: '日期',
    dataIndex: 'visitDate',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '类型',
    align: 'center',
    children: [
      {
        title: '首诊(人)',
        dataIndex: 'ivisitCount',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: '复诊(人)',
        dataIndex: 'rvisitCount',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: '产后(人)',
        dataIndex: 'postpartumCount',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: '总数(人)',
        dataIndex: 'totalCount',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
    ],
  },
  {
    title: '高危妊娠风险看诊',
    align: 'center',
    children: [
      {
        title: 'Ⅰ级(人)',
        dataIndex: 'highRiskCount_Ⅰ',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: 'Ⅱ级(人)',
        dataIndex: 'highRiskCount_Ⅱ',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: 'Ⅲ级(人)',
        dataIndex: 'highRiskCount_Ⅲ',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: 'Ⅳ级(人)',
        dataIndex: 'highRiskCount_Ⅳ',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: 'Ⅴ级(人)',
        dataIndex: 'highRiskCount_Ⅴ',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: '传染病(人)',
        dataIndex: 'infectionCount',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: '统计(人)',
        dataIndex: 'highRiskCount',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
    ],
  },
  {
    title: '转诊',
    align: 'center',
    children: [
      {
        title: '转入(人)',
        dataIndex: 'referralInCount',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: '转出(人)',
        dataIndex: 'referralOutCount',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
    ],
  },
  {
    title: '操作',
    render(value, rowData, index) {
      return <ctx.ui.Button size='small' onClick={() => ctx.safeTo('/statistics/further-visit/detail?visitDate=' + rowData.visitDate)}>查看</ctx.ui.Button>
    },
  }
])