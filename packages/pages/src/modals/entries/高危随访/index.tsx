import { IGlobalModalProps } from '@lm_fe/components';
import { TIdTypeCompatible } from '@lm_fe/service';
import { request } from '@lm_fe/utils';
import { Form, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { mchcLogger } from '@lm_fe/env';
import { MyFormSectionForm } from '@lm_fe/components_m';
import { BF_Wrap2 } from 'src/components';
interface IProps {
    pregnancyId: TIdTypeCompatible
}
export default function Test({ modal_data, visible, onCancel, close, ...others }: IGlobalModalProps<IProps>) {
    const { pregnancyId, } = modal_data

    const [form] = Form.useForm()
    const { config, Wrap } = BF_Wrap2({
        default_conf: {
            title: '高危管理-高危随访',
            tableColumns: () => import('./form_config')
        }
    })
    useEffect(() => {
        if (pregnancyId) {
            request.get(`/api/highrisk/getFollowupCaseByPregnancyId?pregnancyId=${pregnancyId}`, { unboxing: true }).then(r => {
                mchcLogger.log('高危随访', r.data)

                form.setFieldsValue(r.data)
            })
        }

        return () => {

        }
    }, [pregnancyId])







    return (
        <Modal
            {...others}

            open={visible}
            width={'80%'}
            onCancel={onCancel}
            style={{ top: '20px' }}
            styles={{ body: { height: '80vh', overflowY: 'auto' } }}
            destroyOnHidden
            className="diag-record-modal"
            onOk={async () => {
                const values = form.getFieldsValue()

                try {
                    if (values.id) {
                        await request.put(`/api/highrisk/updateFollowupCase`, values, { successText: '操作成功' })
                    } else {
                        close?.(true)
                        await request.post(`/api/highrisk/addFollowupCase`, values, { successText: '操作成功' })
                    }
                    close?.(true)

                } catch (error) {

                }




            }}
            title="高危随访"


        >
            <Wrap>
                <MyFormSectionForm
                    formName='高危随访'
                    form={form}
                    targetLabelCol={3}
                    bf_config={config}
                />
            </Wrap>
        </Modal>
    );

};