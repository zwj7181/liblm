import React, { lazy, Suspense } from 'react';

const Inner = lazy(() => import('./Resizeable_Inner'));

const ResizableTitle = (props: any) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Inner {...props} />
  </Suspense>
);

export { ResizableTitle };