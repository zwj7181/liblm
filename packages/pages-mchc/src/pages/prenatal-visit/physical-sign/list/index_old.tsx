import { get } from 'lodash';
import ModalForm from './components/ModalForm';
import Table from './components/Table';
import Query from './components/Query';
import { tableColumns } from './config/table';
import { BaseListOld } from '@lm_fe/components_m';

export default class List extends BaseListOld {
  staticDefaultQuery = {
    page: 0,
    size: 20,
    sort: 'id,desc',
  };

  static defaultProps = {
    baseUrl: '/api/measures',
    baseTitle: '体征管理',
    needPagination: true,
    needEditInTable: false,
    showQuery: true,
    showAdd: true,
    showAction: true,
    tableColumns,
    rowKey: 'id',
    Table,
    Query,
    ModalForm,
    otherTableProps: {
      scroll: { x: 1278 },
    },
  };

  handleDoubleClickRow = (record: any) => () => {
    this.setState({
      visible: true,
      editable: true,
      id: get(record, 'id'),
    });
  };
}
