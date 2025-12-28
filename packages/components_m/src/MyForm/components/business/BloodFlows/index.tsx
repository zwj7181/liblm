import { LazyAntd } from '@lm_fe/components';
import { formatDate } from '@lm_fe/utils';
import { cloneDeep, get, isEmpty, map, set } from 'lodash';
import dayjs from 'dayjs';
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
    dataIndex: 'checkDate',
    title: '日期',
    align: 'center',
    editable: true,
    inputType: 'single_date_picker',
    width: 120,
  },
  {
    dataIndex: 'ua',
    title: 'UA',
    align: 'center',
    children: [
      {
        dataIndex: 'uaEdf',
        title: 'EDF',
        align: 'center',
        editable: true,
        width: 80,
      },
      {
        dataIndex: 'uaPi',
        title: 'PI',
        align: 'center',
        editable: true,
        width: 80,
      },
      {
        dataIndex: 'uaRi',
        title: 'RI',
        align: 'center',
        editable: true,
        width: 80,
      },
      {
        dataIndex: 'uaSdratio',
        title: 'S/D',
        align: 'center',
        editable: true,
        width: 80,
      },
    ],
  },
  {
    dataIndex: 'dv',
    title: 'DV',
    align: 'center',
    editable: true,
    width: 80,
  },
  {
    dataIndex: 'mca',
    title: 'MCA',
    align: 'center',
    width: 80,
    children: [
      {
        dataIndex: 'mcaPsv',
        title: 'PSV(cm/s)',
        align: 'center',
        inputType: 'input',
        editable: true,
        width: 80,
      },
      {
        dataIndex: 'mcaPi',
        title: 'PI',
        align: 'center',
        inputType: 'input',
        editable: true,
        width: 80,
      },
      {
        dataIndex: 'mcaRi',
        title: 'RI',
        align: 'center',
        editable: true,
        inputType: 'input',
        width: 80,
      },
      {
        dataIndex: 'mcaSdratio',
        title: 'S/D',
        align: 'center',
        editable: true,
        width: 200,
      },
    ],
  },
];
export default (props: any) => {
  const { onChange } = props;
  const [columns, setColumns] = useState(cols);
  const [datasource, setDatasource] = useState([]);

  useEffect(() => {
    const newDatasource = [
      {
        key: 'pdPreBloodFlows',
        name: '术前血流',
        checkDate: get(props.value, 'pdPreBloodFlows.0.checkDate'),
        uaEdf: get(props.value, 'pdPreBloodFlows.0.uaEdf'),
        uaPi: get(props.value, 'pdPreBloodFlows.0.uaPi'),
        uaRi: get(props.value, 'pdPreBloodFlows.0.uaRi'),
        uaSdratio: get(props.value, 'pdPreBloodFlows.0.uaSdratio'),
        dv: get(props.value, 'pdPreBloodFlows.0.dv'),
        mcaPsv: get(props.value, 'pdPreBloodFlows.0.mcaPsv'),
        mcaPi: get(props.value, 'pdPreBloodFlows.0.mcaPi'),
        mcaRi: get(props.value, 'pdPreBloodFlows.0.mcaRi'),
        mcaSdratio: get(props.value, 'pdPreBloodFlows.0.mcaSdratio'),
      },
      {
        key: 'pdPostBloodFlows',
        name: '术后血流',
        uaEdf: get(props.value, 'pdPostBloodFlows.0.uaEdf'),
        checkDate: get(props.value, 'pdPostBloodFlows.0.checkDate'),
        uaPi: get(props.value, 'pdPostBloodFlows.0.uaPi'),
        uaRi: get(props.value, 'pdPostBloodFlows.0.uaRi'),
        uaSdratio: get(props.value, 'pdPostBloodFlows.0.uaSdratio'),
        dv: get(props.value, 'pdPostBloodFlows.0.dv'),
        mcaPsv: get(props.value, 'pdPostBloodFlows.0.mcaPsv'),
        mcaPi: get(props.value, 'pdPostBloodFlows.0.mcaPi'),
        mcaRi: get(props.value, 'pdPostBloodFlows.0.mcaRi'),
        mcaSdratio: get(props.value, 'pdPostBloodFlows.0.mcaSdratio'),
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
          let renderValue = value;
          if (['single_date_picker'].indexOf(inputType) > -1) {
            renderValue = value ? dayjs(value, 'YYYY-MM-DD') : dayjs();
          }
          return editable ? (
            <BaseFormComponent
              {...inputProps}
              key={rowIndex}
              size="small"
              inputType={inputType}
              value={renderValue}
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
      case 'date':
      case 'single_date_picker':
        value = formatDate(event);
        break;
      default:
        break;
    }

    const outData = cloneDeep(props.value);
    if (rowIndex === 0) {
      set(outData, `pdPreBloodFlows.0.${dataIndex}`, value);
    } else if (rowIndex === 1) {
      set(outData, `pdPostBloodFlows.0.${dataIndex}`, value);
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
