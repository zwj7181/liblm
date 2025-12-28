import { request } from "@lm_fe/utils";

export const getInformedConsents = async (pregnancyId) => {
  const result = await request.get(`/api/pregnancy-documents?pregnancyId.equals=${pregnancyId}`);
  return result.data
};

export const getDocumentTemplates = async () => {
  const result = await request.get<any[]>(`/api/document-templates?moduleType.equals=3&page=0&size=9999`);
  return result.data
};

export const getInformedConsentById = async (id) => {
  const result = await request.get(`/api/pregnancy-documents/${id}`);
  return result.data
};

export const createInformedConsent = async (data) => {
  const result = await request.post('/api/pregnancy-documents', data);
  return result.data
};

export const updateInformedConsent = async (data) => {
  const result = await request.put('/api/pregnancy-documents', data);
  return result.data
};
