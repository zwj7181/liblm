import React from 'react';
import WomenExamRecordsList from './List';
import { get } from 'lodash';
import { PanelTitle, PanelWithChild } from '@lm_fe/components_m';
import { getSearchParamsValue, request } from '@lm_fe/utils';
export default class List extends PanelWithChild {
  state = {
    data: {},
  };

  async componentDidMount() {
    const id = getSearchParamsValue('id');
    const data = (await request.get(`/api/gynecological-patients/${id}`)).data;
    this.setState({
      data,
    });
  }

  renderHeader = () => {
    const { data } = this.state;
    const h = [
      { title: '姓名', value: get(data, 'name') },
      { title: '年龄', value: get(data, 'age') },
      { title: '门诊号', value: get(data, 'outpatientNO') },
      // { title: '联系电话', value: get(data, 'gynecologicalPatient.telephone') },
    ]
    return (
      <PanelTitle headerItems={h} />
    );
  };

  renderContent = () => {
    const id = getSearchParamsValue('id');

    return <WomenExamRecordsList asChildComponentQueryLabel="gynecologicalPatientId.equals" id={id} />;
  };
}
