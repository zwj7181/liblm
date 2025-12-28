import { ModelService } from "../../../ModelService";
import { SFubao_CervicalCancerRecord } from "../CervicalCancerRecord";
import { IFubao_CervicalCancerScreening } from './type';
import { processTwoCancer_local, processTwoCancer_remote } from "./utils";
export * from './type';

class CervicalCancerScreening_Service extends ModelService<IFubao_CervicalCancerScreening> {
    async getOne(id: any) {
        let res = await this.getList({ params: { id } })
        const data = res[0]
        return processTwoCancer_remote(data)
    }
    async postOrPut(_data: IFubao_CervicalCancerScreening) {
        const isPut = !!_data.id
        const commitData = processTwoCancer_local(_data)
        let data: IFubao_CervicalCancerScreening
        if (isPut) {
            data = await this.put(commitData, {})
        } else {
            data = await SFubao_CervicalCancerRecord.post(commitData, {})
        }
        return processTwoCancer_remote(data)
    }
}

export const SFubao_CervicalCancerScreening = new CervicalCancerScreening_Service({
    // apiPrefix: '/fb/api',
    prePath: '/two/cancer/screening',
    n: 'CervicalCancerScreening',
})