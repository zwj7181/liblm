import { get } from 'lodash';
import { request, safe_json_parse } from '@lm_fe/utils';
export default {
  /** 获取表单配置 */
  getFormConfig: async () => {
    const formWife =
      get(
        (await request.get(`/api/form-descriptions?moduleName=prenatal-examination-wife`)).data,
        0,
      ) || {};
    const formHusband =
      get(
        (await request.get(`/api/form-descriptions?moduleName=prenatal-examination-husband`)).data,
        0,
      ) || {};

    return {
      formWife,
      formHusband,
    };
  },
};
