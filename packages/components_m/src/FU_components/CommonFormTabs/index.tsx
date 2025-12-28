import { lazy } from "react";
import { DisplayFC } from "./DisplayFC";
export * from './types';
export * from './utils';
const _FormTabs = lazy(() => import('./Inner'))
const CommonFormTabs = lazy(() => import('./CommonFormTabs'))
const FormTabs = Object.assign(_FormTabs, { DisplayFC })

export { CommonFormTabs, FormTabs };

