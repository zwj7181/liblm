import React from 'react';
import classnames from 'classnames';
import { Result } from 'antd';
import './style.less';
const NoFoundPage: React.FC = (props) => (
  <Result
    className={classnames('custom-result', props.className)}
    status="404"
    style={{
      ...props.style,
    }}
    extra={props.extra || null}
    subTitle={props.subTitle || '抱歉，您访问的页面不存在'}
    title={props.title || '404'}
  />
);
export default NoFoundPage;
