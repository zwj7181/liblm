import React from 'react';
import { isNil, isArray, get } from 'lodash';
import Table from './components/Table';
import Query from './components/Query';
import { tableColumns } from './config/table';
import { BaseListOld as BaseList, fubaoHistoryPush, resolveFubaoPath } from '@lm_fe/components_m';
import { Button, message } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

import { fubaoRequest as request } from '@lm_fe/utils';
import { SLocal_History } from '@lm_fe/service';


class List extends BaseList {
  staticDefaultQuery = {
    page: 0,
    size: 20,
    sort: 'id,desc', // 基本列表都需要倒序
    'deleteFlag.equals': 0,
    'progressStatusS.greaterOrEqualThan': 3,
  };
  static defaultProps = {
    baseUrl: '/api/family/planning/getEarlyPregnancyCheckSurgicalType', request,
    baseTitle: '手术病历管理',
    needPagination: true,
    showQuery: true,
    showAdd: false,
    tableColumns: tableColumns, // transformToColumns(columns),
    rowKey: 'id',
    Table,
    Query,
    otherTableProps: {
      scroll: { x: 1140 },
    },
  };

  columns = [
    ...(this.props.tableColumns as Array<any>),
    {
      title: '操作',
      showSorter: false,
      showFilter: false,
      fixed: 'right',
      width: 80,
      align: 'center',
      render: (value: any, rowData: any, index: number) => {
        return (
          <>
            <Button
              type="link"
              size="small"
              icon={<EyeOutlined className="global-table-action-icon global-table-action-edit" />}
              onClick={this.handleView(rowData)}
            >
              {get(rowData, 'progressStatus') === 4 ? '查看' : '手术记录'}
            </Button>
          </>
        );
      },
    },
  ];

  async componentDidActivate() {
    this.handleSearch();
  }

  handleSearch = async () => {
    const { editKey, defaultQuery } = this.state;
    const { baseUrl } = this.props;
    if (!baseUrl) {
      return;
    }
    if (!isNil(editKey)) {
      message.error('请保存未保存的记录');
      return;
    }
    this.setState({ loading: true });
    let dataSource = [];
    let total = 0;
    const query = this.formatQuery(defaultQuery);
    const res = (await request.get(`${baseUrl}/page`, { params: query })).data
    if (isArray(res.data.pageData)) {
      dataSource = res.data.pageData;
    }
    if (!isNaN(Number(res.data.totalElements))) {
      total = Number(res.data.totalElements);
    }
    this.setState({ dataSource, total, loading: false });
  };

  handleView = (rowData: any) => async () => {
    const { id, familyPlanningId, updateTabs, tabs, routerPath, deleteTab, keepAliveProviderRef } = rowData;

    // @ts-ignore
    const { history } = this.props;
    ///family-planning/file-management/doctor-desk2?id=22
    // history.push(
    //   `/family-planning/file-management/doctor-desk2?id=${familyPlanningId}&surgicalRecordId=${id}&activeKey=SurgicalRecord`,
    // );

    //删除keepAliveProvider缓存
    // updateTabs && (await updateTabs(get(tabs, `tabsMapping./family-planning/file-management/doctor-desk2`)));
    // routerPath && (await deleteTab(routerPath));
    // fubaoHistoryPush(
    //   `/family-planning/file-management/doctor-desk2?id=${familyPlanningId}&surgicalRecordId=${id}&activeKey=SurgicalRecord`,
    //   this.props as any);
    // if (routerPath) {
    //   const { path, search } = get(tabs, `tabsMapping.${routerPath}`);
    //   keepAliveProviderRef?.current.removeCache(`${path}.name.${search}`);
    // }
    SLocal_History.closeAndPush(resolveFubaoPath(`/family-planning/file-management/doctor-desk2?id=${familyPlanningId}&surgicalRecordId=${id}&activeKey=SurgicalRecord`))

  };
}

export default List
