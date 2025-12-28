import { QRCode_L } from '@lm_fe/components';
import { mchcEvent } from '@lm_fe/env';
import { BF_Wrap2, mchcModal__, MyBaseList } from '@lm_fe/pages';
import { request } from '@lm_fe/utils';
import { Switch } from 'antd';
import React, { useEffect } from 'react';



export default function List(props: {}) {
  const { Wrap, config } = BF_Wrap2({
    default_conf: {
      title: `知识库-列表`,
      tableColumns: () => import('./form_config'),
      name: '/api/knowledges',
      searchParams: { 'sort': 'id,desc' },
      searchConfig: [
        {
          name: 'title',
          label: '标题',
        },
        {
          label: '类型',
          name: 'type',
          inputType: 'MS',
          inputProps: { uniqueKey: 'Knowledge.knowledgeType' }
        },
      ]
    }
  })
  useEffect(() => {
    const rm = mchcEvent.on_rm('custom_msg', e => {

    })

    return rm
  }, [])


  return <Wrap>
    <MyBaseList
      bf_conf={config}
      // name={config?.name}
      // searchParams={config?.searchParams}
      // searchConfig={config?.searchConfig}

      useListSourceCount
      showCopy
      beforeSubmit={v => ({ ...v })}
      // ActionAddonBefore={(ctx) => <Button size='small' onClick={() => { handleQrcodeView(ctx.rowData) }} icon={<QrcodeOutlined />} />}
      genColumns={ctx => {
        return [
          ...(config?.tableColumns ?? []),
          {
            dataIndex: 'release',
            title: '发布',
            layout: '1/1',
            width: 50,
            isActive: 0,
            fixed: 'right',

            render: (status: any, rowData: any) => {
              return (
                <Switch size="small" checked={status} onChange={() => {
                  request
                    .put('/api/knowledges', { ...rowData, release: !status })
                    .then(() => { ctx.handleSearch() })
                }} />

              );
            },

          },
          ctx.actionCol
        ]
      }}
    />
  </Wrap>
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
          },]}
      />
    }
  })
}