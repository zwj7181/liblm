
import React from 'react';
import { Tag } from 'antd';
import { formatTimeToStandard } from '@lm_fe/components_m';
import { APP_CONFIG } from "@lm_fe/env";
import { get } from 'lodash';
const reserveStatu = {
  '0': {
    text: '未签到',
    color: 'default',
  },
  '1': {
    text: '已签到',
    color: '#00AF8C',
  },
  '2': {
    text: '已取消',
    color: '#D8D8D8',
  },
};

export const tableColumns = [
  {
    title: '姓名',
    dataIndex: ['pregnancy', 'name'],
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '证件号码',
    dataIndex: ['pregnancy', 'idNO'],
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },

  {
    title: '电话号码',
    dataIndex: ['pregnancy', 'telephone'],
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    editable: true,
  },
  {
    title: '预约时间',
    dataIndex: 'reserveTime',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    render: (text) => {
      if (text) {
        return formatTimeToStandard(text);
      }
      return '';
    },
  },
  {
    title: '课程名称',
    dataIndex: ['course', 'name'],
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '开课时间',
    dataIndex: 'courseTime',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    render: (text, record) => {
      return `${record.course.courseDate} ${record.course.period}`;
    },
  },
  {
    // title: '携带人数',
    title: '参加人数',
    dataIndex: 'companionNum',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    editable: true,
    inputType: 'input_number',
  },
  {
    title: '签到状态',
    dataIndex: 'status',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (value: any, rowData: any) => {
      return <Tag color={get(reserveStatu, `${value}.color`)}>{get(reserveStatu, `${value}.text`)}</Tag>;
    },
  },
];
