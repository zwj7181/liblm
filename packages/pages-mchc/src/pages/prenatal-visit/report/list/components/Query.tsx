import { BaseQuery, MyIcon } from '@lm_fe/components_m';
import { Button } from 'antd';
import React from 'react';
import { queryFormDescriptions } from '../config/form';

class Query extends BaseQuery {
  state = { queryFormDescriptions };

  renderBtn = () => (
    <React.Fragment>
      <Button icon={<MyIcon value='RedoOutlined' />} onClick={this.handleReset}>
        重置
      </Button>
      <Button type="primary" icon={<MyIcon value='SearchOutlined' />} htmlType="submit">
        查询
      </Button>
    </React.Fragment>
  );
}

export default Query
