/*
 * @Author: ZhongJun
 * @Date: 2021-03-10 17:58:04
 * @Descriptions: 地贫筛查
 */
import { LazyAntd } from '@lm_fe/components';
import { CascaderAddress } from '@lm_fe/components_m';
import { Button, Form, Checkbox, Radio, Space } from 'antd';
import './index.less';
import React from 'react';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

const Item = Form.Item;
export default function Thalassemia() {
  const columns = [
    {
      title: '次数',
      dataIndex: 'index',
      width: 46,
      render: (text, record, index) => index + 1,
    },
    {
      title: '是否补录',
      dataIndex: 'isClearing',
      width: 86,
    },
    {
      title: '补助类型',
      dataIndex: 'grantType',
      width: 86,
    },
    {
      title: '筛查日期',
      dataIndex: 'date',
      width: 112,
    },
    {
      title: '结果录入日期',
      dataIndex: 'resultDate',
      width: 112,
    },
    {
      title: '登记人员',
      dataIndex: 'registrant',
      width: 86,
    },
    {
      title: '来源',
      dataIndex: 'source',
      width: 86,
    },
    {
      title: '婚登地',
      dataIndex: 'registrationAddress',
      width: 256,
    },
    {
      title: '操作',
      dataIndex: 'actions',
      width: 256,
    },
  ];

  const renderTitle = (record) => {
    return (
      <ul className="thalassemia-table-title">
        <li className="thalassemia-table-title-item">
          <span className="thalassemia-table-title-item-label colon">姓名</span>
          <span className="thalassemia-table-title-item-text">{record.name}</span>
        </li>
        <li className="thalassemia-table-title-item">
          <span className="thalassemia-table-title-item-label colon">性别</span>
          <span className="thalassemia-table-title-item-text ">{record.sex}</span>
        </li>
        <li className="thalassemia-table-title-item">
          <span className="thalassemia-table-title-item-label colon">证件号</span>
          <span className="thalassemia-table-title-item-text">{record.idNO}</span>
        </li>
        <li className="thalassemia-table-title-item">
          <span className="thalassemia-table-title-item-label">血红蛋白电泳接诊采血卡记录</span>
        </li>
      </ul>
    );
  };
  return (
    <div className="thalassemia-wrapper">
      <Form className="thalassemia-form" layout="inline" initialValues={{ source: 2 }}>
        <Item label="请选择要登记的对象" name="layout">
          <Checkbox.Group
            options={[
              { label: '男', value: 1 },
              { label: '女', value: 2 },
            ]}
          />
        </Item>
        <Item label="来源" name="source">
          <Radio.Group
            options={[
              { label: '婚前', value: 1 },
              { label: '孕前', value: 2 },
              { label: '孕期', value: 3 },
              { label: '临产', value: 4 },
            ]}
          />
        </Item>
        <Item label="补助类型" name="grantType">
          <Radio.Group
            options={[
              { label: '全免', value: 1 },
              { label: '补助', value: 2 },
              { label: '自费', value: 3 },
            ]}
          />
        </Item>
        <div style={{ width: '50%' }}>
          <Item label="婚登地址" name="registrationAddress">
            <CascaderAddress />
          </Item>
        </div>

        <Item style={{ width: '100%' }}>
          <Space>
            <Button type="primary">新增登记</Button>
            <Button type="primary">筛查结果补录</Button>
          </Space>
        </Item>
      </Form>

      <Space direction="vertical" className="thalassemia-table">
        <Table bordered size="middle" columns={columns} title={() => renderTitle({})} />
        <div />
        <Table bordered size="middle" columns={columns} title={() => renderTitle({})} />
      </Space>
    </div>
  );
}
