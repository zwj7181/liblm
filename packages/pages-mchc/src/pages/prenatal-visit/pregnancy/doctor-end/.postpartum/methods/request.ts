import { request } from "@lm_fe/utils";


/** 更新复诊记录数据 */
async function updateRvisitInfoOfOutpatient(data: any) {
  const res = await request.post('/api/doctor/updateRvisitRecordOfOutpatient', data);
  return res.data
}



/** 排序诊断 */
async function sortDiagnoses(data: any) {
  const res = await request.put('/api/doctor/sortDiagnosesOfOutpatient', data);
  return res.data
}


export const requestMethods_further = {

  updateRvisitInfoOfOutpatient,
  sortDiagnoses,
};
export default requestMethods_further