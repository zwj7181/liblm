import React, { lazy, useEffect } from 'react'
import { IDoctorEnd_FurtherProps } from './DoctorEnd_FurtherPage'
const DoctorEnd_Further_ = lazy(() => import('./DoctorEnd_FurtherPage'))
export function DoctorEnd_Further(props: IDoctorEnd_FurtherProps) {
    useEffect(() => {
        return () => {}
    }, [])

    return <DoctorEnd_Further_ {...props} />
}
