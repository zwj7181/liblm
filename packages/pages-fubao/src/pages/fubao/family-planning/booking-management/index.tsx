import React, { lazy, Suspense } from 'react';

const Inner = lazy(() => import('./Inner'));

const BookingManagement = (props:any) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Inner {...props} />
  </Suspense>
);

export default BookingManagement;