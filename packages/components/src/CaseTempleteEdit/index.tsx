import { lazy } from 'react';
export { ICaseEditProps } from './types';
export { preload_tpl_editor } from './utils';
export { CaseTempleteEdit };

const CaseTempleteEdit = lazy(() => import('./Inner'))

