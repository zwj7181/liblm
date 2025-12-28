export const queryFormDescriptions = {
  surgicalDate: {
    label: '手术日期',
    inputType: 'rangeDate',
    filterType: '',
  },
  operationName: {
    label: '手术名称',
    inputType: 'input',
    filterType: '',
  },
  progressStatus: {
    label: '状态',
    inputType: 'select',
    filterType: 'equals',
    options: [
      { label: '已签到', value: 3 },
      { label: '已完成', value: 4 },
    ],
  },
  outpatientNo: {
    label: '门诊号',
    inputType: 'input',
    filterType: '',
  },
  telephone: {
    label: '手机号码',
    inputType: 'input',
    filterType: '',
    style: {
      width: 112,
    },
  },
  name: {
    label: '姓名',
    inputType: 'input',
    filterType: '',
    style: {
      width: 100,
    },
  },
};
export default {
  queryFormDescriptions,
};
