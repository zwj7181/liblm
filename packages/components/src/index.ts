// export * from './style'
import './config'

export * from '@noah-libjs/components'
export * from './hooks'
export * from './utils'
export * from './LazyAntd'
export * from './pack_components'
export * from './PDF_Frame_View'
export * from './SimpleForm'
export * from './CaseTempleteEdit'
export * from './CaseTempleteEditEmr'


export function get_echarat()
{
    return import('echarts');
}
(window as any).get_echarat = get_echarat;
