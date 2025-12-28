export const queryFormDescriptions = {
  'course.name': {
    label: '课程标题',
    inputType: 'input',
    filterType: '',
  },
  'pregnancy.name': {
    label: '姓名',
    inputType: 'input',
    filterType: '',
  },
  
  status: {
    label: '签到状态',
    inputType: 'select',
    filterType: 'in',
    options: [
      { label: '全部', value: null },
      { label: '未签到', value: '0' },
      { label: '已签到', value: '1' },
      { label: '已取消', value: '2' },
    ],
    style: {
      width: 100,
    },
  },
  type: {
    label: '课程类型',
    inputType: 'select',
    filterType: 'equals',
    options: [
      {
        label: '孕妇学校',
        value: 1,
      },
      {
        label: '助产课程',
        value: 2,
      },
    ],
  },
  courseDate: {
    label: '开课日期',
    inputType: 'rangeDate',
    filterType: '',
    // paramType: 'custom',
  },
};

export default {
  queryFormDescriptions,
};
