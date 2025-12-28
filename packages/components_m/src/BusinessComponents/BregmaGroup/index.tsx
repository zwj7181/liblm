import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import MultiplicationInput from './MultiplicationInput';
import styles from './index.less';
import { LazyAntd } from '@lm_fe/components';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd


export default function BregmaGroup({ name = 'bregma1+bregma2+bregma3', inputProps = [], ...rest }) {
  const names = name.split('+');
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const bregma = rest.form.getFieldValue(['childPhysicalExam', 'bregma']);
    setVisible(bregma === 2 ? true : false);
  }, []);

  const handleSelect = (val) => {
    setVisible(val === 2 ? true : false);
  };

  return (
    <Input.Group compact className={styles["bregma-group-wrapper"]}>
      <Form.Item noStyle rules={[{ required: false, message: '' }]} label="" name={names[0].split('.')}>
        <Select
          allowClear
          style={{ width: 128 }}
          placeholder="是否闭合"
          onSelect={handleSelect}
          options={[
            { value: 1, label: '闭合' },
            { value: 2, label: '未闭合' },
          ]}
        />
      </Form.Item>
      {visible && (
        <Form.Item noStyle rules={[{ required: false, message: '' }]} label="" name={names[1].split('.')}>
          <MultiplicationInput />
        </Form.Item>
      )}
      <Form.Item noStyle rules={[{ required: false, message: '' }]} label="" name={names[2].split('.')}>
        <Select
          allowClear
          style={{ width: 128 }}
          placeholder="请选择形状"
          options={[
            { value: 1, label: '平' },
            { value: 2, label: '隆起' },
            { value: 3, label: '凹陷' },
          ]}
        />
      </Form.Item>
    </Input.Group>
  );
}
