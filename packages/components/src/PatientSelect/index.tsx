import { mchcEvent } from '@lm_fe/env';
import { lazy, useEffect, useState } from 'react';
const PatientSelect = lazy(() => import('./Inner'))

export { PatientSelect, usePatientSelect }


function usePatientSelect<T>(name: string) {
    const [data, setData] = useState<T>()
    useEffect(() => {
        return mchcEvent.on_rm('my_form', e => {
            if (e.type !== 'onSearch' || e.name !== name || !e.value.data) return
            setData(e.value.data)
        })
    }, [])
    return [data]
}