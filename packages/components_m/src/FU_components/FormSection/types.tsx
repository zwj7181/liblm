import { IMchc_FormDescriptions_MIX, IMchc_TableConfig } from '@lm_fe/service';
import { FormInstance, FormItemProps } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';
import { RenderEditItem } from './utils';
import { AnyObject } from '@lm_fe/utils';

// import commonStyles from '../themes/common.less'
export interface IFormSectionProps {
    onLoad?(): void
    needControl?: boolean
    renderEditItem?: (key: string, ReactNode: React.ReactNode, others?: FormItemProps) => React.ReactNode
    renderEditItemInner?: typeof RenderEditItem
    formDescriptions?: IMchc_FormDescriptions_MIX
    initialValues?: AnyObject
    formName?: string
    data?: any
    extraData?: any
    form?: FormInstance
    events?: any
    disableAll?: boolean
    defaultOptions?: FormItemProps
    size?: SizeType
    sectionName?: string
    span?: number
    inline?: boolean
    targetLabelCol?: number // 标签占据的 span, 默认是 2
    defaultFormItemLayout?: string
    defaultRequired?: boolean
    requiredKeys?: { [x: string]: boolean }
    bf_config?: IMchc_TableConfig

}


