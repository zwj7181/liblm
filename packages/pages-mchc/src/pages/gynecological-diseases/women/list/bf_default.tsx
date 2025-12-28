import { defineFormConfig, IMchc_TableConfig } from '@lm_fe/service';


export const bf_default: Partial<IMchc_TableConfig> = {
    tableColumns: () => import('./config/table'),
    searchConfig: defineFormConfig(
        [
            { label: '门诊号', inputType: 'input', name: 'outpatientNO', },
            { label: '姓名', inputType: 'input', name: 'name', },
            { label: '证件号码', inputType: 'input', name: 'idNO', },
        ]
    ),
    name: '/api/gynecological-patients',
    showAction: 1,
}