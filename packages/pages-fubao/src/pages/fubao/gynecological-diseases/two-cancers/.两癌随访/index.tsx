import { OkButton } from '@lm_fe/components_m';
import { mchcModal__ } from '@lm_fe/pages';
import { request, safe_async_call } from '@lm_fe/utils';
import React from 'react';
import { form_config } from './form_config';




const opt_url = '/api/two/cancer/followup/twoCancerFollowupCase'

export function Follow_up_btn_两癌(props: { handleSearch: () => void, rowData: any }) {
    const { handleSearch, rowData = {} } = props
    const { id, } = rowData

    async function showView() {
        let record = await request.get(`/api/two/cancer/followup/getTwoCancerFollowupCaseByTwoCancerId`,
            { params: { twoCancerScreeningId: id, }, unboxing: true, ignore_usr: true }
        )

        mchcModal__.open('modal_form', {
            modal_data: {
                bf_title: '两癌筛查-随访',
                formDescriptions: form_config,
                getInitialData() {
                    return record.data
                },
                async onSubmit(data) {
                    let fn = data.id ? request.put : request.post
                    await fn(opt_url, data, { successText: '操作成功', ignore_usr: true })

                    safe_async_call(handleSearch)


                },
            }
        })
    };

    return <OkButton size="small" onClick={showView}>随访</OkButton>
}
