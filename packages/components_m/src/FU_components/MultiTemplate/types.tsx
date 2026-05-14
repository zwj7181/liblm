import { ITemplateConfig } from '@lm_fe/env';
import { IMchc_FormDescriptions_Field } from '@lm_fe/service';
import { AnyObject } from '@lm_fe/utils';
import { ButtonProps, ModalProps } from 'antd';
import React from 'react';
export interface IMultiTemplateType {
    label: string
    params?: AnyObject
}
export interface IRemoteTemplates {

    description: string
    id: number
    type: string
    data: { title: string, [x: string]: any }[]
}
export interface IMultiTemplateProps extends ButtonProps {
    value?: string
    url?: string
    onChange?(v: any): void
    params: AnyObject
    style?: React.CSSProperties
    rows?: number
    canOperate?: boolean
    defaultExpandAll?: boolean
    MultiTemplate_type?: IMultiTemplateType[]
    btn_text?: string
    modal_props?: ModalProps
    fds: IMchc_FormDescriptions_Field[]

}
