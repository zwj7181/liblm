// import { get, map } from 'lodash';
import { formatDate, formatDateTime, safe_json_parse } from '@lm_fe/utils';
import { get, map, set } from 'lodash';
import dayjs from 'dayjs';
export const toApi = (data) => {
  return map(data, (item) => {
    return {
      ...item,
      deliverytime: formatDateTime(get(item, 'deliverytime')),
      prematureContactTime: formatDate(get(item, 'prematureContactTime')),
      fressreContactTime: formatDate(get(item, 'fressreContactTime')),
    };
  });
};
export const fromApi = (data: any, nativeFormDescriptions: any) => {
  const result = { ...data };
  map(nativeFormDescriptions, (desctiption, key) => {
    const { tranfer_rules: tranferRules, inputType } = desctiption;
    let type = 'default';
    let path = key;
    if (safe_json_parse(tranferRules)) {
      const tranferRulesJson = safe_json_parse(tranferRules);
      type = get(tranferRulesJson, 'type') ? get(tranferRulesJson, 'type') : 'default';
      path = get(tranferRulesJson, 'path') ? get(tranferRulesJson, 'path') : key;
    }
    if (key === 'appgar') {
      type = 'apgar';
    }
    if (
      [
        'deliverytype',
        'motherAbo',
        'fatherAbo',
        'ear',
        'snout',
        'labrum',
        'nece',
        'pectus',
        'ventral',
        'dorsalspine',
        'extremities',
        'fingers',
        'toe',
        'anus',
        'anoperineogenital',
        'headDeform',
        'raniumOverlay',
        'umbilicalCordtorsion',
        'umbilicalCordKnot',
        'tongue',
        'umbilicalcord',
        'mouth',
      ].includes(key)
    ) {
      type = 'key_and_keyNote';
    }
    switch (type) {
      case 'key_and_keyNote':
        set(result, `${key}.key`, get(data, path));
        set(result, `${key}.keyNote`, get(data, `${path}Note`));
        break;
      case 'stage':
        set(result, `${key}.0`, get(data, `${key}h`));
        set(result, `${key}.1`, get(data, `${key}m`));
        break;
      case 'apgar':
        map(data, (record, index) => {
          if (index.indexOf('apgar') > -1) {
            set(result, `${key}.${index}`, record);
          }
          // set(result, `${key}.${index}.apgar1`, record);
          // set(result, `${key}.${index}.apgar5`, record);
          // set(result, `${key}.${index}.apgar10`, record);
        });
        break;
      case 'moment':
        set(result, key, get(data, path) ? dayjs(get(data, path)) : undefined);
        break;
      case 'default':
      default:
        set(result, key, get(data, path));
        break;
    }
    // radio_input组件数据处理
    if (inputType === 'radio_input') {
      const k = key.split('.').pop();
      const obj = {
        [k]: get(data, key),
        [`${k}Note`]: get(data, `${key}Note`),
      };
      set(result, key, obj);
      delete result[`${k}Note`];
    }
    if (inputType === 'checkbox_with_input') {
      if (['hbig', 'hepatitisBvaccin'].includes(key)) {
        const checkBoxValue = {
          checkedValues: [get(data, path)],
          withInputValues: { [get(data, path)]: { key: get(data, path), value: { '0': get(data, `${path}Time`) } } },
        };
        set(result, key, JSON.stringify(checkBoxValue));
      } else if (
        key === 'umbilicalCordWine' ||
        key === 'caputSuccedaneumNote1' ||
        key === 'hematomaNote1' ||
        key === 'craniomalaciaNote1' ||
        key === 'asphyxiatedNote'
      ) {
        set(result, key, get(data, path));
      } else {
        const checkBoxValue = {
          checkedValues: [get(data, path)],
          withInputValues: { [get(data, path)]: { key: get(data, path), value: { '0': get(data, `${path}Note`) } } },
        };
        set(result, key, JSON.stringify(checkBoxValue));
      }
    }
    if (key === 'process') {
      set(result, `${key}`, `{"0":${get(data, 'gravidity') || null},"1":${get(data, 'parity') || null}}`);
    }
    if (['umbilicalcordtwine', 'umbilicalcordTurnRound', 'umbilicalcordKnot'].includes(key)) {
      set(result, `${key}.key`, get(data, `fetusAppendages.${key}`));
      set(result, `${key}.keyNote`, '');
    }
  });
  return {
    ...result,
    id: get(data, 'id'),
  };
};
