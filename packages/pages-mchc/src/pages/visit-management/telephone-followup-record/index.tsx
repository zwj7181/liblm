import React from "react";
import { lazy } from "react";

const Inner = lazy(() => import('./Inner'))
export default function RemindRecord(props: any) {
  return <Inner {...props} />
}
