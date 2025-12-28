
import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { event, asRequest as request } from '@lm_fe/utils';
import { SZsy_CtgRecord } from '@lm_fe/service';

const info = message.info



export default function useSign() {



    const [qrCodeBase64, setQrCodeBase64] = useState('')
    const [qrCodeBase64Loading, setQrCodeBase64Loading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [signed, setSigned] = useState(false)
    const [qrCodeIdentity, setQrCodeIdentity] = useState<string>()
    // const [qrCodeExpireTime, setQrCodeExpireTime] = useState(0)
    const fetchSigninfo = useCallback(
        () => {
            if (qrCodeIdentity) {
                SZsy_CtgRecord.confirmQrCode(qrCodeIdentity)
                    // request.post('/ca/signinfo', { bizSn: fuck_BizSn, })

                    .then(({ verifyStatus, userToken }) => {

                        if (verifyStatus !== 1) {
                            setModalVisible(false)
                            if (verifyStatus == 0) {
                                setSigned(true)
                                info('签名成功')
                                event.emit('signed', qrCodeIdentity, userToken)
                            } else {
                                info('签名失败')
                            }
                        }
                    })
            }

        },
        [qrCodeIdentity, ,],
    )

    useEffect(() => {
        let timeoutId = modalVisible && setInterval(fetchSigninfo, 1500)
        return () => {
            timeoutId && clearInterval(timeoutId)
        }
    }, [modalVisible, fetchSigninfo])



    const fetchQrCode = (note: string) => {
        setQrCodeBase64Loading(true)

        SZsy_CtgRecord.getQrCode(note)
            // request.post<any>('/ca/signreq', { note, })
            .then((r) => {

                const {
                    qrCodeIdentity,
                    qrCodeBase64,
                } = r
                if (qrCodeIdentity && qrCodeBase64) {
                    setModalVisible(true)
                    setQrCodeIdentity(qrCodeIdentity)
                    setQrCodeBase64(qrCodeBase64)
                } else {
                    message.warning('服务错误！')
                }
            })
            .finally(() => setQrCodeBase64Loading(false))
    }





    return {
        fetchQrCode, qrCodeBase64, modalVisible, setModalVisible, qrCodeBase64Loading, signed
    }
}
