import { map, get, isEmpty, set, dropRight, join, cloneDeep } from 'lodash';
import dayjs from 'dayjs';
import {safe_json_parse as strToJson,safe_json_stringify as jsonToStr, formatDateTime, formatTime} from '@lm_fe/utils';


//数据转换
export const valueToApi = (values: any) => {
  let result = {};
  map(values, (itemVaule, key) => {
    switch (key) {
      case 'payment':
        if (itemVaule === '已缴费') {
          set(result, key, 1);
        } else {
          set(result, key, 0);
        }
        break;
      case 'postoperationMissions':
        const valueJson = strToJson(itemVaule);
        set(result, key, get(valueJson, 'checkedValues.0'));
        set(
          result,
          `${key}Note`,
          get(valueJson, ['withInputValues', `${get(valueJson, 'checkedValues.0')}`, 'value', '0']),
        );
        break;
      case 'appointmentDate':
        set(result, key, formatDateTime(itemVaule));
        break;
      case 'postoperationMissionsType':
        set(result, key, get(itemVaule, 'type'));
        set(result, 'postoperationMissionsContent', get(itemVaule, 'content'));
        break;
      default:
        if (key === 'postoperationMissionsContent' && get(result, 'postoperationMissionsContent')) {
          set(result, key, get(result, 'postoperationMissionsContent'));
        } else {
          set(result, key, itemVaule);
        }
        break;
    }
  });
  set(result, 'progressStatus', 2);
  return result;
};
export const valueToForm = (values: any) => {
  let operationNameOptions: any = [];
  let cloneValues = cloneDeep(values);
  map(cloneValues, (item, index) => {
    if (get(item, 'payment')) {
      set(item, 'payment', '已缴费');
    } else {
      set(item, 'payment', '未缴费');
    }
    operationNameOptions.push({ label: get(item, 'operationName'), value: get(item, 'operationName') });
  });

  return { data: cloneValues, operationNameOptions };
};
export const modifyValueToForm = (values: any) => {
  let cloneValues = cloneDeep(values);
  map(cloneValues, (itemValue, key) => {
    if (key === 'payment') {
      if (itemValue) {
        set(cloneValues, key, '已缴费');
      } else {
        set(cloneValues, key, '未缴费');
      }
    }
    if (key === 'appointmentDate') {
      set(cloneValues, key, dayjs(itemValue));
    }
    if (key === 'postoperationMissions') {
      const checkBoxValue = {
        checkedValues: [itemValue],
        withInputValues: {
          [itemValue]: { key: itemValue, value: { '0': get(cloneValues, `${key}Note`) } },
        },
      };
      set(cloneValues, key, jsonToStr(checkBoxValue));
    }
    if (key === 'postoperationMissionsType') {
      set(cloneValues, `${key}.type`, itemValue);
      set(cloneValues, `${key}.content`, get(values, 'postoperationMissionsContent'));
    }
  });
  return cloneValues;
};
export const modalFormDescriptions = {
  postoperationMissions: {
    key: 'postoperationMissions',
    label: '健康宣教',
    rules: [{ required: false, message: '健康宣教是必填项' }],
    inputType: 'checkbox_with_input',
    span: 24,
    offset: 0,
    special_config: JSON.stringify({
      type: 'single',
      options: [
        { value: 1, label: '自定义', span: 8, withInput: false },
        { value: 2, label: '知识库', withInput: false, span: 8 },
      ],
    }),
  },
  postoperationMissionsType: {
    key: 'postoperationMissionsType',
    label: '知识库',
    rules: [{ required: false, message: '知识库是必填项' }],
    inputType: 'knowledge_base',
    inputProps: { dependency: { show: { key: 'postoperationMissions', value: [2] } } },
    span: 24,
    offset: 0,
  },
  postoperationMissionsContent: {
    key: 'postoperationMissionsContent',
    label: '宣教内容',
    rules: [{ required: false, message: '宣教内容是必填项' }],
    inputType: 'operation_template_textarea',
    inputProps: { dependency: { show: { key: 'postoperationMissions', value: [1] } } },
    span: 24,
    offset: 0,
  },
};
