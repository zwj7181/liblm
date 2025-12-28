import { MyIcon } from '@lm_fe/components';
import { request } from '@lm_fe/utils';
import { message } from 'antd';
import React from 'react';
import './PregnancyToolbar.less';
export default function ClearCache() {
  const handleClearCache = async () => {
    await request.get('/api/clearCache');
    message.success('清除缓存成功');
  };

  return (
    <div className="toolbar-wrapper" style={{ marginRight: 32 }}>
      <div className="toolbar-action" onClick={handleClearCache}>
        <MyIcon value='ClearOutlined' style={{ fontSize: '14px', marginRight: 2 }} /> 清除缓存
      </div>
    </div>
  );
}
