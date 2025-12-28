import { get } from 'lodash';
// import dayjs from 'dayjs';
import { formatDateTime } from '@lm_fe/utils';
import { expandObjectOrEmptyObj } from '@lm_fe/components_m';

export const toApi = (formData: any, oldData: any, patient: any) => {
  return {
    id: get(oldData, 'id') < 0 ? null : get(oldData, 'id'),
    visitType: get(formData, 'visitType'),
    pdPpfoDiagnoses: get(formData, 'pdPpfoDiagnoses'),
    conformItem: get(formData, 'conformItem'),
    discrepancyItem: get(formData, 'discrepancyItem'),
    complication: get(formData, 'complication.key'),
    complicationNote: get(formData, 'complication.keyNote'),
    personalProfile: get(formData, 'personalProfile'),
    pdPpfoFetuses: get(formData, 'pdPpfoFetuses'),
    askObject: get(formData, 'askObject'),
    followUpProfile: get(formData, 'followUpProfile'),
    followUpDate: formatDateTime(get(formData, 'followUpDate')),
    followUpPerson: get(formData, 'followUpPerson'),
    prenatalPatient: {
      ...expandObjectOrEmptyObj(patient),
    },
  };
};

export const fromApi = (data: any) => {
  return {
    pdPpfoDiagnoses: get(data, 'pdPpfoDiagnoses'),
    conformItem: get(data, 'conformItem'),
    discrepancyItem: get(data, 'discrepancyItem'),
    complication: {
      key: get(data, 'complication'),
      keyNote: get(data, 'complicationNote'),
    },
    personalProfile: get(data, 'personalProfile'),
    pdPpfoFetuses: get(data, 'pdPpfoFetuses'),
    askObject: get(data, 'askObject'),
    followUpProfile: get(data, 'followUpProfile'),
    // followUpDate: dayjs(get(data, 'followUpDate')),
    followUpDate: formatDateTime(get(data, 'followUpDate')),
    followUpPerson: get(data, 'followUpPerson'),
  };
};
