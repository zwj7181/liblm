export const queryFormDescriptions = {
  referralDate: {
    label: '转诊时间',
    inputType: 'rangeDate',
    filterType: '',
  },
  referralDirection: {
    label: '类型',
    inputType: 'select',
    filterType: 'equals',
    options: [
      { label: '全部', value: '' },
      { label: '平级', value: '1' },
      { label: '上级', value: '2' },
      { label: '下级', value: '3' },
    ],
  },
  pregnancyName: {
    label: '姓名',
    inputType: 'input',
    filterType: '',
  },
};

export default {
  queryFormDescriptions,
};
