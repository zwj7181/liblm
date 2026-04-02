import { MyIcon, QRCode_L } from '@lm_fe/components';
import { mchcEnv, mchcEvent, rt_ctx } from '@lm_fe/env';
import { BF_Wrap2, mchcModal__, MyBaseList } from '@lm_fe/pages';
import { request } from '@lm_fe/utils';
import { Button, Switch } from 'antd';
import { useEffect } from 'react';
import { WhichType } from '../../types';

const ctx = rt_ctx
const React = rt_ctx.React

export default function List(props: { which_type: WhichType }) {
  const { which_type } = props
  const the_type = which_type === '孕妇学校' ? 1 : 2

  useEffect(() => {
    const rm = mchcEvent.on_rm('custom_msg', e => {
      const rowData = e.data
      if (e.type === 'courses.reserveNum') {
        openFuckModal(rowData)
      }
    })

    return rm
  }, [])


  return <MyBaseList
    the_type
    table_preset={
      {
        title: `${which_type}-课程列表`,
        tableColumns: () => import('./form_config'),
        name: '/api/courses',
        searchParams: { 'course.type.equals': the_type },
        beforeSubmit: function (v: any) {
          v.type = v.type || ctx.props.the_type
          return v
        },
        searchConfig: [
          {
            name: 'courseDate',
            label: '开课日期',
            inputType: 'rangeDate',
          },
          {
            label: '课程标题',
            inputType: 'input',
            name: 'name',
          },
        ]
      }
    }
    // name={config?.name}
    // searchParams={config?.searchParams}
    // searchConfig={config?.searchConfig}

    useListSourceCount
    showCopy
    // beforeSubmit={v => ({ ...v, type })}
    ActionAddonBefore={(ctx) => <Button size='small' onClick={() => { handleQrcodeView(ctx.rowData) }} icon={<MyIcon value='QrcodeOutlined' />} />}
  // genColumns={ctx => {
  //   return [
  //     ...(config?.tableColumns ?? []),
  //     {
  //       dataIndex: 'status',
  //       title: '发布',
  //       layout: '1/1',
  //       inputType: 'MC',
  //       width: 50,
  //       inputProps: { marshal: 0, options: mchcEnv.get_other_options('nyOptions') },

  //       render: (status: any, rowData: any) => {
  //         return (
  //           <Switch size="small" checked={status} onChange={() => {
  //             request
  //               .put('/api/courses', { ...rowData, status: !rowData.status })
  //               .then(() => { ctx.handleSearch() })
  //           }} />

  //         );
  //       },

  //     },
  //     ctx.actionCol
  //   ]
  // }}
  />
}



function handleQrcodeView(rowData: any) {

  mchcModal__.open('test', {
    title: '患者手机端-首页-扫一扫-进行扫码签到',
    width: 440,
    // bodyStyle: { height: 400 },
    modal_data: {
      content: <QRCode_L
        value={`courseid~${rowData.id}~${rowData.name}`}
        size={380}
      />

    }
  })
};

function openFuckModal(rowData: any) {
  mchcModal__.open('test', {
    title: '已预约列表',
    modal_data: {
      content: <MyBaseList
        name='/api/courses/reservations'
        search
        showAdd={false}
        showAction={false}
        searchParams={{ courseId: rowData.id }}
        tableColumns={[
          {
            title: '患者姓名',
            dataIndex: ['pregnancy', 'name'],
            width: 200,
            align: 'center',
          },
          {
            title: '身份证号：',
            dataIndex: ['pregnancy', 'idNO'],
            width: 200,
            align: 'center',
          },
        ]
        }
      />
    }
  })
}