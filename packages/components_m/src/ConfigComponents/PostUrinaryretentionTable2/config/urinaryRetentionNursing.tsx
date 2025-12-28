/**
 * 产后尿潴留护理单
 */
import { MODAL_TEMPLATE_TYPES } from '@lm_fe/env';
import dayjs from 'dayjs';
import { APP_CONFIG } from '../../../utils/constants';
export const tableColumns: any = [
  {
    title: '日期',
    dataIndex: 'recordTime',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    editable: true,
    inputType: 'DateTimeInput',
    inputProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm',
      setDefaultValue: true,
    },
    defaultValue: {
      boolean: true,
      type: 'dataTime',
    },
    render: (value, data) => {
      return value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '';
    },
  },
  {
    title: '感觉',
    align: 'center',
    editable: true,
    width: APP_CONFIG.CELL_WIDTH_TINY,
    dataIndex: 'painFeel',
    inputType: 'normal_select',
    inputProps: {
      options: [
        { label: '无胀痛', value: 1 },
        { label: '轻微胀痛', value: 2 },
        { label: '非常胀痛', value: 3 },
      ],
    },
    render: (value: any) => {
      if (value == 1) {
        return '无胀痛';
      }
      if (value == 2) {
        return '轻微胀痛';
      }
      if (value == 3) {
        return '非常胀痛';
      }

      return;
    },
  },
  {
    title: '尿意',
    dataIndex: 'urineFeel',
    align: 'center',
    editable: true,
    width: APP_CONFIG.CELL_WIDTH_TINY,

    inputType: 'normal_select',
    inputProps: {
      options: [
        { label: '轻微尿意', value: '1' },
        { label: '较强尿意', value: '2' },
        { label: '强烈尿意', value: '3' },
      ],
    },
    render: (value: any) => {
      if (value == '1') {
        return '轻微尿意';
      }
      if (value == '2') {
        return '较强尿意';
      }
      if (value == '3') {
        return '强烈尿意';
      }

      return;
    },
  },
  {
    title: '排尿时间',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_TINY,

    editable: true,
    dataIndex: 'urineTime',
    inputType: 'normal_select',
    inputProps: {
      options: [
        { label: '产后4-6小时', value: 0 },
        { label: '产后6h以上', value: 1 },
        { label: '产后8h以上', value: 2 },
        { label: '产后10h以上', value: 3 },
      ],
    },
    render: (value: any) => {
      if (value == 1) {
        return '产后6h以上';
      }
      if (value == 2) {
        return '产后8h以上';
      }
      if (value == 3) {
        return '产后10h以上';
      }

      return;
    },
  },
  {
    title: '膀胱充盈',
    dataIndex: 'bladderFill',
    width: APP_CONFIG.CELL_WIDTH_TINY,

    align: 'center',
    editable: true,
    inputType: 'normal_select',
    inputProps: {
      options: [
        { label: '轻微充盈', value: 1 },
        { label: '中度充盈', value: 2 },
        { label: '重度充盈', value: 3 },
      ],
    },
    render: (value: any) => {
      if (value == 1) {
        return '轻微充盈';
      }
      if (value == 2) {
        return '中度充盈';
      }
      if (value == 3) {
        return '重度充盈';
      }

      return;
    },
  },
  {
    title: 'B超测残余尿',
    dataIndex: 'urineResidue',
    align: 'center',
    editable: true,
    width: APP_CONFIG.CELL_WIDTH_TINY,

    inputType: 'normal_select',
    inputProps: {
      options: [
        { label: '50~100ml', value: 1 },
        { label: '100~300ml', value: 2 },
        { label: '300ml以上', value: 3 },
      ],
    },
    render: (value: any) => {
      if (value == 1) {
        return '50~100ml';
      }
      if (value == 2) {
        return '100~300ml';
      }
      if (value == 3) {
        return '300ml以上';
      }

      return;
    },
  },
  {
    title: '评估意见',
    dataIndex: 'opinion',
    editable: true,
    width: APP_CONFIG.CELL_WIDTH_TINY,

    align: 'center',
    inputType: 'normal_select',
    inputProps: {
      options: [
        { label: '轻度尿潴留', value: 1 },
        { label: '中度尿潴留', value: 2 },
        { label: '重度尿潴留', value: 3 },
      ],
    },
    render: (value: any) => {
      if (value == 1) {
        return '轻度尿潴留';
      }
      if (value == 2) {
        return '中度尿潴留';
      }
      if (value == 3) {
        return '重度尿潴留';
      }

      return;
    },
  },
  {
    title: '护理措施',
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_SMALL,
    children: [
      {
        title: '指导饮水，早排尿',
        dataIndex: 'measures_ZDYSZPN',
        editable: true,
        width: APP_CONFIG.CELL_WIDTH_MINI,

        align: 'center',
        inputType: 'CheckboxWithValue',
        inputProps: { type: 'switch' },


        render: (value: any) => {
          if (value) {
            return '✔';
          } else {
            return ' ';
          }
        },
      },
      {
        title: '提供隐蔽的排尿环境，采取习惯的排尿姿势',
        dataIndex: 'measures_TGYBDPNHJ',
        editable: true,
        align: 'center',
        width: APP_CONFIG.CELL_WIDTH_MINI,

        inputType: 'CheckboxWithValue',
        inputProps: { type: 'switch' },
        render: (value: any) => {
          if (value) {
            return '✔';
          } else {
            return ' ';
          }
        },
      },
      {
        title: '每30~60min观察宫缩、宫底高度，记录阴道流血量',
        dataIndex: 'measures_JLYDLXL',
        editable: true,
        align: 'center',
        width: APP_CONFIG.CELL_WIDTH_MINI,

        inputType: 'CheckboxWithValue',
        inputProps: { type: 'switch' },

        render: (value: any) => {
          if (value) {
            return '✔';
          } else {
            return ' ';
          }
        },
      },
      {
        title: '缓解紧张及焦虑情绪',
        dataIndex: 'measures_HJJZJLQX',
        editable: true,
        align: 'center',
        width: APP_CONFIG.CELL_WIDTH_MINI,

        inputType: 'CheckboxWithValue',
        inputProps: { type: 'switch' },

        render: (value: any) => {
          if (value) {
            return '✔';
          } else {
            return ' ';
          }
        },
      },
      {
        title: '听流水声或温水冲洗会阴',
        dataIndex: 'measures_TLSSHWSCXHY',
        editable: true,
        align: 'center',
        width: APP_CONFIG.CELL_WIDTH_MINI,

        inputType: 'CheckboxWithValue',
        inputProps: { type: 'switch' },

        render: (value: any) => {
          if (value) {
            return '✔';
          } else {
            return ' ';
          }
        },
      },
      {
        title: '热敷及按摩膀胱区',
        dataIndex: 'measures_RFJAMPGQ',
        editable: true,
        align: 'center',
        inputType: 'CheckboxWithValue',
        inputProps: { type: 'switch' },

        width: APP_CONFIG.CELL_WIDTH_MINI,

        render: (value: any) => {
          if (value) {
            return '✔';
          } else {
            return ' ';
          }
        },
      },

      {
        title: '热气熏蒸会阴部或坐盆',
        dataIndex: 'measures_RQXZHYBHZP',
        editable: true,
        align: 'center',
        inputType: 'CheckboxWithValue',
        inputProps: { type: 'switch' },

        width: APP_CONFIG.CELL_WIDTH_MINI,

        render: (value: any) => {
          if (value) {
            return '✔';
          } else {
            return ' ';
          }
        },
      },
      {
        title: '膀胱区理疗',
        dataIndex: 'measures_PGQLL',
        editable: true,
        align: 'center',
        width: APP_CONFIG.CELL_WIDTH_MINI,

        inputType: 'CheckboxWithValue',
        inputProps: { type: 'switch' },

        render: (value: any) => {
          if (value) {
            return '✔';
          } else {
            return ' ';
          }
        },
      },
      {
        title: '开塞露塞肛疗法',
        dataIndex: 'measures_KSLSGLF',
        editable: true,
        align: 'center',
        inputType: 'CheckboxWithValue',
        inputProps: { type: 'switch' },

        width: APP_CONFIG.CELL_WIDTH_MINI,

        render: (value: any) => {
          if (value) {
            return '✔';
          } else {
            return ' ';
          }
        },
      },
      {
        title: '药物疗法（肌肉注射或穴位注射）',
        align: 'center',


        children: [
          {
            title: '新斯的明',
            dataIndex: 'measures_XSDM',
            editable: true,
            align: 'center',
            inputType: 'CheckboxWithValue',
            inputProps: { type: 'switch' },

            width: APP_CONFIG.CELL_WIDTH_MINI,

            render: (value: any) => {
              if (value) {
                return '✔';
              } else {
                return ' ';
              }
            },
          },
          {
            title: '维生素B1',
            dataIndex: 'measures_WSSB1',
            editable: true,
            align: 'center',
            inputType: 'CheckboxWithValue',
            inputProps: { type: 'switch' },

            width: APP_CONFIG.CELL_WIDTH_MINI,

            render: (value: any) => {
              if (value) {
                return '✔';
              } else {
                return ' ';
              }
            },
          },
        ],
      },
      {
        title: '导尿，留置尿管',
        dataIndex: 'measures_DNLZNG',
        editable: true,
        align: 'center',
        width: APP_CONFIG.CELL_WIDTH_MINI,

        inputType: 'CheckboxWithValue',
        inputProps: { type: 'switch' },

        render: (value: any) => {
          if (value) {
            return '✔';
          } else {
            return ' ';
          }
        },
      },
    ],
  },

  {
    title: '护士签名',
    dataIndex: 'responsibleSign',
    editable: true,
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_TINY,

    inputType: 'TextArea',
    inputProps: { type: MODAL_TEMPLATE_TYPES.科室个人, isPop: true, rows: 10 },
    fixed: 'right',
  },
  {
    title: '审核护士签名',
    // dataIndex: 'recorder',
    dataIndex: 'auditorSign',
    editable: true,
    align: 'center',
    width: APP_CONFIG.CELL_WIDTH_TINY,

    inputType: 'TextArea',
    inputProps: { type: MODAL_TEMPLATE_TYPES.科室个人, isPop: true, rows: 10 },
    fixed: 'right',
  },
];
