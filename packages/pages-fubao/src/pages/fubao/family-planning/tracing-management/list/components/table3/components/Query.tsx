import React from 'react';
import dayjs from 'dayjs';
import { message, Button } from 'antd';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { queryFormDescriptions } from '../config/form';
import { pickBy, identity, get } from 'lodash';
import { BaseQuery } from '@lm_fe/components_m';
import { formatDate, formatDateTimeNoSecond } from '@lm_fe/utils';
export default class Query extends BaseQuery {
  state = { queryFormDescriptions };

  handleSearch = (values = {}) => {
    const { onSearch } = this.props;
    const { queryFormDescriptions } = this.state;
    // 过滤无效数据
    const vals = pickBy(values, identity);
    let newValues = {};
    // 按照JPA CriteriaQuery规范处理查询条件
    for (var key in vals) {
      const ignoreFilterType = queryFormDescriptions[key]['ignoreFilterType'];
      const filterType = queryFormDescriptions[key]['filterType'] || 'contains';
      const inputType = queryFormDescriptions[key]['inputType'];
      const paramType = queryFormDescriptions[key]['paramType'];
      // 参数处理
      let keyArr = [key];
      if (!ignoreFilterType) {
        keyArr.push(filterType);
      }
      const keyStr = keyArr.join('.');
      // 提交时间格式处理
      const format = queryFormDescriptions[key]['format'] || 'normalDate';
      const transformFun = format === 'normalDate' ? formatDate : formatDate;

      // 时间组件处理
      if (inputType === 'date') {
        newValues = {
          ...newValues,
          [keyStr]: transformFun(vals[key]),
        };
      } else if (inputType === 'rangeDate') {
        if (paramType === 'startAndEnd') {
          newValues = {
            ...newValues,
            startDate: transformFun(vals[key][0]),
            endDate: transformFun(vals[key][1]),
          };
        } else if (paramType === 'regStartAndEnd') {
          newValues = {
            ...newValues,
            regStartTime: transformFun(vals[key][0]),
            regEndTime: transformFun(vals[key][1]),
          };
        } else {
          newValues = {
            ...newValues,
            [`${key}.greaterOrEqualThan`]: transformFun(vals[key][0]),
            [`${key}.lessOrEqualThan`]: transformFun(vals[key][1]),
          };
        }
      } else if (inputType === 'rangeDateTime') {
        if (paramType === 'startAndEnd') {
          newValues = {
            ...newValues,
            startDate: formatDateTimeNoSecond(vals[key][0]),
            endDate: formatDateTimeNoSecond(vals[key][1]),
          };
        } else if (paramType === 'sendStartAndEnd') {
          newValues = {
            ...newValues,
            sendStartTime: formatDateTimeNoSecond(vals[key][0]),
            sendEndTime: formatDateTimeNoSecond(vals[key][1]),
          };
        } else {
          newValues = {
            ...newValues,
            [`${key}.greaterOrEqualThan`]: formatDateTimeNoSecond(vals[key][0]),
            [`${key}.lessOrEqualThan`]: formatDateTimeNoSecond(vals[key][1]),
          };
        }
      } else if (inputType === 'rangeInputNumber') {
        newValues = {
          ...newValues,
          [`${key}.greaterOrEqualThan`]: vals[key][0],
          [`${key}.lessOrEqualThan`]: vals[key][1],
        };
      } else {
        newValues = {
          ...newValues,
          [keyStr]: vals[key],
        };
      }
    }
    if (newValues.hasOwnProperty('followUpType.equals') && !newValues.hasOwnProperty('followUpState.equals')) {
      message.warning('请选择随访状态！');
      return;
    }
    if (!newValues.hasOwnProperty('followUpType.equals') && newValues.hasOwnProperty('followUpState.equals')) {
      message.warning('请选择随访类型！');
      return;
    }
    onSearch && onSearch(newValues);
  };

  renderBtn = () => (
    <React.Fragment>
      <Button icon={<RedoOutlined />} onClick={this.handleReset}>
        重置
      </Button>
      <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
        查询
      </Button>
    </React.Fragment>
  );
}
