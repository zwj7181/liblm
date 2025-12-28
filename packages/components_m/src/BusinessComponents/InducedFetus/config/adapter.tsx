import { map, get, set } from 'lodash';
import dayjs from 'dayjs';
import { formatDateTime, safe_json_parse } from '@lm_fe/utils';
export const toApi = (data: any) => {
  return map(data, (item) => {
    return {
      ...item,
      deliverytime: formatDateTime(get(item, 'deliverytime')),
    };
  });
};
export const fromApi = (data: any, nativeFormDescriptions: any) => {
  const result = { ...data };
  map(nativeFormDescriptions, (desctiption, key) => {
    const { tranfer_rules: tranferRules } = desctiption;
    let type = 'default';
    let path = key;
    if (safe_json_parse(tranferRules)) {
      const tranferRulesJson = safe_json_parse(tranferRules);
      type = get(tranferRulesJson, 'type') ? get(tranferRulesJson, 'type') : 'default';
      path = get(tranferRulesJson, 'path') ? get(tranferRulesJson, 'path') : key;
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
    if (key === 'placentaLength') {
      //{\"0\":3,\"1\":3,\"2\":4}
      if (get(data, 'placentaLength')) {
        const checkBoxValue = {
          0: get(data, 'placentaLength'),
          1: get(data, 'placentaWidth'),
          2: get(data, 'placentaThickness'),
        };
        set(result, key, JSON.stringify(checkBoxValue));
      }
    }
    if (key === 'embryolemmaIntegrity') {
      //{\"checkedValues\":[3],\"withInputValues\":{\"3\":{\"key\":3,\"value\":{\"0\":1,\"1\":2}},\"undefined\":{\"value\":{}}}}
      if (get(data, 'embryolemmaIntegrity')) {
        const checkBoxValue = {
          checkedValues: [get(data, key)],
          withInputValues: {
            [get(data, key)]: {
              key: get(data, key),
              value: { '0': get(data, `embryolemmaColoboma1`), '1': get(data, 'embryolemmaColoboma2') },
            },
          },
        };
        set(result, key, JSON.stringify(checkBoxValue));
      }
    }
  });
  return {
    ...result,
    id: get(data, 'id'),
  };
};

//数据转换
export const valueToApi = (values: any) => {
  map(values, (data, key) => {
    if (key === 'cervixLaceration' && data) {
      const valueJson = safe_json_parse(data);
      set(values, `${key}`, get(valueJson, 'checkedValues.0'));
      set(
        values,
        `cervixSuture`,
        get(valueJson, ['withInputValues', `${get(valueJson, 'checkedValues.0')}`, 'value', '0']),
      );
      //{"checkedValues":[2],"withInputValues":{"2":{"key":2,"value":{"0":"3"}}}}
    }
    if ((key === 'fetusDeliverytime' || key === 'placentaDeliverytime') && data) {
      set(values, `${key}`, formatDateTime(data,));
    }

    if (key === 'embryolemmaIntegrity' && data) {
      //{\"checkedValues\":[3],\"withInputValues\":{\"3\":{\"key\":3,\"value\":{\"0\":1,\"1\":2}},\"undefined\":{\"value\":{}}}}
      const valueJson = safe_json_parse(data);
      set(values, `${key}`, get(valueJson, 'checkedValues.0'));
      set(
        values,
        `embryolemmaColoboma1`,
        get(valueJson, ['withInputValues', `${get(valueJson, 'checkedValues.0')}`, 'value', '0']),
      );
      set(
        values,
        `embryolemmaColoboma2`,
        get(valueJson, ['withInputValues', `${get(valueJson, 'checkedValues.0')}`, 'value', '1']),
      );
    }
    if (key === 'placentaLength' && data) {
      //{\"0\":3,\"1\":3,\"2\":4}
      const valueJson = safe_json_parse(data);
      set(values, `${key}`, get(valueJson, '0'));
      set(values, `placentaWidth`, get(valueJson, '1'));
      set(values, `placentaThickness`, get(valueJson, '2'));
    }
  });
  return values;
};
