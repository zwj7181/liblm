import React from "react";
import { lazy } from "react";
import { IProps } from "./types";

const ReportEntryInner = lazy(() => import('./Inner'))

export { ReportEntryInner }
export default (props: IProps) => <ReportEntryInner {...props} />