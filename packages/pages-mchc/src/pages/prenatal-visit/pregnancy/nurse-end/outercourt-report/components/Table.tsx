import { APP_CONFIG, BaseTableOld, MyIcon } from '@lm_fe/components_m';
import { SLocal_State } from '@lm_fe/service';
import { getSearchParamsValue } from '@lm_fe/utils';
import { Button } from 'antd';
import React from 'react';
import store from 'store';
class ProductsTable extends BaseTableOld {
  readSnap = () => {
    const user = SLocal_State.getUserData()
    const pid = getSearchParamsValue('id');
    let websocketServices = window.websocketServices;
    const command = {
      command: 'Snap',
      data: {
        pid, // 患者id
        uid: user.login, // 操作id
      },
      token: `Bearer ${store.get(APP_CONFIG['TOKEN'])}`,
    };
    console.log('=======', this, JSON.stringify(command));
    websocketServices.send(JSON.stringify(command));
  };

  renderAdd = () => {
    return (
      <Button type="primary" icon={<MyIcon value='PlusOutlined' />} onClick={this.readSnap}>
        报告附加
      </Button>
    );
  };
}
export default ProductsTable