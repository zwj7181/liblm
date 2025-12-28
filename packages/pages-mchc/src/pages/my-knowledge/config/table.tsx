
import React from 'react';
import { map, find, get } from 'lodash';
import { departmentScope } from './../config/contants';
import { APP_CONFIG } from '@lm_fe/env';

export const tableColumns = [
  {
    title: '文章标题',
    dataIndex: 'title',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
  {
    title: '文章类型',
    dataIndex: 'type',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
    render: (recordstate: any, rowData: any) => {
      return recordstate == 1 ? '诊疗指南' : '科室流程';
    },
  },
  {
    title: '是否置顶',
    dataIndex: 'sticky',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
    render: (recordstate: any, rowData: any) => {
      return recordstate ? '是' : '否';
    },
  },
  {
    title: '阅读数',
    dataIndex: 'hits',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
    render: (recordstate: any, rowData: any) => {
      return recordstate || 0;
    },
  },
  {
    title: '科室范围',
    dataIndex: 'departmentScope',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
    render: (recordstate: any, rowData: any) => {
      const data = recordstate && JSON.parse(recordstate);
      let str = '';
      map(data, (item, index) => {
        const val = get(
          find(departmentScope, (i) => i.key == item),
          `value`,
        );
        str += val + '; ';
      });
      return str;
    },
  },
  {
    title: '创建者',
    dataIndex: 'createDoctor',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
];
