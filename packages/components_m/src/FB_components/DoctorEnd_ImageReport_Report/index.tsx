import React from "react";
import { lazy } from "react";
import { IProps } from "./types";

const Inner = lazy(() => import('./Inner'))
export function DoctorEnd_ImageReport_Report(props: IProps) {
    return <Inner {...props} />
}
