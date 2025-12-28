import React, { lazy } from "react";

export { ILayout_TabButton_Props } from './types'

export const Layout_TabButton = lazy(() => import('./Inner'))
