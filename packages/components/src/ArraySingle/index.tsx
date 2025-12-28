import { ArraySingle as ArraySingleRaw, IArraySingleProps, TCommonComponent } from '@noah-libjs/components';
import React, { lazy } from 'react';


export const ArraySingle: TCommonComponent<IArraySingleProps, string> = lazy(() => import('./Inner'))

ArraySingle.DisplayFC = ArraySingleRaw.DisplayFC
