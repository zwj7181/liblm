import { BF_Wrap2, MyBaseList } from "@lm_fe/pages";
import React from "react";
import { rt_ctx } from "@lm_fe/env";
const ctx = rt_ctx
export default function TaskTest() {

  return <MyBaseList table_preset={{
    title: '宣教随访-宣教任务管理',
    tableColumns: () => import('./form_config'),
    searchConfig: () => import('./search_config'),
    name: '/api/knowledge-tasks',
    beforeSubmit(v: any) {
      if (ctx.utils.isObject(v.pregnantLimitsNote)) {
        v.pregnantLimitsNote = ctx.utils.safe_json_stringify(v.pregnantLimitsNote)
      }
      if (ctx.utils.isObject(v.pushTime)) {
        v.pushTime = ctx.utils.safe_json_stringify(v.pushTime)
      }
      return v
    },
    handleBeforePopup(v: any) {
      if (v.pregnantLimitsNote) {
        v.pregnantLimitsNote = ctx.utils.safe_json_parse(v.pregnantLimitsNote)
      }
      if (v.pushTime) {
        v.pushTime = ctx.utils.safe_json_parse(v.pushTime)
      }
      return v
    }
  }} />
}