import { request } from "@lm_fe/utils";
export default {
  /** 获取血糖记录 */
  getBloodGlucoseInHome: (pregnancyId: any) =>
    request.get(`/api/getBloodGlucoseInHome?pregnancyId.equals=${pregnancyId}`).then(r => r.data),

  getBloodPressureInHome: (pregnancyId: any) =>
    request.get(`/api/getBloodPressureInHome?pregnancyId.equals=${pregnancyId}`).then(r => r.data),

  getFetalMovementInHome: (pregnancyId: any) =>
    request.get(`/api/getFetalMovementInHome?pregnancyId.equals=${pregnancyId}`).then(r => r.data),
};
