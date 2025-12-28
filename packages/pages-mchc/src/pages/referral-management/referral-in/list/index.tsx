
import { BF_Wrap2, MyBaseList } from '@lm_fe/pages';
import { assign, set } from '@lm_fe/utils';
import React from 'react';
import { base_referral_conf } from './OpenReferralInEdit';

export default () => {
  const { config, Wrap } = BF_Wrap2(base_referral_conf('转入登记-列表', 2), { referral_type: 2 })
  return <Wrap>
    <MyBaseList bf_conf={config} />

  </Wrap>
}