import { cloneDeep, get, map, set } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import BaseFormComponent from '../../BaseFormComponent';
// import { getNewDatasource, cols } from './constant';
import { LazyAntd } from '@lm_fe/components';
import './index.less';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

const pdBloodGroups = ['bg', 'rh'];
const pdThalassemiaExams = ['hB', 'mCV', 'mCH', 'hbA2', 'deletions', 'otherNote'];
export default (props: any) => {
  const { onChange } = props;
  const [columns, setColumns] = useState<any[]>([]);
  const [datasource, setDatasource] = useState<any[]>([]);
  const cols = useRef<any[]>([]);
  const getNewDatasource = useRef<((arr: any[]) => any[]) | null>(null);



  useEffect(() => {
    if (getNewDatasource.current) {

      updateDatasource(props?.value)
      setColumns(updateColumns(cols.current));

    } else {
      import('./constant').then((meta) => {
        getNewDatasource.current = meta.getNewDatasource;
        cols.current = meta.cols;

        updateDatasource(props?.value)
        setColumns(updateColumns(cols.current));

      })
    }

  }, [props.value]);

  function updateDatasource(_value: any) {
    const newDatasource = getNewDatasource.current?.(_value) || [];
    setDatasource(newDatasource);
  }

  function updateColumns(_columns: any[]) {
    return map(_columns, (column, index) => {
      const { editable, inputType, dataIndex, inputProps } = column;
      if (!editable) {
        return column;
      }
      return {
        ...column,
        render: (value, rowData, rowIndex) => {
          return editable ? (
            <BaseFormComponent
              {...inputProps}
              key={rowIndex}
              size="small"
              inputType={inputType}
              value={value}
              onChange={handleChange({ dataIndex, inputType, rowIndex })}
            />
          ) : (
            value
          );
        },
      };
    });
  };

  const handleChange = ({ dataIndex, inputType, rowIndex }) => (event) => {
    let value = get(event, 'target.value');
    switch (inputType) {
      case 'select_tag_with_options':
      case 'normal_select':
      case 'input_number':
        value = event;
        break;
      default:
        break;
    }

    const outData = cloneDeep(props.value);
    if (pdThalassemiaExams.indexOf(dataIndex) > -1) {
      set(outData, `pdThalassemiaExams.${rowIndex}.${dataIndex}`, value);
    } else if (pdBloodGroups.indexOf(dataIndex) > -1) {
      set(outData, `pdBloodGroups.${rowIndex}.${dataIndex}`, value);
    }
    onChange && onChange(outData);
  };

  return (
    <Table
      size="small"
      className="blood-and-thalassemia"
      bordered
      columns={columns}
      dataSource={datasource}
      pagination={false}
    />
  );
};
