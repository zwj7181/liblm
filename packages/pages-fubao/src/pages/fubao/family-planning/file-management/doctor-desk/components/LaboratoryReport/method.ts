import { fubaoRequest as request } from '@lm_fe/utils';
import { get, map } from 'lodash';

export const stateMapping = {
  1: {
    value: '待接种',
    color: 'error',
  },
  2: {
    value: '待培养',
    color: 'default',
  },
  3: {
    value: '待审核',
    color: 'processing',
  },
  4: {
    value: '待签发',
    color: 'warning',
  },
  5: {
    value: '已签发',
    color: 'success',
  },
};

export const getInformedConsents = async (outpatientNO) => {
  const _result = await request.get(`/api/lab-examines?size=999999&outpatientNo.equals=${outpatientNO}`);
  const result = _result.data
  return map(result, (item) => {
    const { receiveDate, labNo, sampleType, state, checkContent } = item;
    const d = JSON.parse(checkContent);
    return {
      ...item,
      name: d && d.join(','),
      stateString: get(stateMapping, `${state}.value`),
    };
  });
  // const result = [
  //   {
  //     id: 1,
  //     name: `${formatDateToStandardApi(dayjs())} PB20-740 核型分析 待审核`,
  //   },
  //   {
  //     id: 2,
  //     name: `${formatDateToStandardApi(dayjs())} PB20-741 CMA 待分析`,
  //   },
  // ];
  // return result;
};

export const getInformedConsentById = async (id) => {
  const result = await request.get(`/api/prenatal-patient-documents/${id}`);
  return result.data;
};

export const createInformedConsent = async (data) => {
  const result = await request.post('/api/prenatal-patient-documents', data);
  return result.data;
};

export const updateInformedConsent = async (data) => {
  const result = await request.put('/api/prenatal-patient-documents', data);
  return result.data;
};

export const getAllDiagnosisByPatientId = async (patientId: number) => {
  const result = await request.get(`/api/findDiagnosisByDateVisitType/${patientId}`);
  return result.data;
};
