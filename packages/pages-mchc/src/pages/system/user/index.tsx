
import { MyBaseList } from '@lm_fe/pages';
import { defineFormConfig } from '@lm_fe/service';
import React from 'react';
export default function User(props: any) {
  return <MyBaseList bf_preset={{

    title: '系统管理-用户管理',
    name: "/api/users",
    tableColumns: () => import('./form_config'),
    // tableColumns: C,
    searchConfig: defineFormConfig(
      [

        { label: '账号', name: 'login', inputType: 'Input' },
        { label: '姓名', name: 'firstName', inputType: 'Input' },
        {
          label: '角色', name: 'role', inputType: 'MS',
          filterType: 'contains',
          inputProps: {
            marshal: 0,
            fetch_options: {
              url: "/api/groups",
              labelKey: "nickname",
              valueKey: "id",
            }
          },
        },
        {
          label: '分数', name: 'score', inputType: 'ArrayInput', inputProps: {
            options: [
              { inputType: 'input_number', },
              { inputType: 'input_number', },
            ]
          }
        },

      ]
    )
  }} />
}