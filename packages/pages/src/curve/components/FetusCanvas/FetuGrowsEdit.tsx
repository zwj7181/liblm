import { MyIcon, OkButton } from "@lm_fe/components_m";
import { mchcLogger } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
import React from "react";
import { mlUltrasounds_fd } from "src/form_config";
import { mchcModal__ } from "src/modals";
import requestMethods from './requestMethods';

interface IProps {
    value?: any
    onSubmit: () => Promise<void>
}
export function FetuGrowsEdit({ value, onSubmit }: IProps) {
    mchcLogger.log('FetuGrowsEdit', { value })
    function open_modal() {
        mchcModal__.open('modal_form', {
            modal_data: {
                bf_title: '胎儿生长曲线-编辑',
                getInitialData() {
                    return value
                },
                async onSubmit(v) {
                    await requestMethods.updateOutpatientFetuGrowsOfOutpatient(v)
                    onSubmit()
                    return 1

                },
                formDescriptions: defineFormConfig([
                    { name: 'id', form_hidden: true },
                    mlUltrasounds_fd()
                ])
            }
        })
    }

    return <OkButton btn_text="编辑" size='small' icon={<MyIcon value='EditOutlined' />} onClick={open_modal} />
}