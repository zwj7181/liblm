import { getSearchParamsValue } from "@lm_fe/utils";
import { message } from "antd";

export function getHistory(props?: { history?: { push(p: string): void } }) {
    const h = props?.history
    return h
}
export function historyPush(url: string, props?: any) {
    let _url = url
    const h = getHistory(props)
    const sp = getSearchParamsValue('sp')
    if (sp && url) {
        const isIncludeMask = url.includes('?')
        _url = isIncludeMask ? `${url}&sp=1` : `${url}?sp=1`
    }
    if (h && h.push) {
        h.push(_url)
    } else {
        message.warning('history.push 不存在！')
        location.pathname = _url
    }
    if (sp) {
        location.reload()
    }
}
