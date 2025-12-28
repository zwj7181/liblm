import { lazy } from 'react';
export { EditorProps } from './types';
const Editor = lazy(() => import('./Inner'));
export default Editor;