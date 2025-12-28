import { formatTimeToStandard, GeneralComponents_DictionarySelect_Display } from '@lm_fe/components_m';
import { APP_CONFIG } from '@lm_fe/env';
import { Badge } from 'antd';
import { get } from 'lodash';
import React from 'react';

export const tableColumns = [
  {
    title: '任务类型',
    dataIndex: 'contentType',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    render: (value) => <GeneralComponents_DictionarySelect_Display uniqueKey="Task.contentType" value={value} />,
  },
  {
    title: '任务标题',
    dataIndex: 'title',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '宣教内容',
    dataIndex: 'description',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    render: (value, rowData) => {
      if (get(rowData, 'contentType') === 1) {
        return get(rowData, 'knowledge.title');
      }
      if (get(rowData, 'contentType') === 2) {
        return get(rowData, 'video.title');
      }
      if (get(rowData, 'contentType') === 3) {
        return get(rowData, 'url');
      }
      if (get(rowData, 'contentType') === 4) {
        return rowData?.questionnaireTitle ?? rowData?.workQuestion?.title
      }
      return value;
    },
    ellipsis: true,
  },
  {
    title: '推送目标对象',
    dataIndex: 'pregnantLimits',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
    render: (value) => <GeneralComponents_DictionarySelect_Display uniqueKey="Task.pushObject" value={value} />,
  },
  {
    title: '推送详情',
    dataIndex: 'pregnantLimitsNote',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
    ellipsis: true,
  },
  {
    title: '推送时间',
    dataIndex: 'pushTime',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    ellipsis: true,
  },
  {
    title: '推送频率',
    dataIndex: 'pushFrequency',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
    render: (value) => <GeneralComponents_DictionarySelect_Display uniqueKey="Task.pushFrequency" value={value} />,
  },
  {
    title: '创建人',
    dataIndex: 'createUser',
    width: APP_CONFIG.CELL_WIDTH_MIDDLE,
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
    render: (value) => formatTimeToStandard(value),
  },
  {
    title: '发布状态',
    dataIndex: 'releaseStatus',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
    render: (value) => {
      return value === 1 ? <Badge status="success" text="开启" /> : <Badge status="error" text="关闭" />;
    },
  },
  {
    title: '发布者',
    dataIndex: 'releaseUser',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
  },
  {
    title: '运行状态',
    dataIndex: 'runStatus',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
    render: (value) => <GeneralComponents_DictionarySelect_Display uniqueKey="Task.runStatus" value={value} />,
  },
  {
    title: '运行情况',
    dataIndex: 'runStatusNote',
    width: APP_CONFIG.CELL_WIDTH_LARGE,
    ellipsis: true,
  },
];
