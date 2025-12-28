export const all_env: MchcTypes[] = ['临洮', '华医', '南医增城', '广三', '越秀妇幼', '建瓯', '潮汕', '郫都']

export type MchcType_default = 'mchc'
export type MchcType_越秀妇幼 = '越秀妇幼'
export type MchcType_广三 = '广三'
export type MchcType_南医增城 = '南医增城'
export type MchcType_华医 = '华医'
export type MchcType_临洮 = '临洮'
export type MchcType_建瓯 = '建瓯'
export type MchcType_潮汕 = '潮汕'
export type MchcType_郫都 = '郫都'


export type MchcTypes = MchcType_default | MchcType_越秀妇幼
  | MchcType_广三 | MchcType_南医增城 | MchcType_华医
  | MchcType_临洮 | MchcType_建瓯 | MchcType_潮汕 | MchcType_郫都

export type Common_Form_Config_Names = '门诊_建档' | '住院_登记'