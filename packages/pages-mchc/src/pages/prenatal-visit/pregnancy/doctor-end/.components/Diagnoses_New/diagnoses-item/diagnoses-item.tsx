import React from "react";
import { lazy } from "react";
import { IDiagnosesItem_Props } from "./types";

const Inner = lazy(() => import('./Inner'))
export default function DiagnosesItem(props: IDiagnosesItem_Props) {
  return <Inner {...props} />
}
