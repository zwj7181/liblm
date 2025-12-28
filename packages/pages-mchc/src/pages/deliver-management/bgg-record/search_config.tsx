
import { rt_ctx } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx

export default defineFormConfig(
  [
    { label: '分娩日期', name: 'labourDate', inputType: 'rangeDate' },
    { label: '接种日期', name: 'vaccinationDate', inputType: 'rangeDate' },
    { label: '姓名', name: 'admissionCriteria.name', inputType: 'Input' },
    { label: '证件号码', name: 'admissionCriteria.idNO', inputType: 'Input' },
    { label: '是否接种', name: 'vaccination', inputType: 'MS', filterType: 'equals', inputProps: { options: ctx.mchcEnv.get_other_options('nyOptions') } },

  ]
)