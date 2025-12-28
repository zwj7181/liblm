export const queryFormDescriptions = {
  outpatientNo: {
    label: '手术日期',
    inputType: 'rangeDate',
    filterType: '',
  },
  telephone: {
    label: '手术种类',
    inputType: 'select',
    filterType: 'equals',
    options: [
      {
        label: '分段诊刮术',
        value: '分段诊刮术',
      },
      {
        label: '一般诊刮术',
        value: '一般诊刮术',
      },
      { label: '全部', value: '' },
    ],
    style: {
      width: 112,
    },
  },
  idNO: {
    label: '门诊号',
    inputType: 'input',
    style: {
      width: 156,
    },
  },
  name: {
    label: '患者姓名',
    inputType: 'input',
    filterType: '',
    style: {
      width: 100,
    },
  },
  telephone2: {
    label: '手机号码',
    inputType: 'input',
    filterType: '',
    style: {
      width: 156,
    },
  },
};
export default {
  queryFormDescriptions,
};
