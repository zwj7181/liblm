
import { BF_Wrap2, MyBaseList } from '@lm_fe/pages';
import React from 'react';
import { base_referral_conf } from '../../referral-in/list/OpenReferralInEdit';

export default () => {
  const { config, Wrap } = BF_Wrap2(base_referral_conf('转出登记-列表', 1), { referral_type: 1 })

  return <Wrap>
    <MyBaseList bf_conf={config} />

  </Wrap>
}