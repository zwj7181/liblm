// import { formatTimeToStandardApi } from '@/utils/format';
import { safe_json_parse } from '@lm_fe/utils';
import { get, map, set } from 'lodash';
import dayjs from 'dayjs';
export const toApi = (data: any, programDict: any) => {
  return map(data, (item) => {
    return {
      ...item,
      projectId: programDict[item.projectName],
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
  });
  return {
    ...result,
    id: get(data, 'id'),
  };
};

//数据转换
export const valueToApi = (values: any) => {
  map(values, (data, key) => {
    // if ((key === 'fetusDeliverytime' || key === 'placentaDeliverytime') && data) {
    //   set(values, `${key}`, data?.format( 'YYYY-MM-DD HH:mm'));
    // }
  });
  return values;
};
