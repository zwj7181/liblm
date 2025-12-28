import { BaseTableOld } from '@lm_fe/components_m';
import { SnapButton } from '@lm_fe/pages';
import { Space } from 'antd';
import React from 'react';

class ProductsTable extends BaseTableOld {


  onCancel = () => {
    this.setState({ visible: false });
  };

  renderAdd = () => {

    return (
      <Space>
        <SnapButton />

      </Space>
    );
  };
}

export default ProductsTable
