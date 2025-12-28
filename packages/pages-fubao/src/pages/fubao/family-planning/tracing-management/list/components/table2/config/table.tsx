import { APP_CONFIG } from "@lm_fe/components_m";
export const tableColumns = [
  {
    title: '门诊号',
    dataIndex: 'outpatientNo',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
  {
    title: '年龄(岁)',
    dataIndex: 'age',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
  {
    title: '手机号码',
    dataIndex: 'telephone',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
  {
    title: '手术日期',
    dataIndex: 'surgeryDate',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
  {
    title: '手术类型',
    dataIndex: 'surgeryType',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
  {
    title: '手术医生',
    dataIndex: 'surgeryDoctor',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
  {
    title: '随访类型',
    dataIndex: ['earlyPregnancyCheckPacTrackingFollowUpRecordVMS', '0', 'followUpType'],
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    align: 'center',
    render: (text: any) => {
      if (text === 0) {
        return '首次随访';
      }
      if (text === 1) {
        return '1个月随访';
      }
      if (text === 3) {
        return '3个月随访';
      }
      if (text === 6) {
        return '6个月随访';
      }
      if (text === 12) {
        return '12个月随访';
      }
      return '';
    },
  },
  {
    title: '随访方式',
    dataIndex: ['earlyPregnancyCheckPacTrackingFollowUpRecordVMS', '0', 'followUpWay'],
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
  {
    title: '随访情况',
    dataIndex: ['earlyPregnancyCheckPacTrackingFollowUpRecordVMS', '0', 'followUpSituation'],
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
    render: (text: any) => {
      if (text === '正常') {
        return <span style={{ color: '#21AC8D' }}>{text}</span>;
      } else {
        return <span style={{ color: '#FD617F' }}>{text}</span>;
      }
    },
  },
  {
    title: '随访时间',
    dataIndex: ['earlyPregnancyCheckPacTrackingFollowUpRecordVMS', '0', 'followUpDate'],
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
  {
    title: '随访人',
    dataIndex: ['earlyPregnancyCheckPacTrackingFollowUpRecordVMS', '0', 'followUpPerson'],
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    align: 'center',
  },
];
