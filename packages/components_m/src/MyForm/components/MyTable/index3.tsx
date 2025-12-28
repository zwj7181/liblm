import { LazyAntd } from '@lm_fe/components';
import { Button } from 'antd';
import { get, set } from 'lodash';
import React, { Component } from 'react';
import './index.less';
import EditableCell from './TableEditableCell';

const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd


interface MyTableProps {
  onChange: Function;
  dispatch?: Function;
  value: any;
  input_props: any;
}
interface MyTableState {
  selectedRowKeys: Array<number | string>;
  tableColumns: any;
  dataSource: any;
}
export default class MyTable extends Component<MyTableProps, MyTableState> {
  constructor(props: MyTableProps) {
    super(props);
    this.state = {
      tableColumns: [],
      dataSource: [],
      selectedRowKeys: [],
    };
  }

  // 因为要维护tableRow的状态，所有需要保存在本地
  componentDidUpdate(prevProps: MyTableProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      const { value } = this.props;
      this.setState({
        tableColumns: this.props.input_props.tableColumns,
        // 处理dataSource，为了dataSource拥有_key值,用于rowSelection
        dataSource: Array.isArray(value) ? value.map((v: any, i: number) => ({ ...v, _key: i })) : [],
        selectedRowKeys: [],
      });
    }
  }

  handleEdit = (val: any, key: string, index: number) => {
    const { onChange, dispatch } = this.props;
    const { dataSource } = this.state;
    set(dataSource[index], key, val);
    if (dispatch) dispatch('tableEdit', dataSource[index]);
    onChange(dataSource);
  };

  handleAdd = () => {
    const { tableColumns, dataSource } = this.state;
    const { onChange } = this.props;
    const newData = {};
    tableColumns.forEach((ele: { key: string; title: string }) => {
      newData[ele.key] = '';
    });
    const newValue = dataSource.map((v: any) => v);
    newValue.push(newData);
    onChange(newValue);
  };

  handleDelete = () => {
    const { selectedRowKeys, dataSource } = this.state;
    const newDataSource = JSON.parse(JSON.stringify(dataSource));
    selectedRowKeys.forEach((key: number | string) => {
      for (let i = 0; i < newDataSource.length; i++) {
        if (key === newDataSource[i]._key) {
          newDataSource.splice(i, 1);
          break;
        }
      }
    });
    this.props.onChange(newDataSource);
  };

  handleRowSelectChange = (selectedRowKeys: Array<number | string>, selectedRows: any[]): void => {
    const { dispatch } = this.props;
    this.setState({ selectedRowKeys });
    dispatch && dispatch('rowSelect', { selectedRowKeys, selectedRows });
  };

  getRowSpans = (arr: Array<any>, key: string) => {
    let sameValueLength = 0;
    const rowSpans = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      if (i === 0) {
        rowSpans[i] = sameValueLength + 1;
        continue;
      }
      if (arr[i][key] === arr[i - 1][key]) {
        rowSpans[i] = 0;
        sameValueLength++;
      } else {
        rowSpans[i] = sameValueLength + 1;
        sameValueLength = 0;
      }
    }
    return rowSpans;
  };

  // 对于二级表单的处理
  handleTabColumnsFormat = (tableColumns: Array<any>): any => {
    const { dataSource } = this.state;
    const { dispatch } = this.props;
    const { editable, isMerge, ignoreKeys } = this.props.input_props;
    const rowSpans = this.getRowSpans(dataSource, 'mergeIndex');
    return tableColumns.map((v: any, i: number) => {
      if (v.key) {
        return {
          ...v,
          dataIndex: v.key,
          render: (text: string, record: any, index: number) => {
            if (editable) {
              if (isMerge && !ignoreKeys.includes(v.key)) {
                return {
                  children: (
                    <EditableCell
                      value={get(record, v.key)}
                      onChange={(val: any) => this.handleEdit(val, v.key, index)}
                      editor={v.editor}
                    />
                  ),
                  props: {
                    rowSpan: rowSpans[index],
                  },
                };
              } else {
                return (
                  <EditableCell
                    value={get(record, v.key)}
                    onChange={(val: any) => this.handleEdit(val, v.key, index)}
                    rowItem={record}
                    dispatch={dispatch}
                    editor={v.editor}
                  />
                );
              }
            } else {
              return <span>{get(record, v.key) || '-'}</span>;
            }
          },
        };
      }
      if (v.children) {
        return {
          title: v.title,
          children: this.handleTabColumnsFormat(v.children),
        };
      }
      return {};
    });
  };

  render() {
    const { input_props } = this.props;
    let { tableColumns } = this.state;
    const { dataSource } = this.state;
    const { editable, hiddenBtn, hiddenSelection, pagination, scroll } = input_props;
    tableColumns = this.handleTabColumnsFormat(tableColumns);
    console.log(tableColumns);
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.handleRowSelectChange,
    };
    return (
      <div>
        {editable && !hiddenBtn && (
          <div>
            <Button onClick={this.handleAdd}>新增</Button>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
        )}
        <Table
          bordered
          className="my-table"
          rowSelection={!hiddenSelection ? rowSelection : undefined}
          columns={tableColumns || []}
          dataSource={dataSource || []}
          childrenColumnName="noChildren"
          rowKey={(record: any) => record._key}
          pagination={pagination ? pagination : false}
          scroll={scroll}
        />
      </div>
    );
  }
}
