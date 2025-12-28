import React, { lazy } from 'react';

export const collapsedWidth = 50;
export const width = 232;

const Inner = lazy(() => import('./Inner'))

export function Layout_Sider(props: any) {


    return <Inner {...props} />
}

