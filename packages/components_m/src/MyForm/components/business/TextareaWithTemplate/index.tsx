import React from "react";
import { lazy } from "react";
import { ITextareaWithTemplateProp } from "./types";

const TextareaWithTemplate_Inner = lazy(() => import('./Inner'))

export default function TextareaWithTemplate(props: ITextareaWithTemplateProp) {
  return <TextareaWithTemplate_Inner {...props} />
}
