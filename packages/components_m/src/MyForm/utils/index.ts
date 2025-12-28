import { FormConfig } from '../interface';
import { map, get, cloneDeep, has } from 'lodash';
import { isArr, isObj, isNumber, isUndefinend } from './func';

const OBJECT_KEY = '.';
const PLUS_KEY = '+';
const ALL_KEY = '*';
// 考虑之后优化为多选
const EXTRA_REGEXP: RegExp = /\((.*)\)/;

interface TokenRuleArr {
  match: (str: string) => boolean;
  getRenderAction: Function;
  formatAction: Function;
}

/* ========================== 重构getRenderData function ================================ */

export function getRenderData(config: Array<FormConfig>, data: any): Array<FormConfig> {
  if (!data || !config) return config;
  const rConfig = cloneDeep(config);
  const clonedata = cloneDeep(data);
  for (let i = 0; i < rConfig.length; i++) {
    rConfig[i].value = getDataByPath(rConfig[i].key, data);
    rConfig[i].labelSign = getLabelSign(rConfig[i].key, data);

  }
  return rConfig;
}

function getLabelSign(path: string, data: any) {
  let bool = false;
  const pathArr = path.split(OBJECT_KEY);
  const key = get(pathArr, `${[1]}`);
  if (key) {
    const regExpRes = EXTRA_REGEXP.exec(key);
    let keyStr = key;
    if (regExpRes) {
      const prefixKey = key.substring(0, regExpRes.index);
      keyStr = prefixKey;
    }
    bool = get(data, `${keyStr}Sign`, false);
  }
  return bool;
}
/**
 * 根据路径去获取数据，在最后一个数据会进入token函数取值
 * @param path 路径
 * @param data 数据
 */
function getDataByPath(path: string, data: any): any {
  if (!path) {
    return {};
  }
  const pathArr = path.split(OBJECT_KEY);
  let res: any = data;
  const len = pathArr.length;
  // 输入的第一个会有个点，pathArr[0]为"";
  for (let i = 1; i < len; i++) {
    if (!res) {
      break;
    }
    if (i === len - 1) {
      res = getDataByToken(pathArr[i], res);
      continue;
    }
    res = res[pathArr[i]];
  }
  return res;
}

/**
 * 根据string识别出token进行取值
 * 不匹配规则就走默认的返回
 */
function getDataByToken(str: string, data: any) {
  if (!data) return data;
  for (let i = 0, len = tokenRuleArr.length; i < len; i++) {
    if (tokenRuleArr[i].match(str)) {
      return tokenRuleArr[i].getRenderAction(str, data);
    }
  }
  return data[str];
}

/**
 * token 责任链
 * getRenderAction 与 formatAction 有可能是一样的
 * 0 - 匹配 () 仅做一个圆括号的匹配 提取出一个对象
 *     prefixKey - 圆括号前的key
 * 1 - 匹配 +  提取出一个对象
 */
const tokenRuleArr: Array<TokenRuleArr> = [
  {
    match: (str: string) => EXTRA_REGEXP.test(str),
    getRenderAction: function (str: string, data: any): any {
      const regExpRes = EXTRA_REGEXP.exec(str);
      if (regExpRes) {
        const prefixKey = str.substring(0, regExpRes.index);
        const targetKey = prefixKey + regExpRes[1];
        if (!prefixKey) {
          console.error('prefixKey is undefined of empty string');
          return undefined;
        }
        return {
          [prefixKey]: data[prefixKey],
          [targetKey]: data[targetKey],
        };
      }
      return undefined;
    },
    formatAction: function (str: string, data: any): any {
      const regExpRes = EXTRA_REGEXP.exec(str);
      if (regExpRes) {
        const prefixKey = str.substring(0, regExpRes.index);
        const targetKey = prefixKey + regExpRes[1];
        if (!prefixKey) {
          console.error('prefixKey is undefined of empty string');
          return { [str]: data };
        }
        return {
          [prefixKey]: data ? data[prefixKey] : undefined,
          [targetKey]: data ? data[targetKey] : undefined,
        };
      }
      return { [str]: data };
    },
  },
  {
    match: (str: string) => str.includes(PLUS_KEY),
    getRenderAction: function (str: string, data: any): any {
      const res: any = {};
      const strArr = str.split(PLUS_KEY);
      strArr.forEach((v: any) => {
        if (v) {
          res[v] = data[v];
        }
      });
      return res;
    },
    formatAction: function (str: string, data: any): any {
      const res: any = {};
      const strArr = str.split(PLUS_KEY);
      strArr.forEach((v: any) => {
        if (v) {
          res[v] = data ? data[v] : undefined;
        }
      });
      return res;
    },
  },
  {
    match: (str: string) => str === ALL_KEY,
    getRenderAction: function (_str: string, data: any): any {
      return data;
    },
    formatAction: function (_str: string, data: any): any {
      return data;
    },
  },
];

