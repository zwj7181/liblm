import { request } from "@lm_fe/utils";



/** 更新复诊记录数据 */
async function updateRvisitInfoOfOutpatient(data: any) {
  const res = await request.post('/api/doctor/updateRvisitRecordOfOutpatient', data);
  return res.data
}

/**  删除诊断 */
async function deleteDiagnosis(id) {
  const res = await request.delete(`/api/doctor/deleteDiagnosisOfOutpatient/${id}`);
  return res.data
}

/** 排序诊断 */
async function sortDiagnoses(data: any) {
  const res = await request.put('/api/doctor/sortDiagnosesOfOutpatient', data);
  return res.data
}


export const requestMethods_further = {

  updateRvisitInfoOfOutpatient,
  deleteDiagnosis,
  sortDiagnoses,
};
export default requestMethods_further