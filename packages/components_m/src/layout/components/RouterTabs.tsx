import React from 'react';
import { map, get, last, compact, isEmpty, indexOf, keys } from 'lodash';
import { Menu, Divider } from 'antd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { CustomIcon } from '../../GeneralComponents/CustomIcon';
import { TabButton, TabIProps } from './TabButton';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

import { updateTabs, deleteTab, deleteAllTabs, deleteRightTabsByKey, deleteOtherTabsByKey } from '@/actions/tabs';
import './RouterTabs.less';
import { LazyAntd } from '@lm_fe/components';
interface IProps {
  style?: any;
  dispatch?: any;
  tabs: {
    tabsMapping?: any;
  };
  queryStr?: any;
  path?: string;
}
export class RouterTabs extends React.Component<IProps> {
  state = {
    currentContextMenu: {},
  };

  handleClick = async (tabKey: any) => {
    const { tabs, updateTabs, history } = this.props;
    const { tabsMapping } = tabs;
    const queryStr = get(tabsMapping, `${tabKey}.search`);
    const asPath = `${get(tabsMapping, `${tabKey}.path`)}${queryStr}`;
    await updateTabs(get(tabsMapping, tabKey));
    history.push(asPath);
    // (document.getElementById(tabKey) as HTMLElement).scrollIntoView();
  };

  handleCloseTab = async (tabKey: any) => {
    const { tabs, deleteTab, keepAliveProviderRef } = this.props;
    await deleteTab(tabKey);
    const newTabs = compact(
      map(get(tabs, 'tabs'), (item: TabIProps) => {
        if (item.key !== tabKey) {
          return item;
        }
        return null;
      }),
    );
    const lastQuery = get(last(newTabs), 'search');
    const { history } = this.props;
    history.push(`${get(last(newTabs), 'key')}${isEmpty(lastQuery) ? '' : lastQuery}`);
    const { path, search } = get(tabs, `tabsMapping.${tabKey}`);
    keepAliveProviderRef?.current.removeCache(`${path}.name.${search}`);
  };

  handleCloseRightTabs = async (key) => {
    const { deleteRightTabsByKey, history, keepAliveProviderRef, tabs } = this.props;
    const needRemovedCacheKeys: any = [];
    const activeKeyIndex = indexOf(keys(get(tabs, 'tabsMapping')), key);
    for (let index = 0; index < get(tabs, 'tabs.length'); index++) {
      const { path, search } = get(tabs, `tabs.${index}`);
      if (index > activeKeyIndex) {
        needRemovedCacheKeys.push(`${path}.name.${search}`);
      }
    }
    await deleteRightTabsByKey(key);
    const queryStr = get(tabs, `tabsMapping.${key}.search`);
    const asPath = `${get(tabs, `tabsMapping.${key}.path`)}${queryStr}`;
    history.push(asPath);
    keepAliveProviderRef?.current.removeCache(needRemovedCacheKeys);
  };

  handleCloseOtherTabs = async (key) => {
    const { deleteOtherTabsByKey, history, keepAliveProviderRef, tabs } = this.props;
    const needRemovedCacheKeys: any = [];
    map(get(tabs, 'tabs'), (tab) => {
      const { path, search } = tab;
      if (path !== '/' && path !== key) {
        needRemovedCacheKeys.push(`${path}.name.${search}`);
      }
    });
    await deleteOtherTabsByKey(key);
    const queryStr = get(tabs, `tabsMapping.${key}.search`);
    const asPath = `${get(tabs, `tabsMapping.${key}.path`)}${queryStr}`;
    history.push(asPath);
    keepAliveProviderRef?.current.removeCache(needRemovedCacheKeys);
  };

  handleCloseAllTab = async () => {
    const { deleteAllTabs, history, keepAliveProviderRef, tabs } = this.props;
    const needRemovedCacheKeys: any = [];
    map(get(tabs, 'tabsMapping'), (tab) => {
      const { path, search } = tab;
      if (path !== '/') {
        needRemovedCacheKeys.push(`${path}.name.${search}`);
      }
    });
    history.push('/');
    await deleteAllTabs();
    keepAliveProviderRef?.current.removeCache(needRemovedCacheKeys);
  };

  renderTabMenu = () => {
    const { tabs } = this.props;
    return (
      <Menu selectedKeys={[get(tabs, 'activeKey')]}>
        <Menu.Item
          key="/"
          onClick={() => {
            this.handleClick('/');
          }}
        >
          首页
        </Menu.Item>
        {map(get(tabs, 'tabs')?.slice(1), (tab, index) => {
          return (
            <Menu.Item
              key={tab.key}
              onClick={() => {
                this.handleClick(tab.key);
              }}
            >
              {tab.title}
            </Menu.Item>
          );
        })}
        <Menu.Divider />
        <Menu.Item key="close" onClick={this.handleCloseAllTab}>
          关闭所有
        </Menu.Item>
      </Menu>
    );
  };

  onContextMenuClick = (e, data) => {
    e.preventDefault();
    console.log('右键事件----------------', data);
  };

  rightContextMenu = () => {
    const { currentContextMenu } = this.state;
    const key = currentContextMenu.key;
    return (
      <ContextMenu id="same_unique_identifier" className="context-menu ant-dropdown-menu">
        {key !== '/' && (
          <MenuItem className="ant-dropdown-menu-item" onClick={() => this.handleCloseTab(key)}>
            关闭
          </MenuItem>
        )}

        <MenuItem className="ant-dropdown-menu-item" onClick={() => this.handleCloseOtherTabs(key)}>
          关闭其他
        </MenuItem>
        <MenuItem className="ant-dropdown-menu-item" onClick={() => this.handleCloseRightTabs(key)}>
          关闭右侧所有菜单
        </MenuItem>
        {key !== '/' && (
          <MenuItem className="ant-dropdown-menu-item" onClick={this.handleCloseAllTab}>
            关闭所有
          </MenuItem>
        )}
      </ContextMenu>
    );
  };

  render() {
    const { tabs, location } = this.props;
    return (
      <div className="routertabs">
        <PerfectScrollbar className="routertabs-btns" options={{ suppressScrollY: true }}>
          <div className="routertabs-btns-inner">
            {map(get(tabs, 'tabs'), (tab: TabIProps, index) => {
              return (
                <ContextMenuTrigger
                  id="same_unique_identifier"
                  key={tab.key}
                  collect={() => {
                    this.setState({ currentContextMenu: tab });
                    return { ...tab };
                  }}
                >
                  <TabButton
                    tabKey={tab.key}
                    closable={tab.closable}
                    isActive={get(location, 'pathname') === tab.path}
                    title={tab.title}
                    onClick={this.handleClick}
                    onClose={this.handleCloseTab}
                  />
                </ContextMenuTrigger>
              );
            })}
          </div>
        </PerfectScrollbar>
        {this.rightContextMenu()}
        <div className="routertabs-right">
          <Divider type="vertical" />
          <Dropdown
            className="dropdown"
            overlayClassName="routertabs-overlay"
            overlay={this.renderTabMenu}
            trigger={['click']}
          >
            <CustomIcon type="icon-down" style={{ fontSize: '18px' }} />
          </Dropdown>
        </div>
      </div>
    );
  }
}
export const mapDisPathchToProps = { updateTabs, deleteTab, deleteAllTabs, deleteRightTabsByKey, deleteOtherTabsByKey };
export default RouterTabs
