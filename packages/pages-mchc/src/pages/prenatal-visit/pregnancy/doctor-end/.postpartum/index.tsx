import React, { lazy, useEffect } from 'react'
import { IDoctorEnd_PostpartumProps } from './DoctorEnd_Postpartum'
const DoctorEnd_Further_ = lazy(() => import('./DoctorEnd_Postpartum'))
export function DoctorEnd_Postpartum(props: IDoctorEnd_PostpartumProps) {
    useEffect(() => {
        return () => {}
    }, [])

    return <DoctorEnd_Further_ {...props} />
}
