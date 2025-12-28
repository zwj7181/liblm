import { BaseTable } from '../../BaseTable';
import React, { lazy } from 'react';
const EditInTable = lazy(() => import('./EditInTable_Inner'))
export const tableColumnsSpecialInputType = ['select_tag_with_options', 'tree_select_v2', 'tree_select'];
export default function GeneralComponents_EditInTable({ tableColumns, changeImmediate = true, Table = BaseTable }: any) {

  function GeneralComponents_EditInTable_Inner_Wrapper(props: any) {

    return <EditInTable {...props} tableColumns={tableColumns} changeImmediate={changeImmediate} Table={Table} />

  }

  return GeneralComponents_EditInTable_Inner_Wrapper
};
export { EditInTable as GeneralComponents_EditInTable_Inner, EditInTable }