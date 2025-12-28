import { LazyAntd } from '@lm_fe/components';
import { cloneDeep, get, map, set } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import BaseFormComponent from '../../BaseFormComponent';
import styles from './index.less';

const pdBloodGroups = ['bg', 'rh'];
const pdThalassemiaExams = ['hB', 'mCV', 'mCH', 'hbA2', 'deletions', 'otherNote'];
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

export default (props: any) => {
  const { onChange } = props;
  const [columns, setColumns] = useState<any[]>([]);
  const [editingRow, setEditingRow] = useState();
  const [editingValue, setEditingValue] = useState();
  const [editingCol, setEditingCol] = useState();
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

  }, [props.value, editingRow, editingCol, editingValue]);

  function updateDatasource(_value: any) {
    const newDatasource = getNewDatasource.current?.(_value) || [];
    setDatasource(newDatasource);
  }


  const updateColumns = (_columns: any[]) => {
    return map(_columns, (column, index) => {
      const { editable, inputType, dataIndex, inputProps } = column;
      if (!editable) {
        return column;
      }
      return {
        ...column,
        render: (value, rowData, rowIndex) => {
          if (['normal_select', 'select_tag_with_options'].indexOf(inputType) > -1) {
            return (
              <BaseFormComponent
                {...inputProps}
                key={rowIndex}
                size="small"
                value={value}
                inputType={inputType}
                autoFocus={editingCol === dataIndex}
                // onBlur={handleBlur}
                onChange={handleChange({ dataIndex, inputType, rowIndex })}
              />
            );
          }
          return editingCol === dataIndex && editingRow === rowIndex && editable ? (
            <BaseFormComponent
              {...inputProps}
              key={rowIndex}
              size="small"
              defaultValue={value}
              inputType={inputType}
              autoFocus={editingCol === dataIndex}
              onBlur={handleBlur}
              onChange={handleChange({ dataIndex, inputType, rowIndex })}
            />
          ) : (
            <span
              className={styles["custom-table-cell"]}
              onClick={() => {
                setEditingRow(rowIndex);
                setEditingCol(dataIndex);
                setEditingValue(value);
              }}
            >
              {value}
            </span>
          );
        },
      };
    });
  };

  const handleBlur = () => {
    const outData = cloneDeep(props.value);
    if (pdThalassemiaExams.indexOf(editingCol) > -1) {
      set(outData, `pdThalassemiaExams.${editingRow}.${editingCol}`, editingValue);
    } else if (pdBloodGroups.indexOf(editingCol) > -1) {
      set(outData, `pdBloodGroups.${editingRow}.${editingCol}`, editingValue);
    }
    onChange && onChange(outData);
    setEditingRow(undefined);
    setEditingCol(undefined);
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
    setEditingRow(rowIndex);
    setEditingCol(dataIndex);
    setEditingValue(value);
    if (['normal_select', 'select_tag_with_options'].indexOf(inputType) > -1) {
      const outData = cloneDeep(props.value);
      if (pdThalassemiaExams.indexOf(dataIndex) > -1) {
        set(outData, `pdThalassemiaExams.${rowIndex}.${dataIndex}`, value);
      } else if (pdBloodGroups.indexOf(dataIndex) > -1) {
        set(outData, `pdBloodGroups.${rowIndex}.${dataIndex}`, value);
      }
      onChange && onChange(outData);
    }
  };

  return (
    <Table
      size="small"
      className={styles["blood-and-thalassemia"]}
      bordered
      columns={columns}
      dataSource={datasource}
      pagination={false}
    />
  );
};
