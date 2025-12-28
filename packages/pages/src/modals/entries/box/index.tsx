import { Modal } from 'antd';
import React, { ReactNode } from 'react'
import { IGlobalModalProps } from '@lm_fe/components';
export interface Iprops {
    content: ReactNode
}
export default function Box({ modal_data, visible, ...others }: IGlobalModalProps<Iprops>) {
    const { content } = modal_data

    return (
        <Modal

            title="Test"
            open={visible}
            centered
            {...others}

        >
            {content}
        </Modal>
    );
};