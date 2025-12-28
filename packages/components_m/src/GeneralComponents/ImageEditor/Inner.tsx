import React, { Component } from 'react';
import ReactImgEditor from 'react-img-editor-pro';
import { get } from 'lodash';
import './index.less';
import 'react-img-editor-pro/assets/index.css';
export default class Index extends Component {
  state = {
    image: undefined,
  };

  loadingToolbar = false;

  componentDidMount() {
    const { value } = this.props;
    const canvas = document.getElementById('bg');
    if (get(canvas, 'getContext')) {
      if (value) {
        this.setState({
          image: value,
        });
      } else {
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, 1500, 800);
        const image = canvas.toDataURL('image/png');
        this.setState({
          image,
        });
      }
    }
    this.loadingToolbar = true;
  }

  handleSave = (data) => {
    const { onChange } = this.props;
    onChange && onChange(data);
  };

  render() {
    const { image } = this.state;

    return (
      <div id="custom-image-editor" className="custom-image-editor">
        {image ? (
          <ReactImgEditor
            src={image}
            width={1500}
            height={800}
            plugins={[]}
            getStage={(ref) => {
              this.stageRef = ref;
            }}
            // defaultPluginName="pen"
            crossOrigin="anonymous"
            callBase64Back={this.handleSave}
          />
        ) : (
          <span>当前浏览器不支持电子画板，请更换浏览器</span>
        )}
        <div style={{ display: 'none' }}>
          <canvas id="bg" width={1500} height={800} />
        </div>
      </div>
    );
  }
}
