
import { APP_CONFIG } from "@lm_fe/env";
import { get } from 'lodash';

export const tableColumns = [
  {
    title: '课程标题',
    dataIndex: 'name',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '主讲人',
    dataIndex: 'teacher',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '开课时间',
    dataIndex: 'beginTime',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
    render: (value, rowData) => {
      return `${get(rowData, 'courseDate')} ${get(rowData, 'period') || ''} `;
    },
  },
  {
    title: '开课地点',
    dataIndex: 'location',
    key: 'bedNO',
    ellipsis: true,
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '可预约人数',
    dataIndex: 'limitNum',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '费用',
    dataIndex: 'fee',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '创建人',
    dataIndex: 'createdBy',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '已预约人数',
    dataIndex: 'reservedAttendeeNum',
    align: 'center',
    width: 120,
  },
  {
    title: '实际人数',
    dataIndex: 'actualAttendeeNum',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '创建时间',
    dataIndex: 'createdDate',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
];
