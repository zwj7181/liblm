import { OkButton } from '@lm_fe/components_m';
import { mchcModal__ } from '@lm_fe/pages';
import { TIdTypeCompatible } from '@lm_fe/service';
import { request, safe_async_call } from '@lm_fe/utils';
import React from 'react';
import { form_config } from './form_config';
import { BASE_URL } from '../const';
interface IProps {
    twoCancerScreeningId: TIdTypeCompatible
}



const opt_url = '/api/progestation/check/followup/progestationCheckFollowupCase'

export function Follow_up_btn(props: { handleSearch: () => void, rowData: any }) {
    const { handleSearch, rowData = {} } = props
    const { premaritalCheckArchivesId, fileType } = rowData

    async function showView() {
        let record = await request.get(`/api/progestation/check/followup/progestationCheckFollowup`,
            { params: { premaritalCheckArchivesId, fileType }, unboxing: true, ignore_usr: true }
        )

        mchcModal__.open('modal_form', {
            modal_data: {
                bf_title: '婚前检查-阳性随访',
                formDescriptions: form_config,
                getInitialData() {
                    return record.data
                },
                async onSubmit(data) {
                    let fn = data.id ? request.put : request.post
                    await fn(BASE_URL, data, { successText: '操作成功', ignore_usr: true })

                    safe_async_call(handleSearch)
                    return 1

                },
            }
        })
    };

    return <OkButton type="link" size="small" onClick={showView}>随访</OkButton>


}

