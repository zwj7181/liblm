import { EMPTY_PLACEHOLDER, getSearchParamsValue } from '@lm_fe/utils';
import { Space } from 'antd';
import classNames from 'classnames';
import React, { FC, PropsWithChildren, ReactElement, useEffect, useRef, useState } from 'react';
import styles from './less/panel-with-child.module.less';
import { use_provoke } from '@lm_fe/provoke';
export interface IPanelWithChildProps { }
type IHeaderItem = { title: string, value: any } | null | false | undefined

interface IProps {
  headerItems: IHeaderItem[]
  tabItems: { title: string, key: string, node: ReactElement | null }[]
  activeKey?: any,
  setActiveKey?(key: any): void

}
export default function PanelWithChildFC(props: IProps) {
  const { headerItems = [], tabItems = [] } = props
  const [__activeKey, __setActiveKey] = useState(getSearchParamsValue('activeKey') || tabItems[0]?.key)
  const activeKey = props.activeKey ?? __activeKey
  const setActiveKey = props.setActiveKey ?? __setActiveKey

  function handleClickTab(key: any) {
    setActiveKey(key)
  }
  function renderTabs() {

    return (
      <div className={styles["panel-with-child-desk-tabs"]}>
        {tabItems.map((tab) => (
          <div
            key={tab.key}
            onClick={() => handleClickTab(tab.key)}
            className={classNames(styles['panel-with-child-desk-tabs-item'], {
              [styles['panel-with-child-desk-tabs-item-active']]: activeKey === tab.key,
            })}
          >
            <Space>
              {
                (activeKey === tab.key)
                  ? <div className={styles["circle-icon"]}></div>
                  : null
              }

              {tab.title}
            </Space>
          </div>
        ))}
      </div>
    );
  };


  const item = tabItems.find(_ => _.key === activeKey)


  return (
    <PanelTitleWrapper headerItems={headerItems} >


      {renderTabs()}
      <div className={styles["panel-with-child-desk-content"]}>
        {
          item?.node
            ? item.node
            : null
        }
      </div>
    </PanelTitleWrapper>
  );
}

export const PanelTitleWrapper: FC<PropsWithChildren<{ headerItems: IHeaderItem[] }>> = function PanelTitleWrapper(props) {
  const { headerItems, children } = props
  const headerRef = useRef<HTMLDivElement>(null)
  const [head_height, setHead_height] = useState(50)
  useEffect(() => {
    setTimeout(() => {
      setHead_height(headerRef.current?.clientHeight ?? 50)
    }, 400);

    return () => {

    }
  }, [])

  return (
    <div className={styles["panel-with-child"]}>
      <div ref={headerRef}>
        <PanelTitle headerItems={headerItems} />
      </div>
      <div
        className={styles["panel-with-child_content"]} style={{ height: `calc(100% - ${head_height}px` }}
      >
        {children}
      </div>
    </div>
  );
};
export function PanelTitle(props: { headerItems: IHeaderItem[] }) {
  const colors = use_provoke(s => s.sys_theme.colors)
  const { headerItems } = props

  return (
    <div className={styles["panel-with-child_header"]} style={{ background: colors?.light[1] }}>
      {
        headerItems.map(_ => {
          if (!_) return null
          return <div key={_.title} className={styles["panel-with-child_header-item"]}>
            <span className={styles["panel-with-child_header-item-label"]}>{_.title}:</span>
            <span className={styles["panel-with-child_header-item-value"]}>{_.value ?? EMPTY_PLACEHOLDER}</span>
          </div>
        })
      }


    </div>
  );
};