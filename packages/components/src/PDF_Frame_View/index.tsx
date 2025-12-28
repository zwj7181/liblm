import { lazy, Suspense } from 'react';
import { IPdfFrameView_Props } from './types';
import React from 'react';

const PdfFrameViewInner = lazy(() => import('./Inner'))
export * from './types'

export { get_PdfFrameView_version } from './utils'

export function PdfFrameView(props: IPdfFrameView_Props) {
    return <Suspense fallback='加载中...'>

        <PdfFrameViewInner {...props} />
    </Suspense>
}