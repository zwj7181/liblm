import React, { lazy } from 'react';

const StatisticsManagementInner = lazy(() => import('./Inner'));

export default function StatisticsManagement(props:any) {
  return (
    <React.Suspense fallback={null}>
      <StatisticsManagementInner {...props} />
    </React.Suspense>
  );
}
