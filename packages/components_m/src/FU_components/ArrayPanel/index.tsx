import { lazy } from 'react'
import { ArrayPanel_DisplayFC } from './Display'

const Inner = lazy(() => import('./Inner'))

const ArrayPanel = Object.assign(Inner, { DisplayFC: ArrayPanel_DisplayFC })

export { ArrayPanel }
