import { MyIcon } from '@lm_fe/components';
import { use_provoke } from '@lm_fe/provoke';
import classnames from 'classnames';
import React from 'react';
import styles from './index.module.less';
import { ILayout_TabButton_Props } from './types';


export default function Layout_TabButton_Inner(props: ILayout_TabButton_Props) {
  const { isActive = false, closable = true, title, onClick, onClose, tabKey } = props;
  const sys_theme = use_provoke(s => s.sys_theme)

  const handleClickTab = () => {
    onClick && onClick(tabKey);
  };

  const handleCloseTab = (e: any) => {
    e.stopPropagation();
    onClose && onClose(tabKey);
  };
  const regx = /\/happy\/config-table\/list(.*)\/(.*)/
  const result = regx.exec(title)
  const dispaly_title = result ? `动态列表页${result[1]}-${result[2]}` : title
  return (
    <div id={tabKey} style={{ color: isActive ? sys_theme.colorPrimary : '', background: isActive ? sys_theme.theme_bg_color : '' }} className={classnames(styles['my-tab-btn'], { [styles['my-tab-btn-active']]: isActive })} onClick={handleClickTab}>
      {/* <div className={classnames('my-tab-btn-icon', { 'my-tab-btn-icon-active': isActive })} /> */}
      <div title={title} className={styles['my-tab-btn-title']}>{dispaly_title}</div>
      {closable && (
        <div onClick={handleCloseTab} className={styles['my-tab-btn-close']} title='关闭'>
          <MyIcon value='CloseOutlined' />
        </div>
      )}
      <div style={{ background: isActive ? sys_theme.colorPrimary : '' }} className={styles['after']} />
    </div>
  );
};
