import React, { FC, useEffect, useState } from 'react';
import { m } from './meta';
import { IBaseProps } from './types';
import { stupidModal } from './GlobalModal'
export default function MountStupidModal(props: {}) {

    // useNotification()
    const [modalQueue, setModalQueue] = useState<{ name: string, data: IBaseProps<{}>, id: number }[]>([])

    function setName(name: string, data: any) {
        modalQueue.push({ name, data, id: +new Date() })
        setModalQueue([...modalQueue])

    }

    useEffect(() => {
        stupidModal.open = setName
        stupidModal.pop = (status?: boolean) => {
            const last = modalQueue.pop()

            last?.data?.onClose?.call(null, status)

            setModalQueue([...modalQueue])
        }
        stupidModal.destroyAll = () => {
            setModalQueue([])
        }
    }, [modalQueue])
    // function remove(id: number) {
    //     const idx = modalQueue.findIndex(_ => _.id === id)
    //     if (idx > -1) {
    //         modalQueue.splice(idx, 1)
    //         setModalQueue([...modalQueue])
    //     }
    // }

    return (
        <>
            {
                modalQueue.map(({ name, data, id }) => {
                    const C: FC<IBaseProps<any>> = m[name] || (() => null)
                    function close(status?: boolean) {
                        stupidModal.pop(status)

                    }
                    return <C key={id} visible centered {...data}
                        close={close}
                        onOk={() => close(true)}
                        onCancel={() => close(false)} />
                })
            }
        </>
    );
}
export * from './GlobalModal'
