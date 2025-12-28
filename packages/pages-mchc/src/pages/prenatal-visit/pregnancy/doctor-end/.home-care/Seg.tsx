import { Segmented } from 'antd';
import React, { FC, useState } from 'react';
import { IHomeCareProps } from './types';
type Type = '统计' | '记录'


export function Seg(props: { Static: FC<IHomeCareProps>, Record: FC<IHomeCareProps> } & IHomeCareProps) {
    const [key, set_key] = useState<Type>('统计')

    const Comp = key === '统计' ? props.Static : props.Record

    return (
        <>
            <Segmented<Type> options={['统计', '记录']} value={key} onChange={set_key} />
            <Comp  {...props} />
        </>
    );
}
