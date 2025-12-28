
import React, { lazy } from 'react'

import { IProps } from './types'
const Inner = lazy(() => import('./Inner'))
export default function Gaopaiyi_List(props: IProps) {
  return <Inner {...props} />
}


