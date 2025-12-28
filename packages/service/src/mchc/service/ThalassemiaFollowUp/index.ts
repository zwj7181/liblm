
import { TIdTypeCompatible } from 'src/types'
import { ModelService } from '../../../ModelService'
import { IMchc_ThalassemiaFollowUp } from './types'









export const SMchc_ThalassemiaFollowUp = new
    (class extends ModelService<IMchc_ThalassemiaFollowUp>{
        async exportGet(params = {}) {
            return (await this._request<any>({ method: 'GET', url: '/api/thalassemiaFollowUp/exportThalassemiaFollowUp', responseType: 'blob', params })).data
        }
        async login(params: { id: TIdTypeCompatible, openId: string }) {
            return (await this._request<IMchc_ThalassemiaFollowUp>({ method: 'GET', url: '/api/thalassemiaFollowUp/mobile/login', responseType: 'blob', params })).data
        }
    })
    ({
        n: 'ThalassemiaFollowUp',
        prePath: '/thalassemiaFollowUp',
        useListSourceCount: true,
        // apiPrefix: '/api2'
    })
