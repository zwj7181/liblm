import { get, pick } from 'lodash';
import dayjs from 'dayjs';
import { formatDate } from '@lm_fe/utils';
import { expandObjectOrEmptyObj } from '@lm_fe/components_m';

export const toApi = (formData: any, oldData: any, patient: any) => {
  return {
    ...pick(formData, [
      'advice',
      'pdDiagnoses',
      'doctor',
      'visitType',
      'chiefcomplaint',
      'inspection',
      'visitStyle',
      'pdUterusTransfuses',
    ]),
    id: get(oldData, 'id') < 0 ? null : get(oldData, 'id'),
    visitDate: formatDate(get(formData, 'visitDate')),
    pdPresentDiseaseHistory: {
      ...expandObjectOrEmptyObj(get(oldData, 'pdPresentDiseaseHistory')),
      otherNote: get(formData, 'historyOfPresentOther'),
    },
    pdPhysicalExam: {
      ...expandObjectOrEmptyObj(get(oldData, 'pdPhysicalExam')),
      note: get(formData, 'physicalExamNote'),
    },
    pdUltrasounds: [
      {
        ...expandObjectOrEmptyObj(get(oldData, 'pdUltrasounds.0')),
        note: get(formData, 'ultrasonicExamination'),
      },
    ],
    pdDownsScreens: [
      {
        ...expandObjectOrEmptyObj(get(oldData, 'pdDownsScreens.0')),
        note: get(formData, 'inspection'),
      },
    ],
    pdFetuses: [
      {
        ...expandObjectOrEmptyObj(get(oldData, 'pdFetuses.0')),
        note: get(formData, 'fetusesNote'),
      },
    ],
    pdPrenatalPatientProfile: {
      ...expandObjectOrEmptyObj(get(oldData, 'pdPrenatalPatientProfile')),
      allNote: get(formData, 'inspectionPersonalNote'),
    },
    prenatalPatient: {
      ...expandObjectOrEmptyObj(patient),
    },
  };
};

export const fromApi = (data: any) => {
  return {
    ...pick(data, [
      'advice',
      'doctor',
      'pdDiagnoses',
      'visitType',
      'chiefcomplaint',
      'inspection',
      'visitStyle',
      'pdUterusTransfuses',
    ]),
    historyOfPresentOther: get(data, 'pdPresentDiseaseHistory.otherNote'),
    physicalExamNote: get(data, 'pdPhysicalExam.note'),
    ultrasonicExamination: get(data, 'pdUltrasounds.0.note'),
    inspection: get(data, 'pdDownsScreens.0.note'),
    fetusesNote: get(data, 'pdFetuses.0.note'),
    visitDate: get(data, 'visitDate') ? dayjs(get(data, 'visitDate')) : undefined,
  };
};
