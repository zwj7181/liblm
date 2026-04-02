import { APP_CONFIG, rt_ctx } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
import { AnyObject } from "@lm_fe/utils";

const ctx = rt_ctx
const React = ctx.React


export default defineFormConfig(
  [
    {
      title: '预约编号',
      dataIndex: 'id',
      width: APP_CONFIG.CELL_WIDTH_SMALL,
      form_hidden: true,
    },
    // 新生儿
    {
      title: '新生儿信息',
      inputType: 'title',
      hidden: true,
    },

    { title: '姓名', name: 'neonates.0.name', inputType: 'MA', layout: '1/3', inputProps: {}, showDeps(f) { return f.getFieldValue('id') }, },
    { title: '性别', name: 'neonates.0.gender', inputType: 'MS', layout: '1/3', inputProps: { uniqueKey: '性别3', marshal: 0 }, showDeps(f) { return f.getFieldValue('id') }, },
    { title: '出生次序', name: 'neonates.0.birthOrder', inputType: 'input_number', layout: '1/3', hidden: true, showDeps(f) { return f.getFieldValue('id') }, },
    { title: '体重', name: 'neonates.0.weight', inputType: 'input_number', layout: '1/3', hidden: true, showDeps(f) { return f.getFieldValue('id') }, },
    { title: '身长', name: 'neonates.0.height', inputType: 'input_number', layout: '1/3', hidden: true, showDeps(f) { return f.getFieldValue('id') }, },
    { title: '健康状况', name: 'neonates.0.status', inputType: 'MA', layout: '1/3', inputProps: { options: '健康' }, hidden: true, showDeps(f) { return f.getFieldValue('id') }, },
    { title: '出生时间', name: 'neonates.0.birthDate', inputType: 'DatePicker', layout: '1/3', inputProps: {}, hidden: true, showDeps(f) { return f.getFieldValue('id') }, },

    {
      name: "neonates",
      // label: "",
      hidden: true,
      showDeps(f) { return !f.getFieldValue('id') },
      inputType: "ArrayPanel",
      processRemote: function (v, form) { return ctx.utils.isArray(v) ? v : [{}] },

      "inputProps": {
        "marshal": 0,
        "tip": "胎儿",

        // "targetLabelCol": 2,
        "formDescriptions": [
          { title: '出生次序', name: 'birthOrder', inputType: 'input_number', layout: '1/3' },
          { title: '性别', name: 'gender', inputType: 'MS', layout: '1/3', inputProps: { uniqueKey: '性别3', marshal: 0 } },
          { title: '体重', name: 'weight', inputType: 'input_number', layout: '1/3' },
          { title: '身长', name: 'height', inputType: 'input_number', layout: '1/3' },
          { title: '健康状况', name: 'status', inputType: 'MA', layout: '1/3', inputProps: { options: '健康' } },
          { title: '出生时间', name: 'birthDate', inputType: 'DatePicker', layout: '1/3', inputProps: {} },
          { title: '新生儿姓名', name: 'name', inputType: 'MA', layout: '1/3', inputProps: {} },
        ]
      },
      "layout": "1/1"
    },



    // 母亲
    {
      title: '母亲信息',
      inputType: 'title',
      hidden: true,
    },
    {
      title: '母亲姓名',
      dataIndex: 'motherName',
      width: APP_CONFIG.CELL_WIDTH_SMALL,
      required: true,

      layout: '1/3',
    },
    {
      title: '证件类型',
      dataIndex: 'motherIdType',
      inputType: 'MS',

      inputProps: {
        uniqueKey: '证件类型',
        marshal: 0
      },
      required: true,
      hidden: true,
      layout: '1/3',
    },
    {
      title: '证件号码',
      dataIndex: 'motherIdNO',
      required: true,

      hidden: true,
      layout: '1/3',
    },
    {
      title: '民族',
      dataIndex: 'motherEthnic',
      inputType: 'MA',
      inputProps: { uniqueKey: '民族s', },
      required: true,

      hidden: true,
      layout: '1/3',
    },
    {
      title: '户口地址',
      dataIndex: 'motherPermanentResidenceAddress',
      inputType: 'MyAddress',
      inputProps: {},

      required: true,
      hidden: true,
      layout: '2/3',
    },



    // 父亲
    {
      title: '父亲信息',
      inputType: 'title',
      hidden: true,
    },
    {
      title: '父亲姓名',
      dataIndex: 'fatherName',
      width: APP_CONFIG.CELL_WIDTH_SMALL,
      layout: '1/3',
    },

    {
      title: '证件类型',
      dataIndex: 'fatherIdType',
      inputType: 'MS',

      inputProps: {
        uniqueKey: '证件类型',
        marshal: 0
      },
      hidden: true,
      layout: '1/3',
    },
    {
      title: '证件号码',
      dataIndex: 'fatherIdNO',
      hidden: true,
      layout: '1/3',
    },
    {
      title: '民族',
      dataIndex: 'fatherEthnic',
      inputType: 'MA',
      inputProps: { uniqueKey: '民族s', },
      hidden: true,
      layout: '1/3',
    },
    {
      title: '户口地址',
      dataIndex: 'fatherPermanentResidenceAddress',
      inputType: 'MyAddress',
      hidden: true,
      layout: '2/3',
    },


    // 预约
    {
      title: '预约信息',
      inputType: 'title',
      hidden: true,
    },


    {
      title: '预约日期',
      dataIndex: 'reserveDate',
      width: APP_CONFIG.CELL_WIDTH_SMALL,
      inputType: 'DatePicker',

      layout: '1/3',
    },
    {
      title: '预约时间',
      dataIndex: 'reserveTime',
      inputType: 'MA',
      inputProps: { options: '上午,下午' },
      width: APP_CONFIG.CELL_WIDTH_SMALL,

      layout: '1/3',

    },
    {
      title: '预约地点',
      dataIndex: 'reserveLocation',
      width: APP_CONFIG.CELL_WIDTH_SMALL,

      layout: '1/3',

    },
    {
      title: '预约状态',
      dataIndex: 'reserveState',
      width: APP_CONFIG.CELL_WIDTH_SMALL,
      form_hidden: true,
      inputType: 'MC',
      inputProps: { marshal: 0, options: [{ label: '已预约', value: 0 }, { label: '已领取', value: 1 }, { label: '已取消', value: 2 },] },
    },
    { label: '领取人姓名', name: 'receiverName', layout: '1/3', hidden: true, showDeps: { reserveState: [1] } },
    { label: '与新生儿关系', name: 'receiverRelative', inputType: 'MA', inputProps: { options: '母子,母女,父子,父女' }, layout: '1/3', hidden: true, showDeps: { reserveState: [1] } },
    { label: '证件类型', name: 'receiverIdType', inputType: 'MS', inputProps: { uniqueKey: '证件类型', marshal: 0 }, layout: '1/3', hidden: true, showDeps: { reserveState: [1] } },
    { label: '证件号码', name: 'receiverIdNo', inputType: 'MA', layout: '1/3', hidden: true, showDeps: { reserveState: [1] } },
    { label: '领取日期', name: 'reserveDate', inputType: 'DatePicker', layout: '1/3', hidden: true, showDeps: { reserveState: [1] } },
    {
      title: '操作列',
      dataIndex: 'reserveState',
      form_hidden: true,
      width: 160,
      render: (state, record) => {

        return <ctx.ui.Space>

          {
            state === 0 && ctx.ui.render_btn('编辑', () => {

              ctx.modal().
                open('modal_form', {
                  modal_data: {
                    onSubmit(new_data: AnyObject, old_data: AnyObject) {

                      const neonates = new_data.neonates
                      if (!ctx.utils.isArray(neonates) && ctx.utils.isObject(neonates[0])) {
                        new_data.neonates = [neonates[0]]
                      }

                      return ctx.request.put(ctx.props.table_preset.name, new_data,)
                        .then(() => {
                          ctx.props.table_helper.handleSearch()
                          return 1
                        })
                    },
                    getInitialData() {
                      return Promise.resolve(record)
                    },
                    formDescriptions: ctx.props.table_preset.tableColumns
                  }
                })


            }, { size: 'small' })
          }
          {
            (state === 1 || state === 2) && ctx.ui.render_btn('查看', () => {

              ctx.modal().
                open('modal_form', {
                  modal_data: {
                    disableAll: true,
                    onSubmit() {
                      return Promise.resolve(1)
                    },
                    getInitialData() {
                      return Promise.resolve(record)
                    },
                    formDescriptions: ctx.props.table_preset.tableColumns
                  }
                })


            }, { size: 'small' })
          }
          {
            state == 0 && ctx.ui.render_btn('领取', () => {

              ctx.modal().
                open('modal_form', {
                  width: '40vw',
                  styles: { body: { height: '40vh', } },
                  modal_data: {
                    onSubmit(new_data: any, old_data: any) {

                      return ctx.request.put(ctx.props.table_preset.name, ctx.utils.set(new_data, 'reserveState', 1)).then(() => {
                        ctx.props.table_helper.handleSearch()
                        return 1
                      })
                    },
                    getInitialData() {
                      return Promise.resolve(record)
                    },
                    formDescriptions: [
                      { label: '领取人姓名', name: 'receiverName', layout: '1/2', required: true },
                      { label: '与新生儿关系', name: 'receiverRelative', inputType: 'MA', inputProps: { options: '母子,母女,父子,父女' }, layout: '1/2', required: true },
                      { label: '证件类型', name: 'receiverIdType', inputType: 'MS', inputProps: { uniqueKey: '证件类型', marshal: 0 }, layout: '1/2', required: true },
                      { label: '证件号码', name: 'receiverIdNo', inputType: 'MA', layout: '1/2', required: true },
                      { label: '领取日期', name: 'reserveDate', inputType: 'DatePicker', layout: '1/2', required: true },
                    ]
                  }
                })

            }, { size: 'small' })
          }
          {
            state == 0 && ctx.ui.render_btn('取消', () => {

              const ok = confirm('是否取消？')
              if (ok)
                ctx.request.put(ctx.props.table_preset.name, ctx.utils.set(record, 'reserveState', 2)).then(() => {
                  ctx.props.table_helper.handleSearch()
                  return 1
                })

            }, { size: 'small' })
          }
        </ctx.ui.Space>

      },
    },
  ]
)