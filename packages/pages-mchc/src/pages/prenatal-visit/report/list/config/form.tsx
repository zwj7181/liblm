export const queryFormDescriptions = {
  name: {
    name: 'name',
    label: '孕妇姓名',
    inputType: 'input',
    filterType: '',
  },
  patientNo: {
    name: 'patientNo',

    label: '就诊卡号',
    inputType: 'input',
    filterType: '',
  },
  reportDate: {
    name: 'reportDate',
    label: '上传日期',
    inputType: 'rangeDate',
    filterType: '',
  },
  title: {
    name: 'title',
    label: '报告名称',
    inputType: 'select',
    filterType: '',
    options: [
      { label: '地中海贫血筛查', value: '地中海贫血筛查' },
      { label: '血清铁蛋白', value: '血清铁蛋白' },
      { label: '戊型肝炎病毒抗体', value: '戊型肝炎病毒抗体' },
      { label: '乙型肝炎病毒抗体', value: '乙型肝炎病毒抗体' },
      { label: '其他', value: '其他' },
    ],
  },
};

export default {
  queryFormDescriptions,
};
