import React from "react";
import { lazy } from "react";

const Inner = lazy(() => import('./Inner'))
export function DoctorEnd_ImageReport(props: any) {
  return <Inner {...props} />
}
