import { request } from "@lm_fe/utils"
import { IMchc_FormDescriptions } from "@noah-libjs/components"
export { IMchc_FormDescriptions, IMchc_FormDescriptions_Field, IMchc_FormDescriptions_Field_Nullable, IMchc_FormDescriptions_Field_Nullable_Arr, IMchc_FormDescriptions_FilterType, IMchc_FormDescriptions_InputProps, IMchc_FormDescriptions_MIX, T_FormConfig_Loader } from '@noah-libjs/components'










// import commonStyles from '../themes/common.less'



export const SMchc_FormDescriptions = {
    getModule(moduleName: string,) {
        return request.get<IMchc_FormDescriptions<true>[]>('/api/form-descriptions', { params: { moduleName } })
            .then(res => res.data)
    },
    getModuleCache(moduleName: string,) {
        return request.get<IMchc_FormDescriptions<true>[]>('/api/form-descriptions', { params: { moduleName } })
            .then(res => res.data)
    },
    getModuleParse(moduleName: string,) {
        return request.get<IMchc_FormDescriptions<true>[]>('/api/form-descriptions', { params: { moduleName } })
            .then(res => res.data)
    },
    getModuleParseCache(moduleName: string,) {
        return request.get<IMchc_FormDescriptions<true>[]>('/api/form-descriptions', { params: { moduleName } })
            .then(res => res.data)
    }
}

