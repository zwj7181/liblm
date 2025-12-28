
import React from 'react';
import { GeneralComponents_EditInTable_Inner } from '../../GeneralComponents/EditInTable';
import { safe_json_parse } from '@lm_fe/utils';
import { get } from 'lodash';
import tableColumnsObj from './config/index';
export default function CustomEditInTable(props: any) {
  const { config, value, onChange, ...rest } = props;

  

  const specialConfig = safe_json_parse(get(config, 'specialConfig'));
  let tableColumns = get(specialConfig, 'tableColumns');
  if (typeof tableColumns == 'string') {
    tableColumns = tableColumnsObj[tableColumns] || [];
  }

  return  <GeneralComponents_EditInTable_Inner tableColumns={tableColumns} {...rest} onChange={onChange} value={value} />;
}
