import { request } from "@lm_fe/utils";

export const reportVideo = async (data) => {
  (await request.put('/api/videos', {
    ...data,
    release: true,
  })).data;
};

export const unreportVideo = async (data) => {
  (await request.put('/api/videos', {
    ...data,
    release: false,
  })).data;
};
