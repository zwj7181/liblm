import { Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { IMultiTemplateProps } from './types';
import { MultiTemplateTemplateGroup } from './Templates';

const SPLIT_KEY = ' / '
export default function MultiTemplateInner(props: IMultiTemplateProps) {
    const { value = '', btn_text = '导入', onChange, style, type, MultiTemplate_type, modal_props = {}, rows = 3, disabled, defaultExpandAll, canOperate, ...others } = props
    const [_value, set_value] = useState(value)
    useEffect(() => {
        set_value(value)
    }, [value])
    const el = useRef<HTMLDivElement>(null)
    return <div ref={el} style={{ display: 'inline-block', position: 'relative', width: '100%' }}>

        <Button
            disabled={disabled}
            onClick={() => {
                window.mchc_modal?.open('test', {
                    ...{ modal_props },
                    getContainer: () => el.current!,
                    modal_data: {
                        content: <MultiTemplateTemplateGroup {...props} />
                    }
                })
            }}
            style={{}}
            {...others}
        >{btn_text}</Button>
    </div>
}

