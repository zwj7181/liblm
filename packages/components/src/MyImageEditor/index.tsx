import React, { lazy } from 'react';
import { MyLazyComponent } from '../MyLazyComponent';
import { IMyImageEditorProps, MyImageEditorEvents } from './utils';
const GynaecologyImageEditorInner = lazy(() => import('./Inner'))

function MyImageEditor__(props: IMyImageEditorProps) {
  return <MyLazyComponent>
    <GynaecologyImageEditorInner {...props} />
  </MyLazyComponent>
}



const MyImageEditor = Object.assign(MyImageEditor__, { events: MyImageEditorEvents })
const GynaecologyImageEditor = MyImageEditor

export { IMyImageEditorProps, MyImageEditorEvents, MyImageEditor, GynaecologyImageEditor }





