import React, { lazy } from 'react';
const Questionnaire = lazy(() => import('./Inner'))
// import { Questionnaire, message } from 'antd';
export * from './Qn';
export * from './SelectButton';
export * from './types';

