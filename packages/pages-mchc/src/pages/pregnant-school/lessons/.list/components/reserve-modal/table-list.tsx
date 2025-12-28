
import { BaseListOld } from '@lm_fe/components_m';
import Table from './components/table';
import './index.less';
const tableColumns = [
  {
    title: '患者姓名',
    dataIndex: ['pregnancy', 'name'],
    ellipsis: true,
    width: 200,
    align: 'center',
  },
  {
    title: '身份证号：',
    dataIndex: ['pregnancy', 'idNO'],
    ellipsis: true,
    width: 200,
    align: 'center',
  },
];
export default class ReserveList extends BaseListOld {
  staticDefaultQuery = {
    page: 0,
    size: 20,
    sort: 'id,desc', // 基本列表都需要倒序
  };
  static defaultProps = {
    baseUrl: '/api/courses/reservations',
    baseTitle: '',
    needPagination: true,
    showQuery: false,
    showAdd: false,
    tableColumns: tableColumns,
    Table,
    rowKey: 'id',
    className: 'reserve-list-container',
    asChildComponentQueryLabel: 'courseId',
  };
}
