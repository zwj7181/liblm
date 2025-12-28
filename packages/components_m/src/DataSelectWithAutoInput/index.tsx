import { AnyObject, request } from '@lm_fe/utils';
import { Col, Form, Input } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { filter } from 'lodash';
import React, { useEffect, useState } from 'react';
import { LazyAntd } from '@lm_fe/components';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd
interface IProps extends SelectProps<any> {
  labelKey?: string;
  valueKey?: string;
  method?: 'get' | 'post' | 'put';
  url?: string;
  dataSource?: AnyObject[];
  form?: any;
}
export default ({ method = 'get', dataSource = [], form, ...rest }: IProps) => {
  const Option = Select.Option;
  const [options, setOptions] = useState<AnyObject>(dataSource);
  useEffect(() => {
    request[method](`/api/listInpatientBedDoctor`).then((r) => {
      setOptions(r.data);
    });
  }, []);

  const handleSelect = (e) => {
    const bedDoctorNO = filter(options, (item) => {
      return item.bedDoctor == e;
    });
    form?.setFieldsValue({ bedDoctorNO: bedDoctorNO?.[0]?.bedDoctorNO });
  };

  return (
    <>
      <Select {...rest} onSelect={handleSelect}>
        {options &&
          options.map((_) => (
            <Option key={_['bedDoctor']} value={_['bedDoctor']}>
              {_['bedDoctor']}
            </Option>
          ))}
      </Select>
      <Col span={24} style={{ display: 'none' }}>
        <Form.Item label="管床医生号" name="bedDoctorNO" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Input type="text"></Input>
        </Form.Item>
      </Col>
    </>
  );
};
