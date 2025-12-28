
import { APP_CONFIG } from "@lm_fe/env";

export const tableColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
  {
    title: '证件号码',
    dataIndex: 'idNo',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
  {
    title: '手机号码',
    dataIndex: 'telephone',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
  {
    title: '预约课程数',
    dataIndex: 'reservationNum',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    align: 'center',
  },
  {
    title: '取消次数',
    dataIndex: 'cancelNum',
    ellipsis: true,
    width: 100,
    align: 'center',
  },
  {
    title: '已完成课程',
    dataIndex: 'signNum',
    ellipsis: true,
    width: 0.5 * APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
];
