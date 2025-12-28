import { DatePicker_L, LazyAntd } from '@lm_fe/components';
import { formatDate } from '@lm_fe/utils';
import { Button, Col, Form, InputNumber, Row } from 'antd';
import { cloneDeep, filter, get, indexOf, isArray, isEmpty, isEqual, join, map, set } from 'lodash';
import dayjs from 'dayjs';
import React, { Component } from 'react';
import BaseFormComponent from '../../../../BaseFormComponent';
import columnsConfig from './config/table';
import './index.less';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

const layout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
};
export default class PdProcedure extends Component {
  columns: any;

  constructor(props) {
    super(props);
    const tableColumnName = get(props, 'input_props.tableColumnName');
    this.state = {
      dataSource: [],
      selectedRowKeys: [],
      editingCol: undefined,
      editingRow: undefined,
      editingValue: undefined,
    };
    this.columns = columnsConfig[tableColumnName];
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;
    console.log(value)
    if (!isEqual(prevProps.value, value)) {
      this.setState({
        dataSource: map(value, (item) => ({ ...item, key: get(item, 'key') || get(item, 'id') })),
      });
    }
  }

  formatColumns = (columns: any) => {
    const { onChange } = this.props;
    const { editingCol, editingRow, editingValue, dataSource } = this.state;

    return map(columns, (column) => {
      const { editable, inputType, dataIndex, inputProps, children } = column;
      if (!isEmpty(children)) {
        return {
          ...column,
          children: this.formatColumns(children),
        };
      }
      if (!editable) {
        return column;
      }
      return {
        ...column,
        render: (value, rowData, rowIndex) => {
          let renderValue = value;
          if (['single_date_picker'].indexOf(inputType) > -1) {
            renderValue = dayjs(value, 'YYYY-MM-DD');
          }

          return editingCol === dataIndex && editingRow === rowIndex && editable ? (
            <BaseFormComponent
              {...inputProps}
              inputProps={inputProps}
              key={rowIndex}
              size="small"
              inputType={inputType}
              value={editingValue ? editingValue : renderValue}
              autoFocus
              defaultOpen={true}
              onBlur={() => {
                this.setState({
                  editingRow: undefined,
                  editingCol: undefined,
                  editingValue: undefined,
                });
                let path = dataIndex;
                if (isArray(dataIndex)) {
                  path = join(dataIndex, '.');
                }
                const data = cloneDeep(dataSource);
                set(data, `${rowIndex}.${path}`, editingValue);
                onChange && onChange(data);
              }}
              onChange={this.handleItemChange({ dataIndex, inputType, rowIndex })}
            />
          ) : (
            <span
              className="custom-table-cell"
              onClick={() => {
                this.setState({
                  editingRow: rowIndex,
                  editingCol: dataIndex,
                  editingValue: value,
                });
              }}
            >
              {value}
            </span>
          );
        },
      };
    });
  };

  handleItemChange = ({ dataIndex, inputType, rowIndex }) => (event) => {
    let value = event;
    switch (inputType) {
      case 'input':
        value = get(event, 'target.value');
        break;
      case 'date':
      case 'single_date_picker':
        value = formatDate(value, 'YYYY-MM-DD');
        break;
      default:
        break;
    }
    this.setState({
      editingValue: value,
    });
  };

  handleAdd = () => {
    const { dataSource } = this.state;
    this.setState({
      dataSource: [
        ...dataSource,
        {
          key: Math.random(),
        },
      ],
    });
  };

  handleRowSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  handlePatchDelete = () => {
    const { selectedRowKeys, dataSource } = this.state;
    const newDataSource = filter(dataSource, (data) => indexOf(selectedRowKeys, data.key) === -1);
    this.setState({
      dataSource: newDataSource,
    });
  };

  render() {
    const { onChange } = this.props;
    const { dataSource, selectedRowKeys } = this.state;
    const columns = this.formatColumns(this.columns);
    return (
      <div className="pd-procedure">
        <div className="pd-procedure-normal">
          <Row>
            <Col span={6}>
              <Form.Item label="开始时间" {...layout}>
                <DatePicker_L
                  size="small"
                  format="HH:mm"
                  value={get(dataSource, '0.startTime') ? dayjs(get(dataSource, '0.startTime'), 'HH:mm') : null}
                  onChange={(value) => {
                    const startTime = dayjs(value).format('HH:mm').toString();
                    console.log(startTime);
                    const result = cloneDeep(dataSource);
                    set(result, '0.startTime', startTime);
                    onChange && onChange(result);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="结束时间" {...layout}>
                <DatePicker_L
                  size="small"
                  format="HH:mm"
                  value={get(dataSource, '0.endTime') ? dayjs(get(dataSource, '0.endTime'), 'HH:mm') : null}
                  onChange={(value) => {
                    const minutes = dayjs(value, 'HH:mm').diff(
                      dayjs(get(dataSource, '0.startTime'), 'HH:mm'),
                      'minutes',
                    );
                    const endTime = dayjs(value).format('HH:mm').toString();
                    const result = cloneDeep(dataSource);
                    set(result, '0.endTime', endTime);
                    set(result, '0.duration', minutes);
                    onChange && onChange(result);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="持续时间" {...layout}>
                <InputNumber
                  size="small"
                  value={get(dataSource, '0.duration')}
                  onChange={(value) => {
                    const result = cloneDeep(dataSource);
                    set(result, '0.duration', value);
                    onChange && onChange(result);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className="pd-procedure-table">
          <div className="pd-procedure-table__header">
            <Button onClick={this.handleAdd}>新增</Button>
            <Button disabled={isEmpty(selectedRowKeys)} onClick={this.handlePatchDelete}>
              删除
            </Button>
          </div>

          <Table
            rowSelection={{ selectedRowKeys, onChange: this.handleRowSelectChange }}
            size="small"
            bordered
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{
              x: '100vw',
            }}
          />
        </div>
      </div>
    );
  }
}
