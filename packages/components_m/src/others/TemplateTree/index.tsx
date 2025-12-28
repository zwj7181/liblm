import { lazy } from "react";
import { IndexProps } from "./types";
import React from "react";

const Inner = lazy(() => import('./Inner'))

export default function TemplateTree(props: IndexProps) {
  return <Inner {...props} />
}