import React, { lazy } from 'react';

const StatisticsManagementInner = lazy(() => import('./chart-type-inner'));

export default function StatisticsManagement(props:any) {
  return (
    <React.Suspense fallback={null}>
      <StatisticsManagementInner {...props} />
    </React.Suspense>
  );
}
