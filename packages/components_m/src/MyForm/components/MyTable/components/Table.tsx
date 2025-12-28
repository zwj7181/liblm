import React from 'react';
import { BaseTable } from '../../../../BaseTable';
export default function FormTable(props: any) {

  const { columns, ...rest } = props;


  return <BaseTable size="small" bordered className="my-table" {...rest} columns={columns} />;

}
