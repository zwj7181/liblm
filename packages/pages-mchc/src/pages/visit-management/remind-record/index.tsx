import React from "react";
import { lazy } from "react";
import { RemindType } from "./types";

export const RemindRecordInner = lazy(() => import('./Inner'))
export default function RemindRecord(props: any) {
  return <RemindRecordInner {...props} remindType={1} />
}
