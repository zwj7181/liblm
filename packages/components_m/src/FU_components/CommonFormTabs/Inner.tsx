import React, { useEffect } from 'react';
// import { FormSectionForm } from '../../BaseModalForm/FormSectionForm';
import { MyFormSectionForm } from '../FormSection/FormSectionForm';
import CommonFormTabs from './CommonFormTabs';
import { IFormTabsProps } from './types';
import { useFormTabs } from './utils';

function _FormTabs<T = any>(props: IFormTabsProps<T>) {
    const { value = [], fds = [], onChange, on_row_value_change, form, FormSize, disabled } = props
    const { forms: _forms } = useFormTabs()
    const forms = props.forms || _forms
    useEffect(() => {
        if ([value, forms].every(Array.isArray)) {
            value.forEach((v, idx) => {
                const f = forms[idx]
                f?.setFieldsValue(v)

            })
        }
        return () => {

        }
    }, [value])




    return <div style={{}}  >

        <CommonFormTabs<any>
            renderTabNode={(data, index) => {
                return (
                    <MyFormSectionForm disableAll={disabled} size={FormSize} form={forms[index]} data={data} formDescriptions={fds} onValuesChange={(changed_item, item) => {
                        // debugger
                        value[index] = { ...data, ...item } as any
                        // onChange?.([...value],)
                        onChange?.(value,)
                        on_row_value_change?.(value, index, changed_item, form)
                    }} />
                )
            }}
            {...props}

        />



    </div>
}

export default _FormTabs