import { request } from '@lm_fe/utils';

/**获取双多胎 */
export async function getPregnancyCaseOfOutpatient(id: string) {
  const res = await request.get('/api/doctor/getPregnancyCaseOfOutpatient?id=' + id);
  return res.data;
}

/**更新双多胎 */
export async function updatePregnancyCaseOfOutpatient(data: any) {
  const res = await request.put('/api/doctor/updatePregnancyCaseOfOutpatient', data);
  return res.data;
}
