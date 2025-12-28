export const queryFormDescriptions = {
  outpatientNO: {
    label: '随访类型',
    inputType: 'select',
    filterType: 'in',
    options: [
      { label: '首次随访', value: 1 },
      { label: '1个月随访', value: 2 },
      { label: '3个月随访', value: 3 },
      { label: '6个月随访', value: 4 },
      { label: '12个月随访', value: 5 },
      { label: '全部', value: 6 },
    ],
    style: {
      width: 86,
    },
  },
  name: {
    label: '随访状态',
    inputType: 'select',
    filterType: 'in',
    options: [
      { label: '已完成', value: 1 },
      { label: '待随访', value: 2 },
      { label: '未到', value: 3 },
      { label: '失访', value: 4 },
      { label: '全部', value: 5 },
    ],
    style: {
      width: 86,
    },
  },
  idNO: {
    label: '门诊号',
    inputType: 'input',
    filterType: '',
  },
  idNO2: {
    label: '姓名',
    inputType: 'input',
    filterType: '',
  },
  idNO2dd: {
    label: '手术日期',
    inputType: 'rangeDate',
    filterType: '',
    paramType: 'startAndEnd',
  },
};
export default {
  queryFormDescriptions,
};
