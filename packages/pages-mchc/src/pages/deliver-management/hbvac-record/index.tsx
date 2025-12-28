import React from "react";
import { lazy } from "react";

const Inner = lazy(() => import('../bgg-record/Inner'))

export default function () {
	return <Inner type='hbvac' />
}
