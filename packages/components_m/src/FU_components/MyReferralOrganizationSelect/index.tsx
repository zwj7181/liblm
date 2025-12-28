import { Select_L } from '@lm_fe/components';
import { SMchc_Common } from '@lm_fe/service';
import { expect_array, get, isObject, set } from '@lm_fe/utils';
import { FormInstance, } from 'antd';
import React, { Component } from 'react';
import { getAllResources } from '../../utils/defaultMethod';

export class MyReferralOrganizationSelect extends Component<{ value?: any, onChange?(id: any): void, form?: FormInstance, directionKey?: string }> {
    state = {
        data: undefined,
        options: [],
    };

    componentDidMount() {
        const { value } = this.props;
        this.setState({
            data: isObject(value) ? value : { id: value },
        });
        if (value) {
            this.handleGetOptions()
        }
    }

    handleGetOptions = async () => {
        const options = await getAllResources(`/api/referral-organizations`);
        this.setState({
            options,
        });
    };

    handleChange = async (id: any) => {
        const { onChange, form, directionKey } = this.props;
        this.setState({
            data: { id },
        });
        onChange?.(id);
        if (form && directionKey) {
            const organization = await SMchc_Common.getReferralOrganizations({ id })
            const currentOrganization = await SMchc_Common.getCurrReferralOrganization()
            const selectGrade = organization[0]?.grade;
            const currentGrade = currentOrganization?.grade;
            const direction = currentGrade === selectGrade ? 1 : currentGrade > selectGrade ? 2 : 3;

            form.setFieldsValue(set({}, directionKey, direction));
        }
    };

    render() {
        const { data, options } = this.state;
        return (
            <Select_L
                onFocus={this.handleGetOptions}
                onChange={this.handleChange}
                value={get(data, 'id')}
                showSearch
                allowClear
            >
                {expect_array(options).map((option, index) => {
                    return (
                        <Select_L.Option key={get(option, 'id') || index} value={get(option, 'id')}>
                            {get(option, 'name') || '--'}
                        </Select_L.Option>
                    );
                })}
            </Select_L>
        );
    }
}
