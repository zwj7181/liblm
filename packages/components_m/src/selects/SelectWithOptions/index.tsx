import React, { useState, useEffect } from 'react';
import { Input, Row, Col } from 'antd';
import { get, map, join, set, split, compact, indexOf } from 'lodash';
import { safe_json_parse } from '@lm_fe/utils';
import { LazyAntd } from '@lm_fe/components';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

interface IProps {
  config: {};
  value?: any;
  onChange?: any;
}
interface IOption {
  value: string;
  label: string;
}
export default (props: IProps) => {
  const [data, setData] = useState([]);
  const [showOther, setShowOther] = useState(false);
  const [otherNote, setOtherNote] = useState('');
  const [dataResponse, setDataResponse] = useState({});
  const config = get(props, 'config.specialConfig') ?? safe_json_parse(get(props, 'config.special_config'))
  const options = get(config, 'options') || [];

  useEffect(() => {
    const { value } = props;
    // 字符串形式，如丈夫疾病史
    if (get(config, 'type') === 'string') {
      setData(compact(split(value, ',')));
      // 对象形式，如孕妇疾病史
    } else if (get(config, 'type') === 'object') {
      const selectedArray: any = map(options, (option: IOption) => {
        if (get(value, option.value)) {
          return option.value;
        }
      });
      if (get(config, 'needShowOther') && indexOf(selectedArray, 'other') > -1) {
        setShowOther(true);
        setOtherNote(get(value, 'otherNote'));
      }
      setData(compact(selectedArray));
      // 数组形式，如分娩方式、不良生育史
    } else if (get(config, 'type') === 'array') {
      setData(value);
    }
  }, [props.value]);

  const handleChange = (selectedArray: any) => {
    const { onChange } = props;
    // eslint-disable-next-line no-shadow
    let dataResponse: any = null;
    if (get(config, 'type') === 'string') {
      dataResponse = join(selectedArray, ',');
    } else if (get(config, 'type') === 'object') {
      dataResponse = {};
      if (get(config, 'mode') === 'single') {
        set(dataResponse, selectedArray, true);
      } else {
        map(selectedArray, (selectedDisease) => {
          set(dataResponse, selectedDisease, true);
        });
      }
      if (get(config, 'needShowOther') && indexOf(selectedArray, 'other') > -1) {
        setShowOther(true);
        setDataResponse(dataResponse);
      } else {
        setShowOther(false);
        setOtherNote('');
      }
    } else if (get(config, 'type') === 'array') {
      dataResponse = selectedArray;
    }
    setData(selectedArray);
    onChange && onChange(dataResponse);
  };

  const handleInputChange = (e: any) => {
    const { onChange } = props;
    setOtherNote(e.target.value);
    if (get(config, 'type') === 'object') {
      onChange &&
        onChange({
          ...dataResponse,
          otherNote,
        });
    }
  };

  return (
    <Row>
      <Select allowClear mode={get(config, 'mode')} value={data} onChange={handleChange} {...get(props, 'config.inputProps')}>
        {map(options, (option) => {
          return (
            <Select.Option key={get(option, 'value')} value={get(option, 'value')}>
              {get(option, 'label') || get(option, 'value')}
            </Select.Option>
          );
        })}
      </Select>
      {showOther && <Input placeholder="其它" value={otherNote} onChange={handleInputChange} />}
    </Row>
  );
};
