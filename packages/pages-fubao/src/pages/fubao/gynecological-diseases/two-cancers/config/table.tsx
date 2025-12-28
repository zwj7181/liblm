import { APP_CONFIG } from "@lm_fe/components_m"
import { SFubao_TwoCancerScreeningFile } from "@lm_fe/service";
export const tableColumns = [
  {
    title: '门诊号',
    dataIndex: 'outpatientNo',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '年龄(岁)',
    dataIndex: 'age',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
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
  {
    title: '状态',
    dataIndex: 'fileStatus',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    inputType: 'MS' as const,
    inputProps: { options: '已审核,未审核', marshal: 0 }
    // render(a, record) {
    //   return SFubao_TwoCancerScreeningFile.check_审核(record) ? '已审核' : '未审核'
    // }
  },
];
