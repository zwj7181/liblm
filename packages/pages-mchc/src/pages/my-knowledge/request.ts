/*
 * @Descripttion: api请求
 * @Author: cjl
 * @Date: 2021-11-10 17:18:38
 * @LastEditTime: 2021-11-10 17:31:43
 */

import { request } from "@lm_fe/utils";


/**
 * 新增诊疗管理
 * /api/medical-practices
 */
export async function addMedicalPractices(postData: any) {
  const res = await request.post('/api/medical-practices', postData);
  return res.data;
}

/**
 * 更新诊疗管理
 * /api/medical-practices
 */
export async function updateMedicalPractices(postData: any) {
  const res = await request.put('/api/medical-practices', postData);
  return res.data;
}

/**
 * 更具id得到诊疗管理
 * /api/medical-practices/{id}
 */
export async function getMedicalById(id: string) {
  const res = await request.get(`/api/medical-practices/${id}`);
  return res.data;
}

/**
 * 删除诊疗管理
 * /api/medical-practices/{id}
 */
export async function delMediacalById(id: string) {
  const res = await request.delete('/api/medical-practices/' + id);
  return res.data;
}

/**
 * 确认已读
 * /api/medical-practices/reading
 */
export async function medicalRead(postData: any) {
  const res = await request.put('/api/medical-practices/reading', postData);
  return res.data;
}

/**
 * 置顶接口
 * /api/medical-practices/top
 */
export async function medicalTop(postData: any) {
  const res = await request.put('/api/medical-practices/top', postData);
  return res.data;
}
export default {
  addMedicalPractices,
  updateMedicalPractices,
  getMedicalById,
  delMediacalById,
  medicalRead,
  medicalTop,
};
