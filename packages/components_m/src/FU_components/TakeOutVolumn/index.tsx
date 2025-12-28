import { lazy } from 'react'
import { TakeOutVolumn_DisplayFC } from './DisplayFC'

const Inner = lazy(() => import('./Inner'))

const TakeOutVolumn = Object.assign(Inner, { DisplayFC: TakeOutVolumn_DisplayFC })

export { TakeOutVolumn }