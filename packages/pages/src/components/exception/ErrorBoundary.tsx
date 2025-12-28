import React from 'react';
import { Button } from 'antd';
import PageWrong from './500';
import './style.less';

// 格式化错误信息
const transformErrorMessage = (err: string) => {
  if (!err) {
    return [];
  }
  const str = err.replace(/\n/g, ',');
  return str.split(',');
};
export class ErrorBoundary extends React.Component {
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
    if (stack && stack.includes('ChunkLoadError')) {
      text = (
        <>
          <span>资源加载失败或有版本更新，请</span>
          <Button danger type="link" style={{ marginLeft: '-12px' }} onClick={() => window.location.reload()}>
            重新加载
          </Button>
        </>
      );
    }
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
            JSON.stringify(this.state.error?.stack)
          )}
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    if (hasError) {
      if (process.env.NODE_ENV === 'production') {
        return <PageWrong extra={this.extra(error?.stack)} />;
      }
      return (
        <div className="error-boundary">
          {
            JSON.stringify(error?.stack)

          }
        </div>
      );
    }

    return this.props.children;
  }
}
