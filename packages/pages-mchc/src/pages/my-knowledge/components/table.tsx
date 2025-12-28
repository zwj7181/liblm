/*
 * @Descripttion: 项目描述
 * @Author: cjl
 * @Date: 2021-11-09 16:56:01
 * @LastEditTime: 2021-11-09 16:56:01
 */
import React from 'react';
import { Button } from 'antd';
import { BaseTableOld } from '@lm_fe/components_m';

export default class RepositoryTable extends BaseTableOld {
  renderAdd = () => {
    const { onAdd, addText, disabled } = this.props;
    if (onAdd) {
      return (
        <Button disabled={disabled} type="primary" onClick={onAdd}>
          {addText || '新增'}
        </Button>
      );
    }
    return;
  };
}
