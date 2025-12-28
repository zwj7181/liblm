import { DataSelect, formatTimeToStandardApi } from '@lm_fe/components_m';
import { safe_json_parse } from '@lm_fe/utils';
import { get, pick, map } from 'lodash';
import dayjs from 'dayjs';

export const fromApi = (data) => {
  const contentType = get(data, 'contentType');
  let educationContent, educationType;
  if (contentType === 1) {
    educationContent = get(data, 'knowledge.id');
    educationType = get(data, 'knowledge.type');
  }
  if (contentType === 2) {
    educationContent = get(data, 'video.id');
  }
  if (contentType === 3) {
    educationContent = get(data, 'url');
  }
  if (contentType === 4) {
    educationContent = data?.questionnaireId ?? get(data, 'workQuestion.id');
  }
  const pregnantLimitsNote = safe_json_parse(get(data, 'pregnantLimitsNote'));
  const pushTime = safe_json_parse(get(data, 'pushTime'));
  return {
    ...pick(data, ['title']),
    releaseStatus: get(data, 'releaseStatus') === 1 ? true : false,
    diagnosisKeywords: get(pregnantLimitsNote, 'diagnosisKeywords'),
    operationKeywords: get(pregnantLimitsNote, 'operationKeywords'),
    contentType: {
      selectedData: contentType,
      otherNote: '',
    },
    pushObject: {
      selectedData: get(data, 'pregnantLimits'),
      otherNote: '',
    },
    educationContent,
    educationType,
    gestationalRange: {
      appointRange: get(pregnantLimitsNote, 'gesweekLimits'),
      min: get(pregnantLimitsNote, 'gesweekGt'),
      max: get(pregnantLimitsNote, 'gesweekLt'),
      value: get(pregnantLimitsNote, 'gesweek'),
    },
    ageRange: {
      appointRange: get(pregnantLimitsNote, 'ageLimits'),
      min: get(pregnantLimitsNote, 'ageGt'),
      max: get(pregnantLimitsNote, 'ageLt'),
      value: get(pregnantLimitsNote, 'age'),
    },
    dangeLevel: {
      selectedData: get(pregnantLimitsNote, 'highriskGrade'),
      otherNote: '',
    },
    inspectionReport: {
      selectedData: get(pregnantLimitsNote, 'inspectionType'),
      otherNote: '',
    },
    inspectionReportResult: {
      selectedData: get(pregnantLimitsNote, 'inspectionResult'),
      otherNote: '',
    },
    diseases: {
      selectedData: get(pregnantLimitsNote, 'diseases'),
      otherNote: '',
    },
    userLabel: {
      selectedData: get(pregnantLimitsNote, 'tag'),
      otherNote: '',
    },
    pushFrequency: {
      selectedData: get(data, 'pushFrequency'),
      otherNote: '',
    },
    pushFrequencyNote: {
      time: get(pushTime, 'time') ? dayjs(get(pushTime, 'time'), 'HH:mm:ss') : undefined,
      date: get(pushTime, 'date') ? dayjs(get(pushTime, 'date'), 'HH:mm:ss') : undefined,
      gestationalWeek: get(pushTime, 'gesweek'),
      pushDateType: get(pushTime, 'timeType'),
      pushTimeType: get(pushTime, 'timeNode'),
      day: get(pushTime, 'day'),
    },
    outpatientNO: map(get(pregnantLimitsNote, 'outpatientNOs'), (outpatientNO) => ({
      key: Math.random(),
      value: outpatientNO,
    })),
  };
};

export const toApi = (data) => {
  let educationContentObj = {};
  const contentType = get(data, 'contentType.selectedData');
  if (contentType === 1) {
    educationContentObj = {
      knowledge: { id: get(data, 'educationContent') },
    };
  }
  if (contentType === 2) {
    educationContentObj = {
      video: { id: get(data, 'educationContent') },
    };
  }
  if (contentType === 3) {
    educationContentObj = {
      url: get(data, 'educationContent'),
    };
  }
  if (contentType === 4) {
    const id = get(data, 'educationContent');
    //   <
    //   key="work-questions?page=0&size=99999&sort=id,desc"
    //   url="work-questions?page=0&size=99999&sort=id,desc"
    //   valueKey="id"
    //   labelKey="title"
    // />

    const q_obj = DataSelect.get_data('work-questions', id) ?? {}

    educationContentObj = {
      questionnaireId: q_obj['id'],
      questionnaireTitle: q_obj['title'],
      workQuestion: { ...q_obj },
    };
  }
  const transferData = {
    ...pick(data, ['id', 'title']),
    ...educationContentObj,
    releaseStatus: get(data, 'releaseStatus') ? 1 : 2,
    pregnantLimits: get(data, 'pushObject.selectedData'),
    contentType,
    pregnantLimitsNote: JSON.stringify({
      gesweekLimits: get(data, 'gestationalRange.appointRange'),
      gesweekGt: get(data, 'gestationalRange.min'),
      gesweekLt: get(data, 'gestationalRange.max'),
      gesweek: get(data, 'gestationalRange.value'),
      operationGesweekLimits: get(data, 'gestationalRange.appointRange'),
      operationGesweekGt: get(data, 'gestationalRange.min'),
      operationGesweekLt: get(data, 'gestationalRange.max'),
      operationGesweek: get(data, 'gestationalRange.value'),
      ageLimits: get(data, 'ageRange.appointRange'),
      ageGt: get(data, 'ageRange.min'),
      diagnosisKeywords: get(data, 'diagnosisKeywords'),
      operationKeywords: get(data, 'operationKeywords'),
      ageLt: get(data, 'ageRange.max'),
      age: get(data, 'ageRange.value'),
      highriskGrade: get(data, 'dangeLevel.selectedData'),
      inspectionType: get(data, 'inspectionReport.selectedData'),
      inspectionResult: get(data, 'inspectionReportResult.selectedData'),
      outpatientNOs: map(get(data, 'outpatientNO'), (item) => get(item, 'value')),
      diseases: get(data, 'diseases.selectedData'),
      tag: get(data, 'userLabel.selectedData'),
    }),
    pushFrequency: get(data, 'pushFrequency.selectedData'),
    pushTime: JSON.stringify({
      time: formatTimeToStandardApi(get(data, 'pushFrequencyNote.time'), 'HH:mm:ss'),
      date: formatTimeToStandardApi(get(data, 'pushFrequencyNote.date')),
      gesweek: get(data, 'pushFrequencyNote.gestationalWeek'),
      timeType: get(data, 'pushFrequencyNote.pushDateType'),
      timeNode: get(data, 'pushFrequencyNote.pushTimeType'),
      day: get(data, 'pushFrequencyNote.day'),
    }),
  };

  return transferData;
};
