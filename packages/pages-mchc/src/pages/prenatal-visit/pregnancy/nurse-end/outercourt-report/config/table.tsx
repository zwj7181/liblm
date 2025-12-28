import { APP_CONFIG } from '@lm_fe/components_m';
import dayjs from 'dayjs';
export const tableColumns = [
  {
    title: '检查医院',
    dataIndex: 'organization',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '日期',
    dataIndex: 'reportDate',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (text) => dayjs(text).format('YYYY-MM-DD'),
  },
  {
    title: '项目类型',
    dataIndex: 'type',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '项目名称',
    dataIndex: 'title',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '结果',
    dataIndex: 'result',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
];
