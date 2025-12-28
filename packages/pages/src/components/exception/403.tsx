import React from 'react';
import { Result, Button, Space } from 'antd';
import './style.less';
export default () => (
  <Result
    status="403"
    title="403"
    className="custom-result"
    subTitle="抱歉，您没有权限访问该页面."
    // extra={
    //   <Space>
    //     <Button type="primary">首页</Button>
    //     <Button>关闭</Button>
    //   </Space>
    // }
  />
);
