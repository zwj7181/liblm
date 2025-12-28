import React from "react";
import { lazy } from "react";

const Inner = lazy(() => import('./Inner'))
export default function VaginaStruments(props: any) {
  return <Inner {...props} />
}
