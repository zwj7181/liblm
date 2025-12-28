import React, { useEffect, useState, useCallback } from 'react';
import { get, map, size } from 'lodash';
import { Collapse } from 'antd';
import { Empty } from 'antd';
import './index.less';
import { EventEmitter_Old } from '@lm_fe/components_m';
interface Iprops {
  templateData: any;
  [key: string]: any;
}
export default function Template({ templateData, ...props }: Iprops) {
  const handleSelect = useCallback(
    (value) => {
      return () => {
        EventEmitter_Old.dispatch('templateSelect', value);
      };
    },
    [templateData],
  );
  //
  function templateContent(data: any) {
    return (
      <div className="main-content">
        {size(get(data, `children`)) > 0 && <div className="title">{get(data, `title`)}</div>}
        <div className="content">
          {map(get(data, `children`), (item, index) => {
            return (
              <div className="item" onClick={handleSelect(get(item, `title`))}>
                {get(item, 'title')}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  function mainContent(data: any) {
    if (size(data) == 0) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }
    return map(data, (item, index) => {
      return templateContent(item);
    });
  }
  return (
    <div className="template-container">
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header={<span>处理建议.</span>} key="1">
          {mainContent(get(templateData, `adviseTemplate`))}
        </Collapse.Panel>
        <Collapse.Panel header={<span>科室模板</span>} key="2">
          {mainContent(get(templateData, `doctorTemplate`))}
        </Collapse.Panel>
        <Collapse.Panel header={<span>个人模板</span>} key="3">
          {mainContent(get(templateData, `personalTemplate`))}
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}
