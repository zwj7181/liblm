import { mchcEvent, mchcUtils } from '@lm_fe/env';
import { DoctorEnd_检验检查_History } from '@lm_fe/pages';
import React from 'react';
import { IInitial_Tab_props } from '../../types';

export default function JianYanJianCha(props: IInitial_Tab_props) {
  const { form, active, disabled_save } = props
  const id = mchcUtils.single_id()
  return active ? <DoctorEnd_检验检查_History
    on_finish={() => mchcEvent.emit('outpatient', { type: '刷新头部' })}
    disabled={disabled_save}
    form={form}
    pregnancyId={id}
  /> : null
}
Object.assign(JianYanJianCha, {
  Title: '检验检查',
  ClassName: 'yi-ban-bing-shi label-width6',
  tmp: true
})