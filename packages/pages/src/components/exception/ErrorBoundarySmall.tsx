import React from 'react';
import { Button, Result } from 'antd';
import PageWrong from './500';
import './style.less';
import { mchcEnv } from '@lm_fe/env';
import { MyMonaco } from '@lm_fe/components';

// 格式化错误信息
const transformErrorMessage = (err: string) => {
  if (!err) {
    return [];
  }
  const str = err.replace(/\n/g, ',');
  return str.split(',');
};
export class ErrorBoundarySmall extends React.Component<{}, { collapsed: boolean, hasError: boolean, error?: any, errorInfo?: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: true,
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  extra = (stack: string) => {
    let text: React.ReactNode = transformErrorMessage(stack)[0];

    return (
      <React.Fragment>
        <div>
          {text}
          <Button type="link" onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
            详情请查看
          </Button>
        </div>
        <div style={{ marginTop: '8px', textAlign: 'left' }}>
          {!this.state.collapsed && (
            <MyMonaco value={this.state.error?.stack ?? ''} />
          )}
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { hasError, error } = this.state;
    if (hasError) {
      return <Result
        style={{ padding: 0, margin: 0 }}
        icon={null}
        subTitle="抱歉，此模块发生错误，请联系管理员处理"
        extra={this.extra(error?.stack)}
      />

    }

    return <>{this.props.children}</>;
  }
}
