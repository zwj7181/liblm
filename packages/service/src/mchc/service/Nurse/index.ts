import { request } from "@lm_fe/utils"
import { ModelService } from "src/ModelService"
import { TIdTypeCompatible, } from "src/types"

import { IMchc_Nurse_OutpatientDocument } from './types'
import { process_OutpatientDocument_local, process_OutpatientDocument_remote } from "./utils"

export * from './types'
export * from './utils'

export class Mchc_Nurse_Service extends ModelService {

    async getOutpatientDocument(id: TIdTypeCompatible) {
        const params = { id }
        const { data } = await request.get<IMchc_Nurse_OutpatientDocument>('/api/nurse/getOutpatientDocument', { params });
        return process_OutpatientDocument_remote(data)
    }
    async newOutpatientDocument(_data: IMchc_Nurse_OutpatientDocument) {

        const { data } = await request.post<IMchc_Nurse_OutpatientDocument>('/api/nurse/newOutpatientDocument', process_OutpatientDocument_local(_data));
        return process_OutpatientDocument_remote(data)
    }
    async updateOutpatientDocument(_data: IMchc_Nurse_OutpatientDocument) {

        const { data } = await request.put<IMchc_Nurse_OutpatientDocument>('/api/nurse/updateOutpatientDocument', process_OutpatientDocument_local(_data));
        return process_OutpatientDocument_remote(data)
    }

}

export const SMchc_Nurse = new Mchc_Nurse_Service


