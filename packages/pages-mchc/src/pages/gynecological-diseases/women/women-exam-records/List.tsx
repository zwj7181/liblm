import { BaseListOld as BaseList } from '@lm_fe/components_m';
import Table from './components/Table';
import { get_tableColumns } from './config/table';
import { SLocal_History } from '@lm_fe/service';
export class List extends BaseList {
  staticDefaultQuery = {
    page: 0,
    size: 20,
  };

  static defaultProps = {
    baseUrl: '/api/gynecological-visits',
    // request,
    baseTitle: '妇女检查记录',
    needPagination: true,
    showQuery: false,
    showAdd: true,
    showAction: true,
    tableColumns: get_tableColumns(),
    rowKey: 'id',
    Table,
  };

  handleAdd = async () => {
    const { id: patientId } = this.props;
    const { updateWomenExamRecordsEditingId } = this.props;
    // await updateWomenExamRecordsEditingId(undefined);
    const { history } = this.props;
    SLocal_History.safe_history_push(`/gynecological-diseases/women/women-exam-records/add?patientId=${patientId}`,this.props);
  };

  handleEdit = (rowData: any) => () => {
    const { id } = rowData;
    const { history } = this.props;
    SLocal_History.safe_history_push(`/gynecological-diseases/women/women-exam-records/edit?id=${id}`,this.props);
  };
}
export default List;
