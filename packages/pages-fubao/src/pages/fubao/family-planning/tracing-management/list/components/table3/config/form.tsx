export const queryFormDescriptions = {
  followUpType: {
    label: '随访类型',
    inputType: 'select',
    filterType: 'equals',
    options: [
      { label: '首次随访', value: '0' },
      { label: '1个月随访', value: '1' },
      { label: '3个月随访', value: '3' },
      { label: '6个月随访', value: '6' },
      { label: '12个月随访', value: '12' },
      { label: '全部', value: '' },
    ],
    style: {
      width: 86,
    },
  },
  followUpState: {
    label: '随访状态',
    inputType: 'select',
    filterType: 'equals',
    options: [
      { label: '已完成', value: '已完成' },
      { label: '待随访', value: '待随访' },
      { label: '未到', value: '未到' },
      { label: '失访', value: '失访' },
      { label: '全部', value: '' },
    ],
    style: {
      width: 86,
    },
  },
  outpatientNo: {
    label: '门诊号',
    inputType: 'input',
    filterType: '',
  },
  name: {
    label: '姓名',
    inputType: 'input',
    filterType: '',
  },
  surgeryDate: {
    label: '手术日期',
    inputType: 'rangeDate',
    filterType: '',
    //paramType: 'startAndEnd',
  },
};
export default {
  queryFormDescriptions,
};
