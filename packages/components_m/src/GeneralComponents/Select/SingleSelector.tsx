import React from 'react';
import { LazyAntd } from '@lm_fe/components';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd
export default function SingleSelector(props: any) {
  const { value, onChange, fetchOptions, ...rest } = props
  const inputProps = rest.inputProps || {};

  return <Select allowClear={true} {...inputProps} value={value} onFocus={fetchOptions} onChange={onChange}></Select>;
}
