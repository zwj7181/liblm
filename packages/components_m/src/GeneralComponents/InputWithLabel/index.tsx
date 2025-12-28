import { lazy } from 'react';
export { IInputWithLabelProps } from './types';
// 通用的单个输入框
const GeneralComponents_InputWithLabel = lazy(() => import('./Inner'))
export { GeneralComponents_InputWithLabel }
export default GeneralComponents_InputWithLabel