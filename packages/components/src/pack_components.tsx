import { packs } from '@noah-libjs/components'
import { MyAddress } from './MyAddress'
import { MyImageEditor } from './MyImageEditor'
import { PatientSelect } from './PatientSelect'
import { ArraySingle } from './ArraySingle'

export * from './MyAddress'
export * from './MyImageEditor'
export * from './PatientSelect'
export const pack_components = {
    ...packs,
    MyAddress,
    MyImageEditor,
    ArraySingle,
    PatientSelect
}
