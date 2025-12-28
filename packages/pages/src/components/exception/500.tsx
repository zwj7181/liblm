

import React from 'react';
import { Result } from 'antd';
import './style.less';

export default ({ extra = '' }) => (
  <Result
    status="500"
    title="500"
    className="custom-result"
    subTitle="抱歉，此页面发生错误，请联系管理员处理"
    extra={extra}
  />
);
