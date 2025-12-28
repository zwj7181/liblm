import { resolveFubaoPath } from "@lm_fe/components_m";
import { mchcEnv } from "@lm_fe/env";
import { mchcModal__ } from "@lm_fe/pages";
import { SLocal_History } from "@lm_fe/service";
import { FormInstance } from "antd";
import { get, keys, values } from "lodash";
function 本次孕产信息一键勾选keys() {
    if (mchcEnv.is('建瓯')) {
        return [
            'dysmenorrhea__', 'nearRelation__', 'smoke__', 'alcohol__', 'hazardoussubstances__', 'medicine__', 'radioactivity__',
            'pregnancyReaction', 'fetalMovement', 'medicineNote', 'virusInfection', 'oralContraceptive', 'morningSickness', 'vaginalBleeding', 'fever'

        ]
    }

    return ['dysmenorrhea__', 'nearRelation__', 'smoke__', 'alcohol__', 'hazardoussubstances__', 'medicine__', 'radioactivity__',
        'hypertension__', 'diabetes__', 'operationmh__', 'cardiacDisease__']
}

// Form onValuesChange
export async function archivalInformation_onValuesChange(changedValues: any, allValues: any, form: FormInstance, setRequiredKeys: (v: { [x: string]: boolean }) => void) {


    const { __key, __value } = getKeyAndValue(changedValues)
    console.log('vv changedValues', __key, __value, changedValues)

};
function getKeyAndValue(changedValues: any) {
    const key1 = keys(changedValues)[0]
    const value1 = values(changedValues)[0]
    const value1KeysArr = keys(value1)
    if (value1KeysArr.length > 1) {
        return { __key: key1, __value: value1 }
    }
    const key2 = value1KeysArr[0]
    const __key = [key1, key2].filter(_ => _).join('.')
    const __value = get(changedValues, __key)

    return { __key, __value }
}
export function archivalInformation_onPrint(id: any) {
    mchcModal__.open('print_modal', {
        modal_data: {
            requestData: {
                url: '/api/pdf-preview',
                resource: 'prenatalVisit',
                template: '',
                version: '',
                note: '',
                id,
            }
        }
    })
}
export function archivalInformation_onClose() {

    // SLocal_History.closeAndReplace(resolveFubaoPath('/fubao/gynecological-diseases/two-cancers'))

    SLocal_History.closeAndPush(resolveFubaoPath(`/gynecological-diseases/two-cancers`))

}