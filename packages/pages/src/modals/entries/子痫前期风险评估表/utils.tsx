import { IMchc_Doctor_OutpatientHeaderInfo } from "@lm_fe/service"
import { CSSProperties } from "react"
import React from "react"
let sign_style: CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', }
function u(n = 1) {
    return '_'.repeat(n)
}

export function fuck_user_info(h?: IMchc_Doctor_OutpatientHeaderInfo) {
    return <>
        <div style={{ ...sign_style, lineHeight: 1.5, padding: 8 }}>
            <div>姓名：{h?.name}</div>
            <div>门诊号：{h?.outpatientNO}</div>
            <div>年龄：{h?.age}</div>
        </div>

    </>
}
export function fuck_sign_user() {
    return <>
        <div style={sign_style}>
            <div>患者签名：{u(20)}</div>                                      <div>签名时间: {u(6)}年{u(6)}月{u(6)}日{u(6)}时{u(6)}分</div>
        </div>
        <div>
            如果患者无法或不宜签署该知情同意书，请其授权的代理人或近亲亲属在此签名：{u(20)}
        </div>
        <div style={sign_style}>
            <div>患者授权的代理人或近亲亲属签名：{u(20)}</div>
            <div>与患者关系：{u(20)}</div>
        </div>
        <div style={sign_style}>
            <div>联系电话：{u(20)}</div>                         <div>签名时间: {u(6)}年{u(6)}月{u(6)}日{u(6)}时{u(6)}分</div>
        </div>
    </>
}

export function fuck_sign_doctor() {
    return <div style={sign_style}>
        <div>医生签名：{u(20)}</div>                           <div>签名时间：{u(6)}年{u(6)}月{u(6)}日{u(6)}时{u(6)}分</div>
    </div>
}