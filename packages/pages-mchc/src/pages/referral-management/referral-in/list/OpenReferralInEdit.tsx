import { OkButton } from "@lm_fe/components_m";
import { mchcEnv, rt_ctx } from "@lm_fe/env";
import { IBF_props, mchcModal__, use_duck_form } from "@lm_fe/pages";
import { IMchc_Pregnancy, ModelService, TIdTypeCompatible } from "@lm_fe/service";
const ctx = rt_ctx
const React = ctx.React
export function base_referral_conf(title: `${string}-${string}`, referralType: 1 | 2) {
    return {
        default_conf: {
            title,
            tableColumns: () => import('./config/table').then(r => r.form_config(referralType === 2)),
            searchParams: {
                'referralType.equals': referralType,
            },
            handleBeforePopup(val) {


                return Object.assign({}, val, { referralType: ctx.props.referral_type, recorder: val.recorder || window.mchcEnv.user_data.firstName })
            },
            searchConfig: [
                { label: '转诊时间', name: 'referralDate', inputType: 'rangeDate' },
                { label: '类型', name: 'referralDirection', inputType: 'MS', inputProps: { options: '平级,上级,下级' } },
                { label: '姓名', name: 'pregnancyName', inputType: 'Input' },
            ],
            name: '/api/referrals'
        }
    } as IBF_props
}
interface IProps {
    item: { id?: TIdTypeCompatible, pregnancy?: IMchc_Pregnancy, referralType?: number }
    save_cb?(): void
}
export function OpenReferralInEdit({ item, save_cb }: IProps) {
    item.referralType = 2
    const { node, fetcher } = use_duck_form({
        name: '/api/referrals',
        init_values: item,
        bf_conf: base_referral_conf('转入登记-列表', 2),
        save_cb,
        referral_type: 2
    })

    function open_modal() {
        mchcModal__.open('box', {
            modal_data: {
                content: node
            }
        })
    }

    return <OkButton onClick={open_modal}>转入管理</OkButton>
}