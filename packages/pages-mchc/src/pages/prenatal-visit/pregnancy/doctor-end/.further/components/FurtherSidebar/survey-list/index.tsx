import React, { lazy } from "react";

const Inner = lazy(() => import('./Inner'))
export default function SurveyList(props: any) {
  return <Inner {...props} />
}
