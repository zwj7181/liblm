import { lazy } from 'react'
import { TakeInVolumn_DisplayFC } from './DisplayFC'

const Inner = lazy(() => import('./Inner'))

const TakeInVolumn = Object.assign(Inner, { DisplayFC: TakeInVolumn_DisplayFC })

export { TakeInVolumn }
