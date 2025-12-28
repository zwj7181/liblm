import React, { useEffect } from 'react';

import { message, Modal, notification } from 'antd';
import { mchcEvent, mchcLogger } from '@lm_fe/env';



export function MessageHolder() {

    const [messageApi, messageHolder] = message.useMessage();
    const [modalApi, modalHolder] = Modal.useModal();
    const [notiApi, notiHolder] = notification.useNotification();
    useEffect(() => {

        const rm1 = mchcEvent.on_rm('toast', ({ msg, type, duration, cb }) => {

            messageApi[type](msg, duration, cb);

        });
        const rm2 = mchcEvent.on_rm('confirm', (e) => {
            mchcLogger.log('confirm', e)
            const { type, ...modal_props } = e
            modalApi[type](modal_props)

        });
        const rm3 = mchcEvent.on_rm('notify', (e) => {
            mchcLogger.log('notify', e)
            const { type, ...modal_props } = e
            notiApi[type](modal_props)

        });
        return () => {
            rm1()
            rm2()
            rm3()
        }
    }, []);


    return <>

        {messageHolder}
        {modalHolder}
        {notiHolder}

    </>;

}



