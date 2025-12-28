import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { APP_CONFIG } from '@lm_fe/components_m';
import { resolveFubaoPath } from '@lm_fe/components_m';
import React from 'react'
export const tableColumns = [
  {
    title: '建档日期',
    dataIndex: 'filingDay',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '女方姓名',
    dataIndex: 'womanName',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (text: any, record: any) => {
      const id = record?.id;
      return (
        <Tooltip title="点击查看女方检查详情">
          <Link to={resolveFubaoPath(`/pre-pregnancy-care/wife/wife-exam?id=${id}`)}>{text}</Link>
        </Tooltip>
      );
    },
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
    render: (text: any, record: any) => {
      const id = record?.id;
      return (
        <Tooltip title="点击查看男方检查详情">
          <Link to={resolveFubaoPath(`/pre-pregnancy-care/husband/husband-exam?id=${id}`)}>{text}</Link>
        </Tooltip>
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
];
