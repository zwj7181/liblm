import React, { useState, useEffect } from 'react';
import { Input, InputNumber, Row, Col } from 'antd';
import { map, get, set, isEmpty } from 'lodash';
import { LazyAntd } from '@lm_fe/components';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

export interface IOption {
  label: string;
  value: string;
  key?: any;
}
interface IProps {
  value?: any;
  onChange?: any;
  selectedValueShowInput?: any;
  inputType?: 'string' | 'number';
  options?: IOption[];
}
export default (props: IProps) => {
  const {
    inputType = 'string',
    options: selectOptions,
    value,
    selectedValueShowInput,
    getPopupContainer = () => document.body,
  } = props;

  const [data, setData] = useState({});

  useEffect(() => {
    !isEmpty(value) && setData(value);
  }, [props.value]);

  const handleChange = (type: 'string' | 'number' | 'select' | undefined) => (e: any) => {
    const { onChange } = props;
    if (type === 'string') {
      set(data, 'input', get(e, 'target.value'));
    }
    if (type === 'number') {
      set(data, 'input', e);
    }
    if (type === 'select') {
      set(data, 'select', e);
      set(data, 'input', '');
    }

    setData(data);
    onChange && onChange(data);
  };

  return (
    <div>
      <Row>
        <Col span={11}>
          <Select
            onChange={handleChange('select')}
            placeholder="请选择..."
            value={get(data, 'select')}
            getPopupContainer={getPopupContainer}
          >
            {map(selectOptions, (option: IOption) => {
              return (
                <Select.Option key={option.key || option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              );
            })}
          </Select>
        </Col>
        {get(data, 'select') === selectedValueShowInput && (
          <Col span={11} offset={1}>
            {inputType === 'string' ? (
              <Input onChange={handleChange(inputType)} value={get(data, 'input')} placeholder="请输入..." />
            ) : (
              <InputNumber onChange={handleChange(inputType)} placeholder="请输入..." value={get(data, 'input')} />
            )}
          </Col>
        )}
      </Row>
    </div>
  );
};
