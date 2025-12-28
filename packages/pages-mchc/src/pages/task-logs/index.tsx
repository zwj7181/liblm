import React from 'react';
import Table from './components/Table';
import { tableColumns } from './config/table';
import Query from './components/Query';
import { BaseListOld } from '@lm_fe/components_m';

export default class List extends BaseListOld {
  static defaultProps = {
    baseUrl: '/api/knowledge-logs',
    baseTitle: '宣教任务记录',
    rowKey: 'id',
    needPagination: true,
    showQuery: true,
    tableColumns,
    showAdd: false,
    Table,
    Query,
    otherTableProps: {
      scroll: { x: 920 },
    },
  };
}
