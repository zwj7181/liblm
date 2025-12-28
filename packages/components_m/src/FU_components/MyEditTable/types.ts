import { IMchc_FormDescriptions_Field_Nullable } from '@lm_fe/service';
import { TableProps } from 'antd';


export interface IMyEditTableProps extends Omit<TableProps<any>, 'onChange'> {
  disabled?: boolean
  formDescriptions?: IMchc_FormDescriptions_Field_Nullable[]
  value?: any[]
  onChange?(v: any[]): void
  marshal?: 0 | 1
  showIndex?: boolean
  showEdit?: boolean
  showTitle?: boolean
  hideAction?: boolean

  rowKey?: string
  changeImmediate?: boolean
  genRowData?: (list: any[]) => any
}