import { mchcEnv } from "@lm_fe/env";

export const modalFormDescriptions = {
  name: {
    key: 'name',
    label: '角色代码',
    rules: [{ required: true, message: '角色代码是必填项' }],
    inputType: 'input',
    inputProps: {

    },
  },
  nickname: {
    key: 'nickname',
    label: '角色名称',
    rules: [{ required: true, message: '角色名称是必填项' }],
    inputType: 'input',
    inputProps: {

    },
  },
  groupdesc: {
    key: 'groupdesc',
    label: '角色描述',
    rules: [{ required: true, message: '角色描述是必填项' }],
    inputType: 'text_area',
    inputProps: {

    },
  },
  groupRanks: {
    key: 'groupRanks',
    label: '等级分类',
    inputType: 'MyEditTable',
    inputProps: {
      marshal: 0,
      showEdit: true,
      formDescriptions: [
        {

          dataIndex: 'name',
          title: '名称',
          inputType: 'MyInput',

          inputProps: {

          },
        },
        {
          dataIndex: 'rankSort',
          title: '等级',
          inputType: 'input_number',
          inputProps: {

          },
        },
        {
          dataIndex: 'administrator',
          title: '管理',
          inputType: 'MySwitch',
          inputProps: {
            options: mchcEnv.get_other_options('nyOptions'),
            marshal: 0
          },
        },


      ]
    },
  },
  // permissions: {
  //   key: 'permissions',
  //   label: '管理权限',
  //   inputType: 'tree_select',
  //   inputProps: {
  //     
  //   },
  // },
  // test: {
  //   key: 'test',
  //   label: 'test',
  //   rules: [{ required: true, message: 'test是必填项' }],
  //   inputType: 'input',
  //   inputProps: {
  //     
  //   },
  // },
};

export default {
  modalFormDescriptions,
};
