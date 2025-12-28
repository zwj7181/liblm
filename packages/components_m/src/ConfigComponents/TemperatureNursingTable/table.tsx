import { mchcEnv } from '@lm_fe/env';
import { MyPressure } from '../../FU_components/PressureInput';
import { APP_CONFIG } from '../../utils/constants';
export const tableColumns = [
  {
    title: '脉搏(bpm)',
    dataIndex: 'pulse',
    align: 'center',
    editable: true,
    inputType: 'InputNumber',
    inputProps: { min: 0 },
    width: APP_CONFIG.CELL_WIDTH_SMALL,
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
  {
    title: '体温(℃)',
    dataIndex: 'temperature',
    align: 'center',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    render: (value: any) => value && (value >= 37.3 ? <div style={{ color: 'red' }}>{value}</div> : `${value}`),
  },
  ...(
    mchcEnv.is('广三') ?

      [
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
        }
      ] : [
        {
          title: '收缩压(mmHg)',
          dataIndex: 'systolic',
          align: 'center',
          editable: true,
          inputType: 'input_number',
          inputProps: { min: 0 },
          width: APP_CONFIG.CELL_WIDTH_SMALL,
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
          align: 'center',
          editable: true,
          inputType: 'input_number',
          inputProps: { min: 0 },
          width: APP_CONFIG.CELL_WIDTH_SMALL,
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
      ]
  ),

  {
    title: '呼吸(bpm)',
    dataIndex: 'respiratory',
    align: 'center',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    width: APP_CONFIG.CELL_WIDTH_SMALL,
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
    title: '疼痛强度',
    dataIndex: 'painIntension',
    align: 'center',
    editable: true,
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },

  {
    title: '人便次数',
    dataIndex: 'voidingTimes',
    align: 'center',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '体重(kg)',
    dataIndex: 'weight',
    align: 'center',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '身高(cm)',
    dataIndex: 'height',
    align: 'center',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '总ml(入量)',
    dataIndex: 'totalTakeinVolume',
    align: 'center',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '总入量备注',
    dataIndex: 'totalTakeinNote',
    align: 'center',
    editable: true,
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '尿量(ml)',
    dataIndex: 'peeVolume',
    align: 'center',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '总ml(出量)',
    dataIndex: 'totalOutputVolume',
    align: 'center',
    editable: true,
    inputType: 'input_number',
    inputProps: { min: 0 },
    width: APP_CONFIG.CELL_WIDTH_SMALL,
  },
  {
    title: '总出量备注',
    dataIndex: 'totalOutputNote',
    align: 'center',
    editable: true,
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '备注',
    dataIndex: 'note',
    align: 'center',
    editable: true,
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
];
