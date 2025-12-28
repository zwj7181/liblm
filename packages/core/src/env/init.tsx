import { mchcEnv, mchcEvent, mchcMacro } from "@lm_fe/env";
import { AppEnv, appEnv, AxiosResponse, IRequest_AxiosRequestConfig, IRequest_ResponseError, request } from "@lm_fe/utils";

import { Modal } from 'antd';

const { PUBLIC_PATH, HOST_URL, API_PREFIX } = mchcMacro;
const baseApiUrl = location.origin

request.on('message', (status, msg, response) => {
    if (status) {
        mchcEnv.success(msg)
    } else {
        mchcEnv.warning(msg)
    }
})
request.spawn({
    config: {
        baseURL: `${AppEnv.client_mode ? HOST_URL : baseApiUrl}${API_PREFIX}`,
        timeout: 240000,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }
})
request.on('request', (req: IRequest_AxiosRequestConfig) => {
    request.token = mchcEnv.token!
})
request.on('response', (response: AxiosResponse) => {

    const { headers } = response

    const config = response.config as IRequest_AxiosRequestConfig

    const { url, } = config


    const isSameOrigin = url?.startsWith('http') ? new URL(url).origin === location.origin : true
    if (isSameOrigin) {
        const token = headers['Authorization'] || headers['authorization']
        if (token) {
            mchcEnv.token = token
            appEnv.token = token
        }

    }
})
request.on('error', (err_wrapper: IRequest_ResponseError) => {
    const { error, msg } = err_wrapper
    if (error?.config?.url === '/api/desklogin') {
        return
    }

    const { pathname, search } = window.location;
    const code = error?.response?.status
    const req_url = error?.response?.config.url

    if (code === 401 && !mchcEnv.is_single) {
        // 未登录、token失效处理方法
        if (!pathname.includes('/login') && req_url !== '/api/authenticate') {
            Modal.destroyAll();
            mchcEvent.emit('confirm', {
                type: 'info',
                title: '温馨的提示',
                content: msg ?? '您未登陆账户或登录已超时，请重新登录...',
                centered: true,
                okText: '确定',
                onOk: () => {
                    mchcEnv.logout()
                    window.location.href = `${mchcMacro.PUBLIC_PATH}login?redirectTo=${pathname}${search}`;
                },
            })

        }

    }
})

