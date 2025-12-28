import { ICommonOption } from "@lm_fe/env";
import { defineFormConfig } from "@lm_fe/service";
const options_正常异常: ICommonOption[] = [
    { label: '正常', value: 1 },
    { label: '异常', value: 2, warning: true, inputType: 'input' },
]
const options_未见异常: ICommonOption[] = [
    { label: '未见异常', value: 1 },
    { label: '异常', value: 2, warning: true, inputType: 'input' },
]

export default defineFormConfig(
    [{


        "name": "第二性征",





        "children": [{

            "key": "breast__",
            "label": "乳房",


            "inputType": "MC",
            required: true,

            "inputProps": { options: options_正常异常, },
            layout: '1/3',





        }, {

            "key": "pubes__",
            "label": "阴毛",

            "inputType": "MC",
            required: true,

            "inputProps": { options: options_正常异常, },
            layout: '1/3',





        }, {

            "key": "secondSexCharacterOther",
            "label": "其他",

            "inputType": "input",



            layout: '1/3',





        }]
    },
    {


        "name": "生殖器官",





        "children": [
            {

                "key": "vulva__",
                "label": "外阴",

                "inputType": "MC",

                required: true,
                layout: '1/3',
                inputProps: { options: options_未见异常, }





            }, {

                "key": "vagina__",
                "label": "阴道",

                "inputType": "MC",

                required: true,
                layout: '1/3',
                inputProps: { options: options_未见异常, }





            }, {

                "key": "cervix__",
                "label": "宫颈",

                "inputType": "MC",

                required: true,
                layout: '1/3',
                inputProps: { options: options_未见异常, }





            }, {

                "key": "uterus__",
                "label": "子宫",

                "inputType": "MC",

                required: true,
                layout: '1/3',
                inputProps: { options: options_未见异常, }





            },
            {

                "key": "secretions__",
                "label": "分泌物",

                "inputType": "MC",

                required: true,
                layout: '1/3',
                inputProps: { options: options_未见异常, }





            },
            {

                "key": "appendix__",
                "label": "附件",

                "inputType": "MC",

                required: true,
                layout: '1/3',
                inputProps: { options: options_未见异常, }





            },

            {

                "key": "anus__",
                "label": "肛门",

                "inputType": "MC",

                required: true,
                layout: '1/3',
                inputProps: { options: options_未见异常, }





            },
            {

                "key": "genitalsOther",
                "label": "其他",

                "inputType": "input",


                layout: '1/3',





            }, {

                "key": "selectBtn2",
                "label": "一键勾选",

                "inputType": "check_invert_button",


                layout: '1/3',






            }]
    },
    {
        "label": "检查医生",
        "key": "checkDoctor",
        required: true,
        layout: '1/3',

        "inputType": "MA",
        inputProps: { memorieskey: '妇保-检查医生' },

    }
    ]
)
