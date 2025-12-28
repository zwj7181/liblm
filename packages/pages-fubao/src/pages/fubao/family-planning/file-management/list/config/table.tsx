import { APP_CONFIG } from "@lm_fe/components_m";
export const tableColumns = [
  {
    title: '门诊号',
    dataIndex: 'outpatientNo',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    showSorter: false,
  },
  {
    title: '年龄(岁)',
    dataIndex: 'age',
    width: 58,
  },
  {
    title: '手机号码',
    dataIndex: 'telephone',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '建档日期',
    dataIndex: 'registerDate',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '身份证号码',
    dataIndex: 'idNO',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '登记者',
    dataIndex: 'registerPerson',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
];
