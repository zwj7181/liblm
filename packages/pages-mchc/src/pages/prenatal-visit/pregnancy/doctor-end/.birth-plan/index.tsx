import React, { lazy, useEffect } from "react";
import { IDoctorEnd_QQProps } from "./types";
const Inner = lazy(() => import('./Inner'))
export function DoctorEnd_QQ(props: IDoctorEnd_QQProps) {
  return <Inner  {...props} />
}