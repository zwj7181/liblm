import React from "react";
import { lazy } from "react";

const Inner = lazy(() => import('./Inner'))
export default function List(props: any) {
    return <Inner {...props} />
}