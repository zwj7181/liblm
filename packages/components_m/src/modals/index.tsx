import React from 'react'
import { MountGlobalModal, GlobalModal } from '@lm_fe/components'
import { routesData } from './meta'

/**
 *
 * @deprecated 请从 core 导入：import { mchc_modal } from '@lm_fe/core' 。
 *
 * */
let mchcModal = new GlobalModal<typeof routesData>()
function MountMchcModal() {
    return <MountGlobalModal meta={routesData} globalModal={mchcModal} />
}
export { mchcModal, MountMchcModal }
