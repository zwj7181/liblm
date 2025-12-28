import React from 'react';
import { map } from 'lodash';
import { LazyAntd } from '@lm_fe/components';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd
export const serviceStatusMapping = [
  {
    value: 0,
    title: '待回复',
  },
  {
    value: 1,
    title: '已回复',
  },
  {
    value: 2,
    title: '已恢复套餐服务',
  },
  {
    value: 3,
    title: '已退款',
  },
];
export default (props: any) => (
  <Select placeholder="请选择服务状态" allowClear {...props}>
    {map(serviceStatusMapping, status => (
      <Select.Option value={status.value}>{status.title}</Select.Option>
    ))}
  </Select>
);
