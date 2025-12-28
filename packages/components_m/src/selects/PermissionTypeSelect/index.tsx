import React from 'react';
import { map, keyBy } from 'lodash';
import { LazyAntd } from '@lm_fe/components';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd
export const typeMapping = [
  {
    value: 'menu',
    title: '菜单',
  },
  {
    value: 'route',
    title: '页面',
  },
  {
    value: 'function',
    title: '具体功能',
  },
];
export const typeMappingByValue = keyBy(typeMapping, 'value');
export default (props: any) => (
  <Select style={{ width: 150 }} placeholder="请选择类型" allowClear {...props}>
    {map(typeMapping, (status, index) => (
      <Select.Option key={index} value={status.value}>
        {status.title}
      </Select.Option>
    ))}
  </Select>
);
