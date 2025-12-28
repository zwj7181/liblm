import { MyLazyComponent } from "@lm_fe/components";
import React from "react";
import { lazy } from "react";

const Inner = lazy(() => import('./Inner'))
export default function DoctorEnd_TemplateTree(props: any) {
  return <MyLazyComponent>
    <Inner {...props} />
  </MyLazyComponent>
}