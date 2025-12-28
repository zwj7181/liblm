/*
 * @Descripttion: 查询表单配置
 * @Author: cjl
 * @Date: 2021-11-09 16:52:21
 * @LastEditTime: 2021-11-12 15:49:35
 */

export const queryFormDescriptions = {
  title: {
    label: '文章标题',
    inputType: 'input',
    filterType: '',
    style: {
      width: 100,
    },
  },
  type: {
    label: '文章类型',
    inputType: 'select',
    filterType: 'in',
    options: [
      { label: '全部', value: null },
      { label: '诊疗指南', value: '1' },
      { label: '科室流程', value: '2' },
    ],
    style: {
      width: 86,
    },
  },
  readingState: {
    label: '阅读状态',
    inputType: 'select',
    filterType: 'equals',
    options: [
      { label: '全部', value: null },
      { label: '未读', value: '0' },
      { label: '已读', value: '1' },
    ],
    style: {
      width: 86,
    },
  },
  createDate: {
    label: '创建时间',
    inputType: 'rangeDate',
    filterType: '',
  },
};

export default {
  queryFormDescriptions,
};
