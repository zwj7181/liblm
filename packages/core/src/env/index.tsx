import { legacyLogicalPropertiesTransformer, StyleProvider } from '@ant-design/cssinjs';
import {
    // configCustomIcon,
    MyLazyComponent,
    MountMchcModal as OldMountMchcModal
} from '@lm_fe/components_m';
import { mchcBoot, mchcDriver, mchcMacro, MchcRouterContainer, mchcRouterContainer__, MchcTypes } from "@lm_fe/env";
import { MountMchcModal } from '@lm_fe/pages';
import { fubaoRoutes } from '@lm_fe/pages-fubao';
import { mchcRoutes } from '@lm_fe/pages-mchc';
import { IMchc_User, SMchc_Common, SMchc_User } from "@lm_fe/service";
import { AnyObject, appEnv, makeEventStore } from "@lm_fe/utils";
import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { THEME } from '@lm_fe/provoke';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Store } from 'redux';
import { ReloadButton } from './ReloadButton';
import { use_task } from "./tasks";

import './init';
import { MessageHolder } from './message';
import { theme_config } from './theme_config';

export interface IGlobalStoreData {
    loggedIn: boolean
    user?: IMchc_User
}
export const globalStore = makeEventStore<IGlobalStoreData>(appEnv.appName)
export async function passwordLogin(data: Parameters<typeof SMchc_Common.fk_login>[0]) {
    await SMchc_Common.fk_login(data)
    const user = await SMchc_User.getOne(data.username)
    globalStore.bus.data = { user, loggedIn: true }
}
export async function logout() {
    appEnv.removeToken()
    globalStore.bus.data = { user: undefined, loggedIn: false }
}
export async function boot(config: {
    store?: Store
    app?: ReactNode,
    App?: FC<{ routerContainer?: MchcRouterContainer }>,
    name?: MchcTypes,
    taskDisabled?: boolean,
    routesData?: AnyObject
}) {

    const { name, app, App, routesData = {}, taskDisabled, store } = config
    await mchcBoot({ name, store })
    mchcDriver.connect()

    mchcRouterContainer__.init(routesData, mchcRoutes, fubaoRoutes)

    const r_node = App ? <App routerContainer={mchcRouterContainer__} /> : null
    const _app = app ?? r_node

    ReactDOM
        .createRoot(document.getElementById('root')!)
        .render(<BrowserRouter basename={mchcMacro.PUBLIC_PATH}><Shell node={_app} taskDisabled={taskDisabled} /></BrowserRouter>);


}

function Shell(props: { node: ReactNode, taskDisabled?: boolean }) {
    const { node, taskDisabled } = props
    const { sys_theme } = use_task(taskDisabled)


    return <StyleProvider
        hashPriority="high"
        transformers={[legacyLogicalPropertiesTransformer]}
    >
        <ConfigProvider locale={zhCN} theme={theme_config(sys_theme)}>
            <ReloadButton />

            {node}

            <MyLazyComponent fallback=''>
                <MountMchcModal />
                <OldMountMchcModal />
                <MessageHolder />
            </MyLazyComponent>
        </ConfigProvider>
    </StyleProvider>


}