/* ============================== 重构 本地格式转为接口格式 ==================================== */
export function getFormData(data: { [key: string]: { value: any; path: string } }, bool = false): any {
  let res = {};
  map(data, (item, key) => {
    if ((get(item, 'path') && key != 'null') || bool) {
      res = _assign(generateObjectByPath(get(item, 'path'), get(item, 'value')), res);
    }
    if (has(item, `${key}Sign`)) {
      const regExpRes = EXTRA_REGEXP.exec(key);
      if (regExpRes) {
        const prefixKey = key.substring(0, regExpRes.index);
        res[`${prefixKey}Sign`] = get(item, `${key}Sign`);
      } else {
        res[`${key}Sign`] = get(item, `${key}Sign`);
      }
    }
  });
  return res;
}

export function generateObjectByPath(path: string, value: any): any {
  const pathArr = path.split(OBJECT_KEY);
  const len = pathArr.length;
  let res: any = value;
  // 从数组后端向前遍历，对最后的一个(len-1)这个才需要做匹配
  for (let i = len - 1; i > 0; i--) {
    if (i === len - 1) {
      res = formatByToken(pathArr[i], res);
      continue;
    }
    if (isNumber(pathArr[i])) {
      const temp = [];
      temp[Number(pathArr[i])] = res;
      res = temp;
    } else {
      res = { [pathArr[i]]: res };
    }
  }

  return res;
}

function formatByToken(str: string, data: any): any {
  for (let i = 0, len = tokenRuleArr.length; i < len; i++) {
    if (tokenRuleArr[i].match(str)) {
      return tokenRuleArr[i].formatAction(str, data);
    }
  }
  if (isNumber(str)) {
    const temp = [];
    temp[Number(str)] = data;
    return temp;
  }
  return { [str]: data };
}

/**
 * 2个参数必须为相同类型的参数
 * 因为转换出来的对象名称相同，直接使用Object.assign会导致覆盖
 * 所有需要此方法做合并处理（正常情况下是不会去重的，除非在转换的时候已经出现了重复）
 * 合并两个对象
 */
function _assign(mainData: any = {}, newData: any = {}): any {
  if (isObj(mainData) && isObj(newData)) {
    const mainKey = Object.keys(mainData);
    const newKey = Object.keys(newData);
    for (let i = 0; i < newKey.length; i++) {
      let flag = false;
      for (let j = 0; j < mainKey.length; j++) {
        const mk = mainKey[j];
        const nk = newKey[i];
        if (mk === nk) {
          flag = true;
          // 判别下一层是不是数组，做数组合并
          if (Array.isArray(mainData[mk]) && Array.isArray(newData[nk])) {
            const len = mainData[mk].length > newData[nk].length ? mainData[mk].length : newData[nk].length;
            for (let k = 0; k < len; k++) {
              mainData[mk][k] = _assign(mainData[mk][k], newData[nk][k]);
            }
          } else if (isObj(mainData[mk]) && isObj(newData[mk])) {
            // default object
            mainData[mk] = _assign(mainData[mk], newData[nk]);
          } else if (isUndefinend(mainData[mk])) {
            mainData[mk] = newData[mk];
          }
        }
      }
      if (!flag) {
        mainData = {
          ...mainData,
          [newKey[i]]: newData[newKey[i]],
        };
      }
    }
  } else if (isUndefinend(newData)) {
    // mainData = newData;
  } else {
    console.error('其中一个参数不是对象||二者皆不为对象||两者数据类型不相同，不可以做合并操作');
  }
  return mainData;
}
