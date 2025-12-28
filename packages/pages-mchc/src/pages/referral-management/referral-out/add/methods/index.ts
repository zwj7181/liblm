import { request } from "@lm_fe/utils";

export const getPregnancyByOutpatientNO = async (outpatientNO: string) => {
  return (await request.get(`/api/pregnancies?outpatientNO.equals=${outpatientNO}`)).data;
};
