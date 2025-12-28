import { map, get, set } from 'lodash';
import dayjs from 'dayjs';
import { formatDate, safe_json_parse, safe_json_stringify } from '@lm_fe/utils';

//数据转换
export const valueToApi = (values: any, user: any) => {
  if (!get(values, 'followUpDate')) {
    set(values, 'followUpDate', dayjs());
  }
  if (!get(values, 'followUpPerson')) {
    set(values, 'followUpPerson', get(user, 'firstName'));
  }

  map(values, (data, index) => {
    if (index === 'followUpDate') {
      set(values, index, data ? dayjs(data) : null);
    }
    if (
      [
        'followUpWay',
        'followUpSituation',
        'pregnancyCauses',
        'immediatelyImplement',
        'noticeMatters',
        'guidanceForProperUse',
        'menstruationBleeding',
      ].includes(index)
    ) {
      set(values, index, { checkedValues: [data], withInputValues: {} });
    }
    if (
      [
        'pastContraceptiveMethods',
        'afterMiscarriageFirstContraceptiveMethods',
        'futureContraceptiveMethods',
        'nowContraceptiveMethods',
      ].includes(index)
    ) {
      set(values, index, safe_json_parse(data));
    }
    if (
      [
        'menstruationRestored',
        'stomachAche',
        'resumeSex',
        'insistUseContraceptiveMethods',
        'replaceContraceptiveMethods',
        'unexpectedPregnancyAgain',
        'suggestBeginTime',
      ].includes(index)
    ) {
      set(values, index, { checkedValues: [data], withInputValues: get(values, `${index}Note`) });
    }
  });
  return values;
};
export const valueToForm = (values: any) => {
  map(values, (item, key) => {
    if (key === 'followUpDate') {
      set(values, key, formatDate(item));
    }
    if (
      [
        'followUpWay',
        'followUpSituation',
        'pregnancyCauses',
        'immediatelyImplement',
        'noticeMatters',
        'guidanceForProperUse',
        'menstruationBleeding',
      ].includes(key)
    ) {
      const checkedValues = get(item, 'checkedValues.0');
      set(values, key, checkedValues);
    }
    if (
      [
        'pastContraceptiveMethods',
        'afterMiscarriageFirstContraceptiveMethods',
        'futureContraceptiveMethods',
        'nowContraceptiveMethods',
      ].includes(key) &&
      values
    ) {
      set(values, key, safe_json_stringify(item));
    }
    if (
      [
        'menstruationRestored',
        'stomachAche',
        'resumeSex',
        'insistUseContraceptiveMethods',
        'replaceContraceptiveMethods',
        'unexpectedPregnancyAgain',
        'suggestBeginTime',
      ].includes(key)
    ) {
      const checkedValues = get(item, 'checkedValues.0');
      const withInputValues = get(item, 'withInputValues');
      set(values, key, checkedValues);
      set(values, `${key}Note`, withInputValues);
    }
  });
  return values;
};
