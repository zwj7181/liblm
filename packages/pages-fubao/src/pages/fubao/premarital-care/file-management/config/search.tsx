import { rt_ctx } from '@lm_fe/env';
import { defineFormConfig } from '@lm_fe/service';

const ctx = rt_ctx
export default defineFormConfig([
  { inputType: 'rangeDate', name: 'filingDay', label: '建档日期', props: {} },
  { inputType: 'Input', name: 'womanTelephone', label: '女方手机号码', props: { style: { width: 130 } } },
  { inputType: 'Input', name: 'womanName', label: '女方姓名', props: { style: { width: 130 } } },
  { inputType: 'Input', name: 'manTelephone', label: '男方手机号码', props: { style: { width: 130 } } },
  { inputType: 'Input', name: 'manName', label: '男方姓名', props: { style: { width: 130 } } },
])
