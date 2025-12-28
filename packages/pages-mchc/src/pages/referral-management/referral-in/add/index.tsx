// import { formDescriptionsFromApi, formDescriptionsWithoutSectionApi, fromApi as defaultFromApi } from '@/utils/adapter';
import { use_duck_form } from '@lm_fe/pages';
import { TIdTypeCompatible } from '@lm_fe/service';
import { getSearchParamsValue, request } from '@lm_fe/utils';
import { base_referral_conf } from '../list/OpenReferralInEdit';

export default function ReferralIn(props: { id?: TIdTypeCompatible, pregnancy?: any }) {
  const id = getSearchParamsValue('id') || props.id
  const pregnancy = props.pregnancy
  const { node, fetcher } = use_duck_form({
    name: '/api/referrals',
    init_values: {
      pregnancy,
      id,
      referralType: 2
    },
    bf_conf: base_referral_conf('转入登记-列表', 2),
    save_cb() { }
  })
  return node
}