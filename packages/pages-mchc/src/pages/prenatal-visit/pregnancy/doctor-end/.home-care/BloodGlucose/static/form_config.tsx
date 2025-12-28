import { rt_ctx } from '@lm_fe/env';
import { defineFormConfig } from '@lm_fe/service';
const ctx = rt_ctx
const React = ctx.React
export default defineFormConfig(
  [
    {
      title: '日期',
      dataIndex: 'monitorDate',
      render: (text: any,) => ctx.utils.formatDateTime(text,),
    },
    { title: '孕周', dataIndex: 'gw', key: 'gw' },
    {
      title: '早餐前',
      dataIndex: 'preBreakfast',
      render: (text: any, record: any) => {
        return ctx.ui.render_color(text, Number(text) > 5.6);
      },
    },
    {
      title: '备注',
      dataIndex: 'preBreakfastNoteNote',
      render: (text: any, record: any) => {
        var note = record['preBreakfastNote']
        var ex = record['preBreakfastExercise']
        if (note && ex) return note + '-' + ex
        return note || ex || ''
      },
    },
    {
      title: '早餐后2h',
      dataIndex: 'pastBreakfast',
      render: (text: any, record: any) => {
        return ctx.ui.render_color(text, Number(text) > 6.7);

      },
    },
    {
      title: '备注',
      dataIndex: 'pastBreakfastNote',
      render: (text: any, record: any) => {
        var note = record['pastBreakfastNote']
        var ex = record['pastBreakfastExercise']
        if (note && ex) return note + '-' + ex
        return note || ex || ''
      },
    },
    {
      title: '午餐前',
      dataIndex: 'preLunch',
      render: (text: any, record: any) => {
        return ctx.ui.render_color(text, Number(text) > 5.6);

      },
    },
    {
      title: '备注',
      dataIndex: 'preLunchNote',
      render: (text: any, record: any) => {
        var note = record['preLunchNote']
        var ex = record['preLunchExercise']
        if (note && ex) return note + '-' + ex
        return note || ex || ''
      },
    },
    {
      title: '午餐后2h',
      dataIndex: 'pastLunch',
      render: (text: any, record: any) => {
        return ctx.ui.render_color(text, Number(text) > 6.7);
      },
    },
    {
      title: '备注',
      dataIndex: 'pastLunchNote',
      render: (text: any, record: any) => {
        var note = record['pastLunchNote']
        var ex = record['pastLunchExercise']
        if (note && ex) return note + '-' + ex
        return note || ex || ''
      },
    },
    {
      title: '晚餐前',
      dataIndex: 'preDinner',
      render: (text: any, record: any) => {
        return ctx.ui.render_color(text, Number(text) > 5.6);

      },
    },
    {
      title: '备注',
      dataIndex: 'preDinnerNote',
      render: (text: any, record: any) => {
        var note = record['preDinnerNote']
        var ex = record['preDinnerExercise']
        if (note && ex) return note + '-' + ex
        return note || ex || ''
      },
    },
    {
      title: '晚餐后2h',
      dataIndex: 'pastDinner',
      render: (text: any, record: any) => {
        return ctx.ui.render_color(text, Number(text) > 6.7);

      },
    },
    {
      title: '备注',
      dataIndex: 'pastDinnerNote',
      render: (text: any, record: any) => {
        var note = record['pastDinnerNote']
        var ex = record['pastDinnerExercise']
        if (note && ex) return note + '-' + ex
        return note || ex || ''
      },
    },
    {
      title: '睡前',
      dataIndex: 'preSleep',
      render: (text: any, record: any) => {
        return ctx.ui.render_color(text, Number(text) > 5.3);

      },
    },
    {
      title: '备注',
      dataIndex: 'preSleepNote',
      render: (text: any, record: any) => {
        var note = record['preSleepNote']
        var ex = record['preSleepExercise']
        if (note && ex) return note + '-' + ex
        return note || ex || ''
      },
    },
  ]
)

