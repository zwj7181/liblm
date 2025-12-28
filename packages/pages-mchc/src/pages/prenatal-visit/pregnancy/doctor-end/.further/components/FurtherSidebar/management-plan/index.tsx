import React, { lazy } from "react";

const Inner = lazy(() => import('./Inner'))
export default function ManagementPlan(props: any) {
  return <Inner {...props} />
}
