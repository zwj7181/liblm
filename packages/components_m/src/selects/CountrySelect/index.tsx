import React from 'react';
import { SelectProps } from 'antd/es/select';
import { mchcEnv } from '@lm_fe/env';
import { LazyAntd } from '@lm_fe/components';

const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

interface IProps extends SelectProps<any> {
  language: 'zh-CN' | 'EN';
}

export default (props: IProps) => {
  const countries = mchcEnv.get_options('国家s')
  return (
    <Select
      showSearch
      allowClear
      placeholder="请选择国家"
      getPopupContainer={(triggerNode) => triggerNode.parentNode}
      filterOption={(input, option) => {
        return option?.children.toLowerCase().indexOf(input.toLowerCase()) > -1;
      }}
      {...props}
    >
      {countries.map((item, index) => {
        return (
          <Select.Option key={item.label} value={item.label!}>
            {item.label}
          </Select.Option>
        );
      })}
    </Select>
  );
};
