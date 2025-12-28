import { fubaoRequest as request } from '@lm_fe/utils';

import { get } from 'lodash';

export const getPatientByID = async (id: string) => {
  const patient = await request.get(`/api/pac-patients/${id}`);
  return patient.data;
};

// 从 PatientCase 中获取数据
export const getPatientCaseByOutpatientNo = async (outpatientNO: any) => {
  return (await request.post('/api/patient-case', {
    outpatientNO,
  })).data
};

// 从产前检查获取数据
export const getPatientByOutpatientNo = async (outpatientNO: any) => {
  const data =( await request.get(`/api/pac-patients?outpatientNO.equals=${outpatientNO}`)).data;
  return get(data, '0') || {};
}

export const getPregnanciesByOutpatientNo = async (outpatientNO: any) => {
  const data = (await request.get(`/api/pregnancies?outpatientNO.equals=${outpatientNO}`)).data;
  return get(data, '0') || {};
};

export const updatePatient = async (data) => {
  let result;
  if (get(data, 'id')) {
    result = (await request.put('/api/pac-patients', data)).data;
  } else {
    result = (await request.post('/api/pac-patients', data)).data;
  }

  return result;
};
