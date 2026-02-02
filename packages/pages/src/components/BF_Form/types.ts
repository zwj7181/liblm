import { IMchc_TableConfig } from "@lm_fe/service"

export type IBF_Default = Partial<Omit<IMchc_TableConfig, 'title'>> & { title?: `${string}-${string}` }
export interface IBF_props {
    // title: string
    // history_args?: { relationId: any }
    default_conf?: IBF_Default
}