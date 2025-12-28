import { DatePicker_L, LazyAntd } from '@lm_fe/components';
import { AutoComplete, Form, Input } from 'antd';
import React from 'react';
import { ItemProps } from './index';

const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  key: string;
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'text' | 'date' | 'autoComplete' | 'select';
  record: ItemProps;
  index: number;
  children: React.ReactNode;
  options?: any[];
  value?: any;
}
const EditableCell: React.FC<EditableCellProps> = ({
  key,
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  value,
  ...restProps
}) => {
  let inputNode = (
    <Input
      onChange={(e) => {
        record[dataIndex] = e.target.value;
      }}
    />
  );
  switch (inputType) {
    case 'text':
      inputNode = (
        <Input
          onChange={(e) => {
            record[dataIndex] = e.target.value;
          }}
        />
      );
      break;
    case 'date':
      inputNode = (
        <DatePicker_L
          onChange={(date, dateString) => {
            record[dataIndex] = dateString;
          }}
        />
      );
      break;
    case 'autoComplete':
      inputNode = (
        <AutoComplete
          options={restProps.options}
          onChange={(data) => {
            record[dataIndex] = data;
          }}
        />
      );
      break;
    case 'select':
      inputNode = (
        <Select
          options={restProps.options}
          onChange={(data) => {
            record[dataIndex] = data;
          }}
        />
      );
      break;
    default:
      break;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex || key}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `请输入 ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
export default EditableCell;
