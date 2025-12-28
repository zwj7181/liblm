import { ExportOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { LazyAntd, RangePicker_L } from '@lm_fe/components';
import { Button, Form } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import React, { Component } from 'react';
import { tableColumns1, tableColumns2 } from './config/table';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd
const { Option } = Select;

export default class List extends Component {
  form: FormInstance | null = null;
  state = {
    selectedValue: '1',
  };
  handleSearch = (values = {}) => { };
  handleChange = (value: any) => {
    this.setState({ selectedValue: value });
  };
  handleReset = () => {
    this.form && this.form.resetFields();
    this.handleSearch(this.form?.getFieldsValue());
  };
  handleExport = async () => { };
  renderBtn = () => (
    <React.Fragment>
      <Button icon={<RedoOutlined />} onClick={this.handleReset}>
        重置
      </Button>
      <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
        查询
      </Button>
      <Button type="primary" icon={<ExportOutlined />} onClick={this.handleExport}>
        导出
      </Button>
    </React.Fragment>
  );
  render() {
    const { selectedValue } = this.state;
    console.log(this.state, 'state');
    return (
      <>
        <div className="base-list" style={{ height: '100%', overflow: 'auto', backgroundColor: '#fff' }}>
          <div className="global-base-table" id="global-base-table">
            <div className="global-base-table_title-query">
              <div className="global-query-form" style={{ paddingTop: 14, paddingBottom: 14 }}>
                <Form
                  autoComplete="off"
                  ref={(form) => {
                    this.form = form;
                  }}
                  layout="inline"
                  onFinish={this.handleSearch}
                >
                  <Form.Item label="建档日期" name="createDate">
                    <Select defaultValue={selectedValue} style={{ width: 150 }} onChange={this.handleChange}>
                      <Option value="1">按日期</Option>
                      <Option value="2">按年度</Option>
                      <Option value="3">按季度</Option>
                      <Option value="4">按月度</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="" name="date">
                    <RangePicker_L
                      picker={
                        selectedValue === '2'
                          ? 'year'
                          : selectedValue === '3'
                            ? 'quarter'
                            : selectedValue === '4'
                              ? 'month'
                              : 'date'
                      }
                      format="YYYY-MM-DD"
                      style={{ width: 216 }}
                    />
                  </Form.Item>
                  <Form.Item colon={false} label="" style={{ marginLeft: 12 }}>
                    <Button.Group>{this.renderBtn()}</Button.Group>
                  </Form.Item>
                </Form>
              </div>
              <div id="table-scrollContainer" className="global-base-table_table">
                <Table
                  bordered
                  size="middle"
                  className="global-base-table"
                  columns={tableColumns1}
                  dataSource={[]}
                  pagination={false}
                  style={{ marginTop: 32, marginBottom: 16 }}
                />
                <Table
                  bordered
                  size="middle"
                  className="global-base-table"
                  columns={tableColumns2}
                  dataSource={[]}
                  pagination={false}
                  style={{ marginBottom: 16 }}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
