import { mchcLogger } from "@lm_fe/env";
import { ModelService } from "../../../ModelService";
import { SFubao_BreastCancerRecord } from "../BreastCancerRecord";
import { IFubao_BreastCancerScreening } from './type';
import { processTwoCancer_local, processTwoCancer_remote } from "./utils";
import { TIdType, TIdTypeCompatible } from "src/types";
export * from './type';

class BreastCancerScreening_Service extends ModelService<IFubao_BreastCancerScreening> {
    async getOne(id: any) {
        let res = await this.getList({ params: { id } })
        const data = res[0]
        return processTwoCancer_remote(data)
    }



    async new_post(_data: { breastCancerScreening: IFubao_BreastCancerScreening, twoCancerScreeningId: TIdTypeCompatible }) {
        mchcLogger.log('abc 1', { _data })


        let data: IFubao_BreastCancerScreening
        _data.breastCancerScreening = processTwoCancer_local(_data.breastCancerScreening)
      
        data = await SFubao_BreastCancerRecord.post(_data as any, { successText: '操作成功！' })
        return processTwoCancer_remote(data)
    }
    async new_put(_data: IFubao_BreastCancerScreening) {
        mchcLogger.log('abc 1', { _data })


        let data: IFubao_BreastCancerScreening
        const commitData = processTwoCancer_local(_data)

        mchcLogger.log('abc 2', { commitData })

        data = await this.put(commitData, { successText: '操作成功！' })

        return processTwoCancer_remote(data)
    }
}

export const SFubao_BreastCancerScreening = new BreastCancerScreening_Service({
    // apiPrefix: '/fb/api',
    prePath: '/two/cancer/screening',
    n: 'BreastCancerScreening',
})