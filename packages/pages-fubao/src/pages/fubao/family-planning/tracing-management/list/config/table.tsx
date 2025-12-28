import { APP_CONFIG } from "@lm_fe/components_m";
export const tableColumns = [
  {
    title: '门诊号',
    dataIndex: 'outpatientNO',
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
    title: '手术日期',
    dataIndex: 'dob',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '手术类型',
    dataIndex: 'note',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '手术医生',
    dataIndex: 'doctor',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '随访记录',
    children: [
      {
        title: '1个月',
        dataIndex: 'om',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: '3个月',
        dataIndex: 'tm',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },

      {
        title: '6个月',
        dataIndex: 'sm',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
      {
        title: '12个月',
        dataIndex: 'tem',
        width: APP_CONFIG.CELL_WIDTH_SMALL,
      },
    ],
  },
];
