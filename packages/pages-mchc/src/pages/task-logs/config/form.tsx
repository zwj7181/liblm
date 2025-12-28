import { mchcEnv } from "@lm_fe/env";

export const queryFormDescriptions = {
  title: {
    label: '标题',
    inputType: 'input',
    filterType: '',
  },
  pushStatus: {
    label: '推送状态',
    inputType: 'select',
    filterType: 'equals',
    options: mchcEnv.get_options('推送状态')
  },
};

export default {
  queryFormDescriptions,
};
