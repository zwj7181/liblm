import { MyIcon, QRCode_L } from '@lm_fe/components';
import { BaseListOld } from '@lm_fe/components_m';
import { mchcEnv } from '@lm_fe/env';
import { mchcModal__ } from '@lm_fe/pages';
import { request } from '@lm_fe/utils';
import { Button, Divider, Popconfirm, Switch } from 'antd';
import { concat, findIndex, get } from 'lodash';
import CopyModalForm from './components/CopyModalForm';
import ModalForm from './components/ModalForm';
import Query from './components/Query';
import ReserveModal from './components/reserve-modal';
import Table from './components/Table';
import { tableColumns } from './config/table';

export default class List extends BaseListOld {
  timer: any = null;
  state = {
    total: 0,
    defaultQuery: this.staticDefaultQuery,
    dataSource: [],
    selectedRowKeys: [],
    selectedRows: [],
    visible: false,
    editable: false,
    id: undefined,
    editKey: undefined,
    loading: false,
    isSearchColumnModal: false,
    rowData: {},
  };
  static defaultProps = {
    baseUrl: '/api/courses',
    baseTitle: '课程列表',
    needPagination: true,
    showQuery: true,
    showAdd: true,
    ModalForm,
    tableColumns,
    rowKey: 'id',
    Table,
    Query,
    otherTableProps: {
      scroll: { x: 1596 },
    },
  };
  getReducerColumns() {
    const index = findIndex(this.props.tableColumns, (item) => item.dataIndex == 'reserveNum');
    if (index == -1)
      this.props.tableColumns?.splice(5, 0, {
        title: '已预约孕妇数',
        dataIndex: 'reserveNum',
        ellipsis: true,
        width: 100,
        align: 'center',
        render: (recordstate: any, rowData: any) => {
          return (
            <div onClick={this.showReadModal.bind(this, rowData)} style={{ color: '#007AFF', cursor: 'pointer' }}>
              {recordstate}
            </div>
          );
        },
      });
    return concat(this.props.tableColumns, [
      {
        title: '发布状态',
        dataIndex: 'status',
        showSorter: false,
        showFilter: false,
        align: 'center',
        width: 100,
        render: (value: any, rowData: any) => {
          return <Switch size="small" checked={value} onChange={this.handleDisabled(rowData)} />;
        },
      },
      {
        title: '操作',
        showSorter: false,
        showFilter: false,
        fixed: 'right',
        width: 178,
        align: 'center',
        render: (value: any, rowData: any, index: number) => {
          return (
            <>
              <Button type="link" size="small" onClick={this.handleQrcodeView(rowData)}>
                <MyIcon value='QrcodeOutlined' />
                二维码
              </Button>
              <Divider type="vertical" />
              <Button type="link" size="small" onClick={this.handleEdit(rowData)}>
                <MyIcon value='EditOutlined' />
                编辑
              </Button>
              <Divider type="vertical" />
              <br></br>
              <Button type="link" size="small" onClick={this.handleCopy(rowData)}>
                <MyIcon value='CopyOutlined' />
                复制课程
              </Button>
              <Divider type="vertical" />
              <Popconfirm
                title={`确定要删除这个${get(this.props, 'baseTitle')}吗?`}
                onConfirm={this.handleDelete(rowData)}
                okText="确定"
                cancelText="取消"
              >
                <Button type="link" size="small">
                  <MyIcon value='DeleteOutlined' />
                  删除
                </Button>
              </Popconfirm>
              <Divider type="vertical" />
            </>
          );
        },
      },
    ]);
  }
  columns = this.getReducerColumns();

  handleCopy = (record: any) => () => {
    this.setState({
      copyVisible: true,
      editable: true,
      id: record.id,
    });
  };
  showReadModal(rowData: any) {
    if (get(rowData, `reserveNum`)) this.setState({ reserveVisible: true, rowData: rowData });
  }
  cancleModal() {
    this.setState({ reserveVisible: false });
  }

  handleQrcodeView = (rowData: any) => () => {

    mchcModal__.open('test', {
      title: '患者手机端-首页-扫一扫-进行扫码签到',
      width: 400,
      bodyStyle: { height: 400 },
      modal_data: {
        content: <QRCode_L
          value={`courseid~${get(rowData, 'id')}~${get(rowData, 'name')}`}
          size={380}
        />

      }
    })

  };

  handleView = (rowData: any) => () => {
    const { id } = rowData;
    const { history } = this.props;
    history.push(`/deliver-management/admission/deliver-edit?id=${id}`);
  };

  handleDisabled = (rowData: any) => async () => {
    if (get(rowData, 'status') == false) {
      await request.put('/api/courses', {
        ...rowData,
        status: true,
      });
    } else {
      await request.put('/api/courses', {
        ...rowData,
        status: false,
      });
    }
    mchcEnv.success('操作成功'); // TODO: 即使已经返回，但接口数据仍未更新，刷新还是旧数据
    setTimeout(() => {
      this.handleSearch();
    }, 100);
  };
  renderOthersModal = () => {
    const { visible, editable, id, rowData, reserveVisible, copyVisible } = this
      .state as any;
    const { ModalForm } = this.props;
    return (
      <>
        {visible && (
          <ModalForm
            visible={visible}
            editable={editable}
            id={id}
            onCancel={this.handleCancel}
            onSearch={this.handleSearch}
            title={this.props.baseTitle}
          />
        )}
        {copyVisible && (
          <CopyModalForm
            visible={copyVisible}
            editable={editable}
            id={id}
            onCancel={() => this.setState({ copyVisible: false, id: null })}
            onSearch={this.handleSearch}
            title={this.props.baseTitle}
          />
        )}


        {reserveVisible && (
          <ReserveModal visible={reserveVisible} selectCourse={rowData} onCancle={this.cancleModal.bind(this)} />
        )}
      </>
    );
  };
}
