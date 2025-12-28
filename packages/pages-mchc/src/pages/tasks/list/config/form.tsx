export const queryFormDescriptions = {
  contentType: {
    label: '任务类型',
    inputType: 'select',
    filterType: 'equals',
    url: '/api/dictionaries/134',
  },
  releaseStatus: {
    label: '启用状态',
    inputType: 'select',
    filterType: 'equals',
    options: [
      { value: 1, label: '开启' },
      { value: 2, label: '关闭' },
    ],
  },
  runStatus: {
    label: '运行情况',
    inputType: 'select',
    filterType: 'equals',
    url: '/api/dictionaries/211',
  },
};

export const modalFormDescriptions = {
  url: {
    key: 'url',
    label: '视频文件',
    rules: [{ required: true, message: '文件是必填项' }],
    inputType: 'upload_file',
  },
  title: {
    key: 'title',
    label: '视频标题',
    rules: [{ required: true, message: '视频标题是必填项' }],
    inputType: 'input',
    inputProps: {
      
    },
  },
  description: {
    key: 'description',
    label: '视频描述',
    rules: [{ required: true, message: '视频描述是必填项' }],
    inputType: 'input',
    inputProps: {
      
    },
  },
};

export default {
  queryFormDescriptions,
  modalFormDescriptions,
};
