import { AnyObject } from "@lm_fe/utils";
import { IBaseType } from "./common"
import ReconnectingWebSocket from "reconnecting-websocket";


interface IT1 {
    "id": number,
    "type": "DiagnosisRemind",
    "title": "梅毒(梅毒阳性/异常，是否添加梅毒诊断)",
    "level": 9,
    "handleTime": "2023-04-23 11:12:10",
    "data": {
        "content": "梅毒阳性/异常，是否添加梅毒诊断", "key": "梅毒"
    },
    "pregnancyId": 2919, "doctorId": 509, "handleType": "yes", "popUp": null, "ignores": string[]
}
interface IT2 {
    "id": number,
    "type": "RiskMark", "title": "高危因素标记",
    "level": 9, "handleTime": "2023-04-23 16:22:43",
    "data": {
        "highriskTree": {
            "key": null, "title": "遗传病史", "value": null, "level": null, "selected": null,
            "children": { "key": null, "title": "产前筛查有异常但产前诊断无异常", "value": "遗传病史:产前筛查有异常但产前诊断无异常", "level": "Ⅲ", "selected": true, "children": null }[]
        }[]
    }, "pregnancyId": 2919, "doctorId": 509, "handleType": "yes", "popUp": null, "ignores": null
}
interface IT3 {
    "id": number, "type": "DiagnosisRemind", "title": "漏诊提醒", "level": 1, "handleTime": null,
    "data": { "content": "HIV阳性，是否添加艾滋病诊断", "key": "艾滋病" }, "pregnancyId": 2919, "doctorId": 509, "handleType": null, "popUp": null, "ignores": null
}
interface IT4 { "type": "clean-msg", "isShow": true }
interface IT5 { "type": "RefreshPregnancyHeaderInfo", }


interface I_onChange extends IBaseType<'obis-doctor'> {
    event: 'open' | 'message' | 'error' | 'close'
    data?: IT1 | IT2 | IT3 | IT4 | IT5
    ins: ReconnectingWebSocket
}


interface I_onSearch extends IBaseType<'obis-globalRisk'> {
    event: 'open' | 'message' | 'error' | 'close'
    data?: AnyObject

}


export type IWs_Event = [I_onChange | I_onSearch]