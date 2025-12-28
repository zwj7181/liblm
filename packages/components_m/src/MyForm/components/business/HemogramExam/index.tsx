import { LazyAntd } from '@lm_fe/components';
import { cloneDeep, get, isEmpty, map, set } from 'lodash';
import React, { useEffect, useState } from 'react';
import BaseFormComponent from '../../../../BaseFormComponent';
import './index.less';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

const cols = [
  {
    dataIndex: 'name',
    title: '',
    align: 'center',
    editable: false,
    width: 120,
  },
  {
    dataIndex: 'wbc',
    title: 'WBC(x10⁹/L)',
    align: 'center',
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'rbc',
    title: 'RBC(x10¹²/L)',
    align: 'center',
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'hgb',
    title: 'HGB(g/L)',
    align: 'center',
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'hct',
    title: 'HCT',
    align: 'center',
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'plt',
    title: 'PLT(x10⁹/L)',
    align: 'center',
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'ret',
    title: '网织红(%)',
    align: 'center',
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'nrbc',
    title: '有核红(x10⁹/L)',
    align: 'center',
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'bilirubin',
    title: '胆红素(mmo/L)',
    align: 'center',
    editable: true,
    width: 100,
  },
  {
    dataIndex: 'coombs',
    title: "Coomb's",
    align: 'center',
    editable: true,
    width: 100,
  },
];
export default (props: any) => {
  const { onChange } = props;
  const [columns, setColumns] = useState(cols);
  const [datasource, setDatasource] = useState([]);

  useEffect(() => {
    console.log(props.value);
    const newDatasource = [
      {
        key: 'pdPreHemogram',
        name: '术前血象（胎）',
        wbc: get(props.value, 'pdPreHemogram.wbc'),
        rbc: get(props.value, 'pdPreHemogram.rbc'),
        hgb: get(props.value, 'pdPreHemogram.hgb'),
        hct: get(props.value, 'pdPreHemogram.hct'),
        plt: get(props.value, 'pdPreHemogram.plt'),
        ret: get(props.value, 'pdPreHemogram.ret'),
        nrbc: get(props.value, 'pdPreHemogram.nrbc'),
        bilirubin: get(props.value, 'pdPreHemogram.bilirubin'),
        coombs: get(props.value, 'pdPreHemogram.coombs'),
      },
      {
        key: 'pdPreHemogramBank',
        name: '术前血象（库血）',
        wbc: get(props.value, 'pdPreHemogramBank.wbc'),
        rbc: get(props.value, 'pdPreHemogramBank.rbc'),
        hgb: get(props.value, 'pdPreHemogramBank.hgb'),
        hct: get(props.value, 'pdPreHemogramBank.hct'),
        plt: get(props.value, 'pdPreHemogramBank.plt'),
        ret: get(props.value, 'pdPreHemogramBank.ret'),
        nrbc: get(props.value, 'pdPreHemogramBank.nrbc'),
        coombs: get(props.value, 'pdPreHemogramBank.coombs'),
        bilirubin: get(props.value, 'pdPreHemogramBank.bilirubin'),
      },
      {
        key: 'pdPostHemogram',
        name: '术后血象（胎）',
        wbc: get(props.value, 'pdPostHemogram.wbc'),
        rbc: get(props.value, 'pdPostHemogram.rbc'),
        hgb: get(props.value, 'pdPostHemogram.hgb'),
        hct: get(props.value, 'pdPostHemogram.hct'),
        plt: get(props.value, 'pdPostHemogram.plt'),
        ret: get(props.value, 'pdPostHemogram.ret'),
        nrbc: get(props.value, 'pdPostHemogram.nrbc'),
        coombs: get(props.value, 'pdPostHemogram.coombs'),
        bilirubin: get(props.value, 'pdPostHemogram.bilirubin'),
      },
    ];
    setDatasource(newDatasource);
    setColumns(updateColumns(columns));
  }, [props.value]);

  const updateColumns = (data) => {
    return map(data, (column, index) => {
      const { editable, inputType, dataIndex, inputProps, children } = column;
      if (!isEmpty(children)) {
        return {
          ...column,
          dataIndex,
          children: updateColumns(children),
        };
      }
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
      case 'input_number':
        value = event;
        break;
      default:
        break;
    }

    const outData = cloneDeep(props.value);
    if (rowIndex === 0) {
      set(outData, `pdPreHemogram.${dataIndex}`, value);
    } else if (rowIndex === 1) {
      set(outData, `pdPreHemogramBank.${dataIndex}`, value);
    } else if (rowIndex === 2) {
      set(outData, `pdPostHemogram.${dataIndex}`, value);
    }
    console.log(outData);
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
