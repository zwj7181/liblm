import React from 'react';
import { get, map, size } from 'lodash';
import { APP_CONFIG } from '@lm_fe/env';
import { InputWithRange, PressureInput } from '@lm_fe/components_m';
import { IMyBaseList_ColumnType } from '@lm_fe/pages';

export const tableColumns = [
  {
    title: '姓名.',
    dataIndex: 'name',
    editable: false,
    width: APP_CONFIG.CELL_WIDTH_SMALL - 20,
    showSorter: false,
    ellipsis: true,
    inputProps: {
      disabled: true,
    },
  },
  {
    title: '就诊卡号',
    dataIndex: 'outpatientNO',
    editable: false,
    inputType: 'patient_auto_complete',
    inputProps: { urlPath: '/api/pregnancies' },
    rules: [{ required: true, message: '请输入就诊卡号' }],
    width: 120,
    sortType: 'number',
    ellipsis: true,
  },
  {
    title: () => (
      <span>
        血压-首测<em className="suffix">(mmHg)</em>
      </span>
    ),
    dataIndex: 'bloodPressure',
    editable: false,
    inputType: 'pressure',
    align: 'center',
    render: (value: any, rowData: any) => (
      <PressureInput
        value={get(rowData, 'physicalExamMeasure')}
        hiddenIpt={true}
        style={{ justifyContent: 'center' }}
      />
    ),
    width: APP_CONFIG.CELL_WIDTH_SMALL - 20,
    showSorter: false,
    showFilter: false,
  },
  {
    title: () => (
      <span>
        血压-二测<em className="suffix">(mmHg)</em>
      </span>
    ),
    dataIndex: 'bloodPressure2',
    editable: false,
    align: 'center',
    inputType: 'pressure',
    render: (value: any, rowData: any) => {
      const pressure = {
        systolic: get(rowData, 'physicalExamMeasure.systolic2'),
        diastolic: get(rowData, 'physicalExamMeasure.diastolic2'),
      };
      return <PressureInput value={pressure} hiddenIpt={true} style={{ justifyContent: 'center' }} />;
    },
    width: APP_CONFIG.CELL_WIDTH_SMALL - 20,
    showSorter: false,
    showFilter: false,
  },
  {
    title: () => (
      <span>
        血压-三测<em className="suffix">(mmHg)</em>
      </span>
    ),
    dataIndex: 'bloodPressure3',
    editable: false,
    inputType: 'pressure',
    align: 'center',
    render: (value: any, rowData: any) => {
      const pressure = {
        systolic: get(rowData, 'physicalExamMeasure.systolic3'),
        diastolic: get(rowData, 'physicalExamMeasure.diastolic3'),
      };
      return <PressureInput value={pressure} hiddenIpt={true} style={{ justifyContent: 'center' }} />;
    },
    width: APP_CONFIG.CELL_WIDTH_SMALL - 20,
    showSorter: false,
    showFilter: false,
  },
  {
    title: () => (
      <>
        <p>身高</p>
        <p className="suffix">(cm)</p>
      </>
    ),
    dataIndex: ['physicalExamMeasure', 'height'],
    editable: false,
    inputType: 'input_with_label',
    inputProps: { min: 0, type: 'number' },
    width: 50,
    render: (value: any) => value || '',
    sortType: 'number',
    showFilter: false,
    align: 'center',
  },
  {
    title: () => (
      <>
        <p>体重</p>
        <p className="suffix">(kg)</p>
      </>
    ),
    dataIndex: ['physicalExamMeasure', 'weight'],
    editable: false,
    inputType: 'input_with_label',
    inputProps: { min: 0, type: 'number' },
    width: 50,
    render: (value: any) => value || '',
    sortType: 'number',
    showFilter: false,
    align: 'center',
  },
  {
    title: () => (
      <>
        <p>脉搏</p>
        <p className="suffix">(bpm)</p>
      </>
    ),
    dataIndex: ['physicalExamMeasure', 'pulse'],
    editable: false,
    inputType: 'input_with_range',
    inputProps: { min: 60, max: 100, tip: '脉搏的正常范围值是60~100bpm' },
    width: 50,
    render: (value: any) => (
      <InputWithRange value={value} min={60} max={100} hiddenIpt={true} style={{ display: 'block' }} />
    ),
    sortType: 'number',
    showFilter: false,
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    editable: false,
    rules: [{ required: true, message: '请输入创建时间' }],
    width: APP_CONFIG.CELL_WIDTH_SMALL - 20,
    inputType: 'single_date_picker',
    sortType: 'date',
  },
  {
    title: '宫高',
    dataIndex: ['gynecologicalExamMeasure', 'fundalHeight'],
    width: 45,
    align: 'center',
  },
  {
    title: '腹围',
    dataIndex: ['gynecologicalExamMeasure', 'waistHip'],
    width: 45,
    align: 'center',
  },
  {
    title: '衔接',
    dataIndex: ['gynecologicalExamMeasure', 'engagement'],
    width: 60,
    align: 'center',
  },
  {
    title: '胎心率',
    dataIndex: 'fetusesMeasure',
    render: (value: any) => {
      let str = '';
      if (size(value) === 1) {
        str = get(value, '0.fetalHeartRate');
      } else {
        map(value, (item) => (str += `${item.fetalHeartRate || '--'};`));
      }
      return str;
    },
    width: 60,
  },
  {
    title: '位置',
    dataIndex: 'fetusesMeasure',
    render: (value: any) => {
      let str = '';
      if (size(value) === 1) {
        str = get(value, '0.fetalPosition');
      } else {
        map(value, (item) => (str += `${item.fetalPosition || '--'};`));
      }
      return str;
    },
    width: 60,
  },
  {
    title: '胎方位',
    dataIndex: 'fetusesMeasure',
    render: (value: any) => {
      let str = '';
      if (size(value) === 1) {
        str = get(value, '0.position');
      } else {
        map(value, (item) => (str += `${item.position || '--'};`));
      }
      return str;
    },
    width: 68,
  },
  {
    title: '先露',
    dataIndex: 'fetusesMeasure',
    render: (value: any) => {
      let str = '';
      if (size(value) === 1) {
        str = get(value, '0.presentation');
      } else {
        map(value, (item) => (str += `${item.presentation || '--'};`));
      }
      return str;
    },
    width: 68,
  },
];

export const searchConfig: IMyBaseList_ColumnType[] = [
  { label: '就诊卡号', inputType: 'input', name: 'outpatientNO', },
  { label: '体检日期', inputType: 'rangeDate', name: 'createDate', },
]