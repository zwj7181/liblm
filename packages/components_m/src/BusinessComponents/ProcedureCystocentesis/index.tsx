import { LazyAntd } from '@lm_fe/components';
import { formatDate } from '@lm_fe/utils';
import { Button, Col, Form, Input, Row } from 'antd';
import { cloneDeep, filter, get, indexOf, isArray, isEmpty, isEqual, isNil, join, map, set } from 'lodash';
import dayjs from 'dayjs';
import React, { Component } from 'react';
import BaseFormComponent from '../../BaseFormComponent';
import { TimePickerAutoaccept } from '../../BusinessComponents/TimePickerAutoaccept';
import { HOURS, MINUTES } from '../../ConfigComponents/ProcedureRecords';
import { getDictionariesEnumerations } from '../../utils';
import { cystocentesisColumns, tableColumns } from './config/table';
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
class Cystocentesis extends Component {
  columns: any;
  value: any;

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      bloodFlowsDataSource: [],
      hemogramExamDataSource: [],
      selectedRowKeys: [],
      editingCol: undefined,
      editingRow: undefined,
      editingValue: undefined,
      editingTable: undefined,
    };
    this.columns = tableColumns;
    this.value = get(props, 'value') || {};
  }

  componentDidMount() {
    this.initData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props;
    if (!isEqual(prevProps.value, value)) {
      this.initData();
    }
  }

  initData = () => {
    const { value } = this.props;
    const bloodFlowsDataSource = [];
    const hemogramExamDataSource = [];
    this.value = value;
    for (let i = 0; i < get(value, 'pdPreMeasurements.length'); i++) {
      if (i > get(value, 'pdPreMeasurements.length') - 1) {
        break;
      }
      bloodFlowsDataSource.push({
        ...get(value, `pdPreMeasurements.${i}`),
        name: `${get(value, `pdProcedures.${i}.object`) || ''}术前`,
        key: get(value, `pdPreMeasurements.${i}.key`) || 'pdPreMeasurements' + get(value, `pdPreMeasurements.${i}.id`),
      });
      bloodFlowsDataSource.push({
        ...get(value, `pdPostMeasurements.${i}`),
        name: `${get(value, `pdProcedures.${i}.object`) || ''}术后`,
        key:
          get(value, `pdPostMeasurements.${i}.key`) || 'pdPostMeasurements' + get(value, `pdPostMeasurements.${i}.id`),
      });
    }

    for (let i = 0; i < get(value, 'pdPreHemograms.length'); i++) {
      if (i > get(value, 'pdPreHemograms.length') - 1) {
        break;
      }
      hemogramExamDataSource.push({
        ...get(value, `pdPreHemograms.${i}`),
        name: `${get(value, `pdProcedures.${i}.object`) || ''}术前血象（胎）`,
        key: get(value, `pdPreHemograms.${i}.key`) || 'pdPreHemograms' + get(value, `pdPreHemograms.${i}.id`),
      });
      hemogramExamDataSource.push({
        ...get(value, `pdPreHemogramBanks.${i}`),
        name: `${get(value, `pdProcedures.${i}.object`) || ''}术前血象（库血）`,
        key:
          get(value, `pdPreHemogramBanks.${i}.key`) || 'pdPreHemogramBanks' + get(value, `pdPreHemogramBanks.${i}.id`),
      });
      hemogramExamDataSource.push({
        ...get(value, `pdPostHemograms.${i}`),
        name: `${get(value, `pdProcedures.${i}.object`) || ''}术后血象（胎）`,
        key: get(value, `pdPostHemograms.${i}.key`) || 'pdPostHemograms' + get(value, `pdPostHemograms.${i}.id`),
      });
    }
    this.setState({
      dataSource: map(get(value, 'pdProcedures'), (item) => ({ ...item, key: get(item, 'key') || get(item, 'id') })),
      bloodFlowsDataSource,
      hemogramExamDataSource,
    });
  };

  formatColumns = (tableName) => (columns: any) => {
    const { editingCol, editingRow, editingTable } = this.state;

    return map(columns, (column) => {
      const { editable, inputType, dataIndex, inputProps, children, width } = column;
      if (!isEmpty(children)) {
        return {
          ...column,
          width: width,
          children: this.formatColumns(tableName)(children),
        };
      }
      if (!editable) {
        return column;
      }
      return {
        ...column,
        render: (value, rowData, rowIndex) => {
          let renderValue = value;
          let tableValue = value;
          if (['single_date_picker'].indexOf(inputType) > -1) {
            renderValue = value ? dayjs(value, 'YYYY-MM-DD') : dayjs();
          }
          if (inputType === 'dictionary_select_in_table') {

            const options = getDictionariesEnumerations(get(inputProps, 'uniqueKey'));
            map(options, (item) => {
              if (get(item, 'value') == value) tableValue = get(item, 'label');
            });
          }
          return editingTable === tableName && editingCol === dataIndex && editingRow === rowIndex && editable ? (
            <BaseFormComponent
              {...inputProps}
              inputProps={inputProps}
              key={rowIndex}
              size="small"
              inputType={inputType}
              defaultValue={renderValue}
              autoFocus
              defaultOpen={true}
              onBlur={this.handleBlur({ tableName, dataIndex, inputType, rowIndex })}
              onChange={this.handleItemChange({ tableName, dataIndex, inputType, rowIndex })}
            />
          ) : (
            <span
              className="custom-table-cell"
              onClick={() => {
                this.setState({
                  editingRow: rowIndex,
                  editingCol: dataIndex,
                  editingValue: value,
                  editingTable: tableName,
                });
              }}
            >
              {tableValue}
            </span>
          );
        },
      };
    });
  };

  handleBlur =
    ({ tableName, dataIndex, inputType, rowIndex }) =>
      () => {
        const { onChange } = this.props;
        const { editingCol, editingRow, editingValue, editingTable } = this.state;

        this.setState({
          editingRow: undefined,
          editingCol: undefined,
          editingValue: undefined,
          editingTable: undefined,
        });
        let path = dataIndex;
        if (isArray(dataIndex)) {
          path = join(dataIndex, '.');
        }
        const data = cloneDeep(this.value);
        // set(data, `${rowIndex}.${path}`, editingValue);

        if (tableName === 'procedure') {
          set(data, `pdProcedures.${rowIndex}.${path}`, editingValue);
        } else if (tableName === 'bloodFlows') {
          if (rowIndex % 2 === 0) {
            set(data, `pdPreMeasurements.${Math.floor(rowIndex / 2)}.${path}`, editingValue);
          } else {
            set(data, `pdPostMeasurements.${Math.floor(rowIndex / 2)}.${path}`, editingValue);
          }
        } else if (tableName === 'hemogramExam') {
          if (rowIndex % 3 === 0) {
            set(data, `pdPreHemograms.${Math.floor(rowIndex / 3)}.${path}`, editingValue);
          } else if (rowIndex % 3 === 1) {
            set(data, `pdPreHemogramBanks.${Math.floor(rowIndex / 3)}.${path}`, editingValue);
          } else if (rowIndex % 3 === 2) {
            set(data, `pdPostHemograms.${Math.floor(rowIndex / 3)}.${path}`, editingValue);
          }
        }
        // console.log(data);
        onChange && onChange(data);
      };

  handleItemChange =
    ({ tableName, dataIndex, inputType, rowIndex }) =>
      (event) => {
        let value = get(event, 'target.value');
        switch (inputType) {
          case 'select_tag_with_options':
          case 'normal_select':
          case 'tree_select':
          case 'select_with_no':
          case 'select_with_options_or_input':
          case 'dictionary_select_in_table':
            value = event;
            break;
          case 'date':
          case 'single_date_picker':
            value = formatDate(event);
            break;
          default:
            break;
        }
        this.setState({
          editingValue: value,
          editingTable: tableName,
        });
      };

  handleAdd = () => {
    const { onChange } = this.props;
    const { dataSource, bloodFlowsDataSource } = this.state;
    const value = this.value;
    const newPdProcedure = {
      key: Math.random(),
    };
    const pdPreBloodFlow = {
      key: Math.random(),
      name: '术前',
      checkDate: dayjs().format('YYYY-MM-DD'),
    };
    const pdPostBloodFlow = {
      key: Math.random(),
      name: '术后',
      checkDate: dayjs().format('YYYY-MM-DD'),
    };
    this.setState({
      dataSource: [...dataSource, newPdProcedure],
      bloodFlowsDataSource: [...bloodFlowsDataSource, pdPreBloodFlow, pdPostBloodFlow],
    });
    const outData = {
      pdProcedures: [...(get(value, 'pdProcedures') || []), newPdProcedure],
      pdPreMeasurements: [...(get(value, 'pdPreMeasurements') || []), pdPreBloodFlow],
      pdPostMeasurements: [...(get(value, 'pdPostMeasurements') || []), pdPostBloodFlow],
    };
    onChange && onChange(outData);
    return outData;
  };

  handleRowSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  handlePatchDelete = () => {
    const { onChange } = this.props;
    const { selectedRowKeys, dataSource, bloodFlowsDataSource, hemogramExamDataSource } = this.state;
    const pdProcedures = filter(dataSource, (data) => indexOf(selectedRowKeys, data.key) === -1);
    let newBloodFlowsDataSource: any = [];
    let newHemogramExamDataSource: any = [];
    map(dataSource, (pdProcedure, rowIndex) => {
      if (selectedRowKeys.indexOf(get(pdProcedure, 'key')) === -1) {
        newBloodFlowsDataSource.push(bloodFlowsDataSource[rowIndex]);
        newBloodFlowsDataSource.push(bloodFlowsDataSource[rowIndex + 1]);
        newHemogramExamDataSource.push(bloodFlowsDataSource[rowIndex]);
        newHemogramExamDataSource.push(bloodFlowsDataSource[rowIndex + 1]);
        newHemogramExamDataSource.push(bloodFlowsDataSource[rowIndex + 2]);
      }
    });

    const pdPreMeasurements = filter(newBloodFlowsDataSource, (data, key) => Number(key) % 2 === 0);
    const pdPostMeasurements = filter(newBloodFlowsDataSource, (data, key) => Number(key) % 2 === 1);
    const pdPreHemograms = filter(newHemogramExamDataSource, (data, key) => Number(key) % 3 === 0);
    const pdPostHemograms = filter(newHemogramExamDataSource, (data, key) => Number(key) % 3 === 1);
    const pdPreHemogramBanks = filter(newHemogramExamDataSource, (data, key) => Number(key) % 3 === 2);
    this.setState({
      dataSource: pdProcedures,
      bloodFlowsDataSource: newBloodFlowsDataSource,
      hemogramExamDataSource: newHemogramExamDataSource,
    });
    onChange &&
      onChange({
        pdProcedures,
        pdPreMeasurements,
        pdPostMeasurements,
        pdPreHemograms,
        pdPreHemogramBanks,
        pdPostHemograms,
      });
  };

  handleOutBaseData = async (keys, values) => {
    const { onChange } = this.props;
    const { dataSource } = this.state;
    let outData = this.value;
    let newDataSource = dataSource;
    if (isEmpty(dataSource) || isNil(dataSource)) {
      outData = await this.handleAdd();
      newDataSource = [
        {
          key: Math.random(),
        },
      ];
    } else {
    }
    map(keys, (key, index) => {
      set(outData, `pdProcedures.0.${key}`, values[index]);
      set(newDataSource[0], key, values[index]);
    });
    this.setState({
      dataSource: newDataSource,
    });
    onChange && onChange(outData);
    this.forceUpdate();
  };

  render() {
    const { dataSource, selectedRowKeys, bloodFlowsDataSource } = this.state;
    const newProcedureColumns = this.formatColumns('procedure')(this.columns);
    const newCystocentesisColumns = this.formatColumns('bloodFlows')(cystocentesisColumns);
    return (
      <div className="pd-procedure">
        <div className="pd-procedure-normal">
          <Row>
            <Col span={8}>
              <Form.Item label="开始时间" {...layout}>
                <TimePickerAutoaccept
                  format="HH:mm"
                  disabledHours={() => {
                    const endTime = get(dataSource, '0.endTime') ? dayjs(get(dataSource, '0.endTime'), 'HH:mm') : null;
                    if (endTime) {
                      const h = endTime.hour();
                      return HOURS.slice(h + 1, HOURS.length);
                    }
                    return [];
                  }}
                  disabledMinutes={(selectedHour) => {
                    const endTime = get(dataSource, '0.endTime') ? dayjs(get(dataSource, '0.endTime'), 'HH:mm') : null;
                    if (endTime) {
                      if (selectedHour < endTime.hour()) return [];
                      const m = endTime.minute();
                      return MINUTES.slice(m + 1, MINUTES.length);
                    }
                    return [];
                  }}
                  value={get(dataSource, '0.startTime') ? dayjs(get(dataSource, '0.startTime'), 'HH:mm') : null}
                  onChange={(value) => {
                    const duration = get(dataSource, '0.endTime')
                      ? dayjs(get(dataSource, '0.endTime'), 'HH:mm').diff(dayjs(value, 'HH:mm'), 'minutes')
                      : 0;
                    const startTime = value ? dayjs(value).format('HH:mm').toString() : null;
                    this.handleOutBaseData(['startTime', 'duration'], [startTime, duration]);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="结束时间" {...layout}>
                <TimePickerAutoaccept
                  format="HH:mm"
                  disabledHours={() => {
                    const startTime = get(dataSource, '0.startTime')
                      ? dayjs(get(dataSource, '0.startTime'), 'HH:mm')
                      : null;
                    if (startTime) {
                      const h = startTime.hour();
                      return HOURS.slice(0, h);
                    }
                    return [];
                  }}
                  disabledMinutes={(selectedHour) => {
                    const startTime = get(dataSource, '0.startTime')
                      ? dayjs(get(dataSource, '0.startTime'), 'HH:mm')
                      : null;
                    if (startTime) {
                      if (selectedHour > startTime.hour()) return [];
                      const m = startTime.minute();
                      return MINUTES.slice(0, m + 1);
                    }
                    return [];
                  }}
                  value={get(dataSource, '0.endTime') ? dayjs(get(dataSource, '0.endTime'), 'HH:mm') : null}
                  onChange={(value) => {
                    const duration = get(dataSource, '0.startTime')
                      ? dayjs(value, 'HH:mm').diff(dayjs(get(dataSource, '0.startTime'), 'HH:mm'), 'minutes')
                      : 0;
                    const endTime = value ? dayjs(value).format('HH:mm').toString() : null;
                    this.handleOutBaseData(['endTime', 'duration'], [endTime, duration]);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="持续时间(分)" {...layout}>
                <Input disabled value={get(dataSource, '0.duration') || 0} />
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
            columns={newProcedureColumns}
            dataSource={dataSource}
            pagination={false}
            scroll={{
              x: 1500,
            }}
          />
          <br />
          <Table
            size="small"
            className="blood-and-thalassemia"
            bordered
            columns={newCystocentesisColumns}
            dataSource={bloodFlowsDataSource}
            pagination={false}
          />
          {/* <br />
          <Table
            size="small"
            className="blood-and-thalassemia"
            bordered
            columns={newHemogramExamColumns}
            dataSource={hemogramExamDataSource}
            pagination={false}
          /> */}
        </div>
      </div>
    );
  }
}
export default Cystocentesis
