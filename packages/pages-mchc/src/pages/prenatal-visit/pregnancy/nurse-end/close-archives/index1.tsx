import React from "react";
import { lazy } from "react";

const Inner = lazy(() => import('./Inner'))
export default function ClosingArchives(props: any) {
  return <Inner {...props} />
}
export { ClosingArchives }
