import { ModelService } from "../../../ModelService";
import { IFubao_CervicalCancerScreening } from "../CervicalCancerScreening";
import { processTwoCancer_local, processTwoCancer_remote } from "./utils";
export * from './type';

class CervicalCancerRecord_Service extends ModelService<IFubao_CervicalCancerScreening> {
    async getOne(id: any) {
        let res = await this.getFuckPage({ params: { id } })
        const data = res.pageData[0]
        return processTwoCancer_remote(data)
    }
    async postOrPut(_data: IFubao_CervicalCancerScreening) {

        let data = await this[_data.id ? 'put' : 'post'](processTwoCancer_local(_data))
        return processTwoCancer_remote(data)
    }
}

export const SFubao_CervicalCancerRecord = new CervicalCancerRecord_Service({
    // apiPrefix: '/fb/api',
    prePath: '/two/cancer/screening',
    n: 'CervicalCancerRecord',
})