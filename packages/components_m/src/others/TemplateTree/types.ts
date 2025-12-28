export interface IndexProps {
  type: number; // 模板对应的type
  checkable: boolean; // 模板是否支持勾选
  editable?: boolean; // 模板是否支持编辑
  divide?: boolean; // 是否需要左右展示
  onChecked?: Function;
  onSelected?: Function;
  userid?: number;
  depid?: number;
  showIcd?: boolean;
  pregnancyid?: number;
  searchValue?: string;
}
export interface IndexState {
  templateData: any;
  checkedKeys: string[];
  checkedKeysLeft: string[];
  checkedKeysRight: string[];

  currentArea: any;
  operation: any;
  nodeTreeItem: any;
  modalVisible: boolean;
  newTitle: any;
  addTitle: any;
}