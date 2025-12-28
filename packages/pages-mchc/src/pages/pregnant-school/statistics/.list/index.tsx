import { BaseListOld, MyIcon } from '@lm_fe/components_m';
import { Popconfirm } from 'antd';
import { get } from 'lodash';
import React from 'react';
import Query from './components/Query';
import Table from './components/Table';
import { tableColumns } from './config/table';

export default class List extends BaseListOld {
  static defaultProps = {
    baseUrl: '/api/admissions',
    baseTitle: '统计',
    needPagination: true,
    showQuery: true,
    showAdd: true,
    tableColumns,
    rowKey: 'id',
    Table,
    Query,
    otherTableProps: {
      scroll: { x: 1596 },
    },
  };

  columns = [
    ...(this.props.tableColumns as Array<any>),
    {
      title: '操作',
      showSorter: false,
      showFilter: false,
      fixed: 'right',
      width: 158,
      align: 'center',
      render: (value: any, rowData: any, index: number) => {
        return (
          <>
            <MyIcon value='EyeOutlined'
              className="global-table-action-icon global-table-action-view"
              title="查看"
              onClick={this.handleView(rowData)}
            />
            <MyIcon value='EditOutlined'
              className="global-table-action-icon global-table-action-view"
              title="编辑"
              onClick={this.handleEdit(rowData)}
            />
            <Popconfirm
              title={`确定要删除这个${get(this.props, 'baseTitle')}吗?`}
              onConfirm={this.handleDelete(rowData)}
              okText="确定"
              cancelText="取消"
            >
              <MyIcon value='DeleteOutlined' className="global-table-action-icon global-table-action-delete" title="删除" />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  handleAdd = () => {
    const { history } = this.props;
    history.push('/deliver-management/admission/add');
  };

  handleView = (rowData: any) => () => {
    const { id } = rowData;
    const { history } = this.props;
    history.push(`/deliver-management/admission/deliver-edit?id=${id}`);
  };

  handleEdit = (rowData: any) => () => {
    const { id } = rowData;
    const { history } = this.props;
    history.push(`/deliver-management/admission/edit?id=${id}`);
  };
}
