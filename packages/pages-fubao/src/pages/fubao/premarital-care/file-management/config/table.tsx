import { APP_CONFIG } from '@lm_fe/components_m';
import { rt_ctx } from '@lm_fe/env';
import { defineFormConfig } from '@lm_fe/service';

const ctx = rt_ctx
const React = ctx.React
export default function tableColumns(is_孕前 = false) {

  return defineFormConfig(
    [
      {
        title: '建档日期',
        dataIndex: 'filingDay',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: '女方姓名',
        dataIndex: 'womanName',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
        render: is_孕前
          ? (text: any, record: any) => {
            const id = record.id;
            const _path = ctx.utils.transmit_happy_pre(`/pre-pregnancy-care/wife/wife-exam?id=${id}`, '/fubao')
            return (
              <ctx.ui.Button size="small" type='link' onClick={() => ctx.safeTo(_path)}>{text}</ctx.ui.Button>
            );
          }
          : (text: any, record: any) => {
            const id = record.id;
            const _path = ctx.utils.transmit_happy_pre(`/premarital-care/wife-v2/wife-exam?id=${id}`, '/fubao')
            return (
              <ctx.ui.Button size="small" type='link' onClick={() => ctx.safeTo(_path)}>{text}</ctx.ui.Button>
            );
          }
        ,
      },
      {
        title: '女方门诊号',
        dataIndex: 'womanOutpatientNo',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: '女方年龄(岁)',
        dataIndex: 'womanAge',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: '女方手机号码',
        dataIndex: 'womanTelephone',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: '男方姓名',
        dataIndex: 'manName',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
        render: is_孕前
          ? (text: any, record: any) => {
            const id = record.id;
            const _path = ctx.utils.transmit_happy_pre(`/pre-pregnancy-care/husband/husband-exam?id=${id}`, '/fubao')
            return (
              <ctx.ui.Button size="small" type='link' onClick={() => ctx.safeTo(_path)}>{text}</ctx.ui.Button>

            );
          }
          : (text: any, record: any) => {
            const id = record.id;
            const _path = ctx.utils.transmit_happy_pre(`/premarital-care/husband-v2/husband-exam?id=${id}`, '/fubao')
            return (
              <ctx.ui.Button size="small" type='link' onClick={() => ctx.safeTo(_path)}>{text}</ctx.ui.Button>

            );
          },
      },
      {
        title: '男方门诊号',
        dataIndex: 'manOutpatientNo',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: '男方年龄(岁)',
        dataIndex: 'manAge',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: '男方手机号码',
        dataIndex: 'manTelephone',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },

      {
        title: '档案状态',
        dataIndex: 'fileStatus',
        width: 68,
        fixed: 'right',
        align: 'center',
        render: is_孕前
          ? (fileStatus: any, rowData: any) => {
            const { id } = rowData;
            const _path = ctx.utils.transmit_happy_pre(`/pre-pregnancy-care/file-management/edit?id=${id}`, '/fubao')
            const 已审核 = fileStatus === 2


            return <ctx.ui.Button onClick={() => ctx.safeTo(_path)} size="small" type={已审核 ? 'default' : 'primary'} >{已审核 ? '已审核' : '待审核'}</ctx.ui.Button>


          }
          : (fileStatus: any, rowData: any) => {
            const { id } = rowData;
            const _path = ctx.utils.transmit_happy_pre(`/premarital-care/file-management/edit?id=${id}`, '/fubao')
            const 已审核 = fileStatus === 2


            return <ctx.ui.Button onClick={() => ctx.safeTo(_path)} size="small" type={已审核 ? 'default' : 'primary'} >{已审核 ? '已审核' : '待审核'}</ctx.ui.Button>


          },
      },
    ]
  )
}
