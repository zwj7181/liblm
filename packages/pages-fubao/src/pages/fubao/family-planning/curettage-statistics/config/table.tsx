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
    title: '患者姓名',
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
    title: '手术日期',
    dataIndex: 'registerDate',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '术前诊断',
    dataIndex: 'idNO',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '手术种类',
    dataIndex: 'idNO',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '随访日期',
    dataIndex: 'idNO',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '术后复诊',
    dataIndex: 'idNO',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '登记者',
    dataIndex: 'registerPerson',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
];
