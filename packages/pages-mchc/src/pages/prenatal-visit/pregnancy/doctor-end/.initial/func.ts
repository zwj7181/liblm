import { get, set, cloneDeep, isBoolean } from 'lodash';

/**现病史-主诉是否必填 */
let isChiefComplaintRequired = false;
/**现病史-现病史是否必填 */
let isPhiRequired = false;

export const emptyData = {
  'tab-0': ['现病史'],
  'tab-1': ['既往史'],
  'tab-2': ['其他病史'],
  'tab-3': ['孕产史'],
  'tab-4': ['体格检查'],
  'tab-5': ['专科检查'],
  'tab-6': ['检验检查'],
  'tab-7': ['诊断处理'],
};

export const requiredForm = {
  'tab-0': [],
  'tab-1': [],
  'tab-2': [],
  'tab-3': [],
  'tab-4': [],
  'tab-5': [],
  'tab-6': [],
  'tab-7': [],
};

/**获取每个tab页的必填项*/
export const getRequiredForm = (tab: string, config: any) => {
  const arr: string[] = [];
  config &&
    config.forEach((item: any) => {
      if (get(item, 'rules') && get(item, 'rules').indexOf('required') > 0) {
        const rules = jsonParse(get(item, 'rules'));
        if (rules && get(rules, '0.required')) {
          let key = get(item, 'key');
          if (key === 'chiefComplaint') {
            isChiefComplaintRequired = true;
          }
          if (key === 'phi') {
            isPhiRequired = true;
          }
          if (key.indexOf('(Note)') > 0) {
            key = key.substring(0, key.length - 6);
          }
          arr.push(key);
        }
      }
    });
  set(requiredForm, tab, arr);
};

const jsonParse = (str: string) => {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch {
    return null;
  }
};

/**获取每个tab页未填的必填项*/
export const getEmptyData = (pregData: any, visitData: any) => {
  const cloneForm = cloneDeep(requiredForm);
  const tabKeys = Object.keys(emptyData);
  const preTabs = ['tab-0', 'tab-1', 'tab-2', 'tab-3', 'tab-6'];
  const judgeItem = (data: any, item: string, tab: string) => {
    if (!get(data, item) && !emptyData[tab].includes(item)) {
      !isBoolean(get(data, item)) && emptyData[tab].push(item);
    } else if ((isBoolean(get(data, item)) || !!get(data, item)) && emptyData[tab].includes(item)) {
      emptyData[tab].splice(emptyData[tab].indexOf(item), 1);
    }
  };

  tabKeys.forEach((tab: any) => {
    cloneForm[tab].forEach((formItem: any) => {
      if (preTabs.includes(tab)) {
        judgeItem(pregData, formItem, tab);
        if (tab === 'tab-0' && isChiefComplaintRequired) {
          judgeItem(visitData, 'chiefComplaint', tab);
        }
        if (tab === 'tab-0' && isPhiRequired) {
          judgeItem(visitData, 'phi', tab);
        }
      } else {
        judgeItem(visitData, formItem, tab);
        if (tab === 'tab-4') {
          const extraArr = ['personalProfile.preweight', 'personalProfile.bmi'];
          extraArr.forEach((formItem: any) => {
            judgeItem(pregData, formItem, tab);
          });
        }
      }
    });
  });

  return emptyData;
};

// 关闭his window弹窗事件
export const closeHisWindow = () => {
  var reg = /25\.0\.1364/;
  if (reg.test(navigator.userAgent) && Browser) {
    Browser.Close();
    return;
  }
  var event = document.createEvent('MessageEvent');
  event.initMessageEvent('Close', false, false, '@Model.Id', null, null, null, null);
  document.dispatchEvent(event);

  window.open('', '_parent', '');
  window.close();
};

/**体格检查页面需要设置正常值的项*/
export const physicalKeys = [
  'skin',
  'thyroid',
  'breast',
  'respiratory',
  'rales',
  'heartrhythm',
  'murmurs',
  'liver',
  'spleen',
  'spine',
  'physiologicalreflection',
  'pathologicalreflection',
  'edema',
  // 郫都新增
  'lungCondition', // 肺部
  'heartCondition',//心脏
  'limbCondition',//四肢
  'electrocardiogram',//心电图
];
