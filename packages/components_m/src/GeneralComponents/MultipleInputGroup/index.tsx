import React from 'react';
import { get } from 'lodash';
import { Input, InputNumber, Form, AutoComplete } from 'antd';
import DatePicker from '../../GeneralComponents/DatePicker';
import styles from './index.less';
import { LazyAntd } from '@lm_fe/components';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd
const INPUTTYPE = {
  input: Input,
  input_number: InputNumber,
  select: Select,
  autoComplete: AutoComplete,
  datePicker: DatePicker,
};
function MultipleInputGroup({ name, inputProps = [], dict = [], ...rest }) {
  // const nameArr = name.split('+');
  React.useEffect(() => {
    // console.log('--------测试-----', rest);
  }, []);

  const renderInput = ({ type, options, ...props }) => {
    const Component = INPUTTYPE[type];
    let newProps = { ...props, options };
    if (Object.prototype.toString.call(options) === '[object String]') {
      const obj = dict.filter((_) => _.key === options)[0];
      newProps = {
        ...newProps,
        options: get(obj, 'enumerations'),
      };
    }
    return <Component style={{ width: 86 }} {...newProps} />;
  };

  return (
    <Input.Group compact className={styles["multiple-input-group-wrapper"]}>
      {inputProps.length &&
        inputProps.map((_) => {
          return (
            <Form.Item
              noStyle
              rules={[{ required: _.required, message: `请${_.props?.placeholder}!` }]}
              name={_.name && _.name.split('.')}
            >
              {renderInput({ ..._.props, type: _.type })}
            </Form.Item>
          );
        })}
    </Input.Group>
  );
}
export default MultipleInputGroup