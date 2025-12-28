export const queryFormDescriptions = {
  courseDate: {
    label: '开课日期',
    inputType: 'rangeDate',
    filterType: '',
  },
  name: {
    label: '课程标题',
    inputType: 'input',
    filterType: '',
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
};

export const modalFormDescriptions = {
  type: {
    key: 'type',

    label: '课程类型',
    inputType: 'MS',
    inputProps: {
      marshal: 0,
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
  },
  name: {
    key: 'name',
    label: '课程标题',
    rules: [{ required: true, message: '课程标题是必填项' }],
    inputType: 'input',
    inputProps: {
      
    },
  },
  poster: {
    key: 'poster',
    label: '课程封面',
    rules: [{ required: true, message: '课程封面是必填项' }],
    inputType: 'image_upload_preview',
    inputProps: {
      
    },
  },
  intro: {
    key: 'intro',
    label: '课程简述',
    rules: [{ required: true, message: '课程简述是必填项' }],
    inputType: 'text_area',
    inputProps: {
      
    },
  },
  teacher: {
    key: 'teacher',
    label: '主讲人',
    rules: [{ required: true, message: '主讲人是必填项' }],
    inputType: 'input',
    inputProps: {
      
    },
  },
  position: {
    key: 'position',
    label: '主讲人职位',
    rules: [{ required: true, message: '主讲人职位是必填项' }],
    inputType: 'input',
    inputProps: {
      
    },
  },
  datetime: {
    key: 'datetime',
    label: '开课日期',
    rules: [{ required: true, message: '开课日期是必填项' }],
    inputType: 'date_time_picker',
    inputProps: {
      date: {
        disabledRules: 'default',
      },
      time: {
        format: 'HH:mm',
        disabledHoursRules: 'default',
        disabledMinutesRules: 'default',
      },
    },
  },
  location: {
    key: 'location',
    label: '开课地点',
    rules: [{ required: true, message: '开课地点是必填项' }],
    inputType: 'input',
    inputProps: {
      
    },
  },
  limitNum: {
    key: 'limitNum',
    label: '可预约人数（个）',
    rules: [{ required: true, message: '可预约人数是必填项' }],
    inputType: 'input_number',
    inputProps: {
      
    },
  },
  fee: {
    key: 'fee',
    label: '费用（元）',
    rules: [{ required: true, message: '费用（元）是必填项' }],
    inputType: 'input_number',
    inputProps: {
      
    },
  },
  status: {
    key: 'status',
    label: '是否发布',
    rules: [{ required: true, message: '是否发布是必填项' }],
    inputType: 'pregnant_radio',
    inputProps: {},
  },
};

export default {
  queryFormDescriptions,
  modalFormDescriptions,
};
