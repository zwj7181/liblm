import React, { lazy } from "react";

const Inner = lazy(() => import('./Inner'))
export default function DiagTable(props: any) {
  return <Inner {...props} />
}
