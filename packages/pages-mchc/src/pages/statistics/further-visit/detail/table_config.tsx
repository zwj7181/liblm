import { APP_CONFIG, rt_ctx } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx
const React = ctx.React
export default defineFormConfig([
  {
    title: '产检编号',
    dataIndex: 'no',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '末次月经',
    dataIndex: 'lmp',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '孕/产',
    dataIndex: 'gp',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    // render: (value: any, rowData: any) => `${value || 0}/${get(rowData, 'parity') || 0}`,
  },
  {
    title: '孕周',
    dataIndex: 'gestationalWeek',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '预产期-B超',
    dataIndex: 'sureEdd',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '手机号码',
    dataIndex: 'telephone',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '身份证号码',
    dataIndex: 'idNO',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '产检日期',
    dataIndex: 'visitDate',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '产检类型',
    dataIndex: 'visitType',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '产检次数',
    dataIndex: 'visitCount',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '高危评定日期',
    dataIndex: 'evaluationDate',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '评定孕周',
    dataIndex: 'evaluationWeek',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '高危等级',
    dataIndex: 'highriskGrade',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '高危因素',
    dataIndex: 'highriskNote',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
    ellipsis: false
  },
  {
    title: '传染病',
    dataIndex: 'infectionNote',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '是否结案',
    dataIndex: 'caseFinished',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
])