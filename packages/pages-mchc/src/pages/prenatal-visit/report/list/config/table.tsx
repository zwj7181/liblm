import { APP_CONFIG } from '@lm_fe/env';
import dayjs from 'dayjs';

export const tableColumns = [
  {
    title: '就诊卡号',
    dataIndex: 'patientNo',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '检查医院',
    dataIndex: 'organization',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },

  {
    title: '项目类型',
    dataIndex: 'type',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '项目名称',
    dataIndex: 'title',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '上传日期',
    dataIndex: 'reportDate',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (text) => dayjs(text).format('YYYY-MM-DD'),
  },
  // {
  //   title: '上传日期',
  //   dataIndex: 'uploadDate',
  //   width: APP_CONFIG.CELL_WIDTH_SMALL,
  //   render: (text) => dayjs(text).format('YYYY-MM-DD'),
  // },
  {
    title: '操作人',
    dataIndex: 'recorder',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '结果',
    dataIndex: 'result',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
];
