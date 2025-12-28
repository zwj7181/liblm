/**
 * 宫缩抑制剂静脉滴注观察护理记录
 */
import { mchcEnv } from '@lm_fe/env';
import { formatDateTimeNoSecond, } from '@lm_fe/utils';
import { MODAL_TEMPLATE_TYPES } from '@lm_fe/env';
import dayjs from 'dayjs';
import { MyPressure } from '../../../FU_components/PressureInput';
import { APP_CONFIG } from '../../../utils/constants';
export const tableColumns: any = [
  {
    title: '日期',
    dataIndex: 'recordTime',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    fixed: 'left',

    editable: true,
    inputType: 'DateTimeInput',
    inputProps: {
      showTime: true,
      format: formatDateTimeNoSecond.format,
      setDefaultValue: true,
    },
    defaultValue: {
      boolean: true,
      type: 'dataTime',
    },
    render: formatDateTimeNoSecond,
  },
  {
    title: '药物名称',
    dataIndex: 'medicine',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_TINY,
    inputType: 'MyInput',

    editable: true,
  },
  {
    title: '心率（次/min）',
    dataIndex: 'pulse',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_TINY,
    editable: true,
    inputType: 'InputNumber',
    render: (value: any) =>
      value &&
      (value > 100 ? (
        <div style={{ color: 'red' }}>{value}</div>
      ) : value < 60 ? (
        <div style={{ color: 'red' }}>{value}</div>
      ) : (
        `${value}`
      )),
  },
  mchcEnv.is('广三') ?

    {
      title: '血压(mmHg)',
      align: 'center',
      dataIndex: 'bp',
      editable: true,
      inputType: 'MyPressure',
      inputProps: { isPop: false },
      width: APP_CONFIG.CELL_WIDTH_SMALL,
      render: (value: any) => {

        return MyPressure.DisplayFC ? <MyPressure.DisplayFC value={value} /> : null
      }
    } :
    {
      title: '血压（mmHg）',
      dataIndex: 'lic',
      align: 'center',

      children: [
        {
          title: '收缩压(mmHg)',
          dataIndex: 'systolic',
          editable: true,
          align: 'center',
          inputType: 'input_number',
          inputProps: { type: 'number', min: 0, minValue: 90, maxValue: 130 },
          width: 126,
          render: (value: any) =>
            value &&
            (value > 130 ? (
              <div style={{ color: 'red' }}>{value}</div>
            ) : value < 90 ? (
              <div style={{ color: 'red' }}>{value}</div>
            ) : (
              `${value}`
            )),
        },
        {
          title: '舒张压(mmHg)',
          dataIndex: 'diastolic',
          editable: true,
          align: 'center',
          inputType: 'input_number',
          inputProps: { type: 'number', min: 0, minValue: 60, maxValue: 90 },
          width: 126,
          render: (value: any) =>
            value &&
            (value > 90 ? (
              <div style={{ color: 'red' }}>{value}</div>
            ) : value < 60 ? (
              <div style={{ color: 'red' }}>{value}</div>
            ) : (
              `${value}`
            )),
        },
      ],
    },
  {
    title: '呼吸（次/min）',
    dataIndex: 'breath',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_TINY,
    editable: true,
    inputType: 'input_number',
    render: (value: any) =>
      value &&
      (value > 20 ? (
        <div style={{ color: 'red' }}>{value}</div>
      ) : value < 12 ? (
        <div style={{ color: 'red' }}>{value}</div>
      ) : (
        `${value}`
      )),
  },
  {
    title: '宫缩（秒/分）',
    dataIndex: 'contraction',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_TINY,

    editable: true,
    inputType: 'MyInput',
  },
  {
    title: '浓度（mg/ml）',
    dataIndex: 'concentration',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_TINY,

    editable: true,
    inputType: 'MyAutoComplete',
  },
  {
    title: '滴度（ggt/min）',
    dataIndex: 'speed',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_TINY,

    editable: true,
    inputType: 'MyAutoComplete',
  },
  {
    title: '特殊记录',
    dataIndex: 'note',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_TINY,
    inputType: 'TextArea',
    inputProps: { type: MODAL_TEMPLATE_TYPES.产前产后, isPop: true, rows: 10 },

    editable: true,
  },
  {
    title: '护士签名',
    dataIndex: 'sign',
    align: 'center',
    inputType: 'TextArea',
    inputProps: { type: MODAL_TEMPLATE_TYPES.科室个人, isPop: true, rows: 10 },

    editable: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,

  },
];
