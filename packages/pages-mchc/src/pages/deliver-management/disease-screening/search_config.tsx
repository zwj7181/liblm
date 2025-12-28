
import { defineFormConfig, IMchc_FormDescriptions_Field, } from "@lm_fe/service";
import { mchcEnv, rt_ctx } from "@lm_fe/env";
const ctx = rt_ctx

export default defineFormConfig(
  [
    { label: '分娩日期', name: 'labourDate', inputType: 'rangeDate' },
    { label: '采血日期', name: 'bloodSamplingDate', inputType: 'rangeDate' },
    { label: '姓名', name: 'admissionCriteria.name', inputType: 'Input' },
    { label: '证件号码', name: 'admissionCriteria.idNO', inputType: 'Input' },


  ]
)