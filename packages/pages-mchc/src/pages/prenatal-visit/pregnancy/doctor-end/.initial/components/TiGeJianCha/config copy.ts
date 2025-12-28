import { ICommonOption, mchcEnv, rt_ctx } from '@lm_fe/env';
import { not_yes_input, pressure_fd } from '@lm_fe/pages';
import { defineFormConfig } from '@lm_fe/service';
const ctx = rt_ctx
function get_无option(suffix?: string) {
  const options: ICommonOption[] = [
    { value: 1, label: '无' },
    { value: 2, label: '有', warning: true, inputType: 'Input', suffix },
  ]
  return options
}
function get_正常option(suffix?: string) {
  const options: ICommonOption[] = [
    { value: 1, label: '正常' },
    { value: 2, label: '其他', warning: true, inputType: 'Input', suffix },
  ]
  return options
}
function get_正常option2(suffix?: string) {
  const options: ICommonOption[] = [
    { value: 1, label: '正常' },
    { value: 2, label: '其他', suffix },
  ]
  return options
}
function get_触及option(suffix?: string) {
  const options: ICommonOption[] = [
    { value: 1, label: '未触及' },
    { value: 2, label: '触及', warning: true, inputType: 'Input', suffix },
  ]
  return options
}
export default defineFormConfig(
  [
    { name: 'id', form_hidden: true },

    {
      "label": "基本体检",
      children: [
        // {
        //   "key": "physicalBaseExam.MyPressure1__",
        //   "label": "血压-首测",
        //   "inputType": "MyPressure",
        //   "inputProps": { 'unit': 'mmHg', marshal: 2 },
        //   layout: '1/3',

        // },

        // {
        //   "key": "physicalBaseExam.MyPressure2__",
        //   "label": "血压-二测",
        //   "inputType": "MyPressure",
        //   "inputProps": { 'unit': 'mmHg', marshal: 2 },
        //   layout: '1/3',

        // }, {
        //   "key": "physicalBaseExam.MyPressure3__",
        //   "label": "血压-三测",
        //   "inputType": "MyPressure",
        //   "inputProps": { 'unit': 'mmHg', marshal: 2 },
        //   layout: '1/3',

        // },

        pressure_fd(
          { label: '血压首测', isNewRow: true, layout: '1/3', },
          { name: 'physicalBaseExam.systolic', },
          { name: 'physicalBaseExam.diastolic', }
        ),
        pressure_fd(
          { label: '血压二测', layout: '1/3', },
          { name: 'physicalBaseExam.systolic2', },
          { name: 'physicalBaseExam.diastolic2', }
        ),
        pressure_fd(
          { label: '血压三测', layout: '1/3', },
          { name: 'physicalBaseExam.systolic3', },
          { name: 'physicalBaseExam.diastolic3', }
        ),


        {
          "key": "physicalBaseExam.pulse",
          "label": "脉搏",
          "inputType": "InputNumber",
          required: true,
          "inputProps": { 'unit': '次/分' },
          layout: '1/3',

        },
        {
          "key": "physicalBaseExam.preheight",
          "label": "身高",
          "inputType": "InputNumber",
          required: true,
          "inputProps": { 'unit': 'cm' },
          processLocal: function (v, form) {
            if (form) {
              const values = form.getFieldsValue();
              const weight = ctx.utils.get<number>(values, 'physicalBaseExam.weight');
              const preweight = ctx.utils.get<number>(values, 'physicalBaseExam.preweight');

              form.setFieldsValue({
                physicalBaseExam: {
                  bmi: ctx.utils.calc_bmi(weight, v),
                  preBmi: ctx.utils.calc_bmi(preweight, v),

                }
              })
            }
          },
          layout: '1/3',

        }, {
          "key": "physicalBaseExam.weight",
          "label": "现体重",
          "inputType": "InputNumber",
          "inputProps": { 'unit': 'kg' },
          layout: '1/3',
          processLocal: function (v, form) {
            if (form) {
              const values = form.getFieldsValue();
              const height = ctx.utils.get<number>(values, 'physicalBaseExam.preheight');

              form.setFieldsValue({
                physicalBaseExam: {
                  bmi: ctx.utils.calc_bmi(v, height),
                }
              })
            }
          },
        },

        {
          "key": "physicalBaseExam.bmi",
          "label": "BMI",
          "inputType": "input",
          "inputProps": { 'unit': 'kg/㎡', 'disabled': true },
          layout: '1/3',
        },

        {
          "key": "physicalBaseExam.preweight",
          "label": "孕前体重",
          "inputType": "InputNumber",
          required: true,
          "inputProps": { 'unit': 'kg' },
          layout: '1/3',
          processLocal: function (v, form) {
            if (form) {
              const values = form.getFieldsValue();
              const height = ctx.utils.get<number>(values, 'physicalBaseExam.preheight');

              form.setFieldsValue({
                physicalBaseExam: {
                  preBmi: ctx.utils.calc_bmi(v, height),
                }
              })
            }
          },

        },
        {
          "key": "physicalBaseExam.preBmi",
          "label": "孕前BMI",
          "inputType": "input",
          "inputProps": { 'unit': 'kg/㎡', 'disabled': true },
          layout: '1/3',
        },
      ]
    },
    {
      "label": "内科检查",
      children: [
        {
          "key": "physicalgeneralExam.heartrate",
          "label": "心率",
          "inputType": "InputNumber",
          "inputProps": { 'unit': '次/分' },
          layout: '1/3'
        },
        not_yes_input('physicalgeneralExam.skin', '皮肤黏膜', { inputProps: { options: get_正常option2() } }, {}, 2),
        {
          key: "physicalgeneralExam.skin__",
          "label": "皮肤黏膜",
          "inputType": "MC",
          inputProps: {
            options: get_正常option(),
          },
          layout: '1/3',
        },
        {
          key: "physicalgeneralExam.thyroid__",
          "label": "甲状腺",
          "inputType": "MC",
          inputProps: {
            options: get_正常option(),
          },
          layout: '1/3',

        },
        {
          key: "physicalgeneralExam.breast__",
          "label": "乳房乳腺",
          "inputType": "MC",
          inputProps: {
            options: get_正常option(),
          },
          layout: '1/3',

        },
        {
          key: "physicalgeneralExam.respiratory__",
          "label": "呼吸音",
          "inputType": "MC",
          inputProps: {
            options: get_正常option(),
          },
          layout: '1/3',
        },
        {
          key: "physicalgeneralExam.rales__",
          "label": "啰音",
          "inputType": "MC",
          inputProps: {
            options: get_无option(),
          },
          layout: '1/3',
        },

        {
          key: "physicalgeneralExam.heartrhythm__",
          "label": "心律",
          "inputType": "MC",
          inputProps: {
            options: '齐,不齐i',
          },
          layout: '1/3',
        },
        {
          key: "physicalgeneralExam.murmurs__",
          "label": "杂音",
          "inputType": "MC",
          inputProps: {
            options: get_无option(),
          },
          layout: '1/3',
        },
        {
          key: "physicalgeneralExam.liver__",
          "label": "肝脏",
          "inputType": "MC",
          inputProps: {
            options: get_触及option(),
          },
          layout: '1/3',
        }, {
          key: "physicalgeneralExam.spleen__",
          "label": "脾脏",
          "inputType": "MC",
          inputProps: {
            options: get_触及option(),
          },
          layout: '1/3',
        },
        {
          key: "physicalgeneralExam.spine__",
          "label": "脊柱",
          "inputType": "MC",
          inputProps: {
            options: get_正常option(),
          },
          layout: '1/3',
        },
        {
          key: "physicalgeneralExam.physiologicalreflection__",
          "label": "生理反射",
          "inputType": "MC",
          inputProps: {
            options: get_正常option(),
          },
          layout: '1/3',
        },
        {
          key: "physicalgeneralExam.pathologicalreflection__",
          "label": "病理反射",
          "inputType": "MC",
          inputProps: {
            options: get_无option(),
          },
          layout: '1/3',
        },
        {
          key: "physicalgeneralExam.edema",
          "label": "下肢水肿",
          "inputType": "MC",
          inputProps: {
            options: mchcEnv.get_other_options('edemaOptions'),
            marshal: 0
          },
          layout: '1/3',

        },
        {
          inputType: 'check_invert_button',
          layout: '1/3',

        },
        {
          "key": "physicalgeneralExam.otherNote",
          "label": "其他",
          "inputType": "input",
          layout: '2/3',
        }
      ]
    },]
);
