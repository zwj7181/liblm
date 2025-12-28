import React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { EditorProps } from './types';

export default class Editor extends React.Component<EditorProps> {
  state = {
    value: null,
  };

  static getDerivedStateFromProps(prevProps: EditorProps, state: any) {
    if (state.value || !prevProps.value) return {};

    const value = BraftEditor.createEditorState(prevProps.value);
    return {
      value,
    };
  }

  render() {
    // TODO: 上传图片，由于上传图片至 OSS，需要验证 token，所以不在组件库中执行上传操作。
    const { bordered = true, style = {}, onChange, onUpload } = this.props;
    return (
      <BraftEditor
        {...this.props}
        style={{ border: bordered ? '1px solid #d9d9d9' : '', ...style }}
        onChange={e => {
          this.setState({ value: e });
          onChange(e.toHTML());
        }}
        value={this.state.value}
        media={{
          uploadFn: onUpload,
        }}
      />
    );
  }
}
