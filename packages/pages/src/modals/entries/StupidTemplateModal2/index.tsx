import { IGlobalModalProps } from '@lm_fe/components';
import { IMchc_TemplateTree_Item as IModel_TemplateTrees } from '@lm_fe/service';
import { Modal, TreeProps } from 'antd';
import React from 'react';
// import { AllTypes } from '../../../FU_components/SimpleForm/types/metaTypes';





export const DEFAULT_URL = '/api/template-trees';
interface IProps<T> {
    depid?: any
    type?: number | { value: number, label: string }[]
    canOperate?: boolean
    onValueCheck?: (e: IModel_TemplateTrees[]) => void
    renderTitle?: (item: IModel_TemplateTrees) => React.ReactNode
    treeProps?: TreeProps
    multiple?: boolean
    hierarchical?: boolean
    editFormItems?: any[]
}
export default function TemplateModal2(props: IGlobalModalProps<IProps<IModel_TemplateTrees>>) {
    const { modal_data, onCancel, onOk, ...others } = props



    return (
        <Modal
            width={1100}
            {...others}

        >


        </Modal >
    );
}

