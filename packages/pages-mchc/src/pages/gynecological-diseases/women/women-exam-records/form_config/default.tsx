import { defineFormConfig } from "@lm_fe/service";
import { 知情同意书_tab } from "./common";
export default defineFormConfig(
    [
        {
            isActive: 0,
            title: 'default',
        },
        {
            label: '基本信息',
            children: [
                {
                    "key": "visitType",
                    "label": "检查类型",
                    "inputType": "input",
                    layout: '1/4',
                    required: true,
                },
                {
                    "key": "serialNo",
                    "label": "检查流水号",
                    "inputType": "input",
                    layout: '1/4',
                },
                {
                    "key": "visitDate",
                    "label": "检查日期",
                    "inputType": "single_date_picker",
                    layout: '1/4',
                }, {
                    "key": "chiefcomplaint",
                    "label": "主诉",
                    "inputType": "input",
                    layout: '1/4',
                }, {
                    "key": "diagnosis",
                    "label": "诊断",
                    "inputType": "input",
                    layout: '1/4',
                }, {
                    "key": "diagnosisCode",
                    "label": "诊断编码",
                    "inputType": "input",
                    layout: '1/4',
                }, {
                    "key": "result",
                    "label": "检查结果",
                    "inputType": "input",
                    layout: '1/4',
                }, {
                    "key": "advice",
                    "label": "处理意见",
                    "inputType": "input",
                    layout: '1/4',
                },

            ]
        },
        {
            label: '体格检查',
            children: [{
                layout: '1/4',
                "key": "physicalExam.weight",
                "label": "体重",
                "inputType": "input_with_label",
                "specialConfig": { "type": "number", "labelBefore": "", "labelAfter": "kg" },
                "inputProps": { "placeholder": "请输入体重" },


            }, {
                layout: '1/4',
                "key": "physicalExam.systolic",
                "label": "收缩压",
                "inputType": "input_with_label",
                "specialConfig": { "type": "number", "labelBefore": "", "labelAfter": "mmHg" },
                "inputProps": { "placeholder": "请输入收缩压" },


            }, {
                layout: '1/4',
                "key": "physicalExam.diastolic",
                "label": "舒张压",
                "inputType": "input_with_label",
                "specialConfig": { "type": "number", "labelBefore": "", "labelAfter": "mmHg" },
                "inputProps": { "placeholder": "请输入舒张压" },


            }, {
                layout: '1/4',
                "key": "physicalExam.pulse",
                "label": "脉搏",
                "inputType": "input_with_label",
                "specialConfig": { "type": "number", "labelBefore": "", "labelAfter": "次/秒" },
                "inputProps": { "placeholder": "请输入脉搏" },


            }, {
                layout: '1/4',
                "key": "physicalExam.temperature",
                "label": "体温",
                "inputType": "input_with_label",
                "specialConfig": { "type": "number", "labelBefore": "", "labelAfter": "℃" },
                "inputProps": { "placeholder": "请输入体温" },


            }, {
                layout: '1/4',
                "key": "physicalExam.height",
                "label": "身高",

                "inputType": "input_with_label",
                "specialConfig": { "type": "number", "labelBefore": "", "labelAfter": "cm" },
                "inputProps": { "placeholder": "请输入身高" },


            }, {
                layout: '1/4',
                "key": "physicalExam.height",
                "label": "身高",

                "inputType": "input_with_label",
                "specialConfig": { "type": "number", "labelBefore": "", "labelAfter": "cm" },
                "inputProps": { "placeholder": "请输入身高" },


            }]
        },
        {
            label: '实验室检查',
            children: [{
                layout: '1/4',
                "key": "gynecologicalLabExam.breastXrayDate",
                "label": "乳腺X射线筛查日期",

                "inputType": "single_date_picker",
                "inputProps": { "placeholder": "请输入乳腺X射线筛查日期" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.breastXray",
                "label": "结果",

                "inputType": "normal_select",
                "specialConfig": { "type": "premaritalExamResultMapping" },
                "inputProps": { "placeholder": "请输入结果" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.breastXrayNote",
                "label": "备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入备注" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.breastXrayReport",
                "label": "报告",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入报告" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.syphilisDate",
                "label": "梅毒筛查日期",

                "inputType": "single_date_picker",
                "inputProps": { "placeholder": "请输入梅毒筛查日期" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.syphilisResult",
                "label": "结果",

                "inputType": "normal_select",
                "specialConfig": { "type": "premaritalExamResultMapping" },
                "inputProps": { "placeholder": "请输入结果" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.syphilisNote",
                "label": "备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入备注" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.syphilisReport",
                "label": "报告",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入报告" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.colposcopyDate",
                "label": "阴道镜筛查日期",

                "inputType": "single_date_picker",
                "inputProps": { "placeholder": "请输入阴道镜筛查日期" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.colposcopy",
                "label": "结果",

                "inputType": "normal_select",
                "specialConfig": { "type": "premaritalExamResultMapping" },
                "inputProps": { "placeholder": "请输入结果" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.colposcopyNote",
                "label": "备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入备注" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.colposcopyReport",
                "label": "报告",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入报告" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.cervicalCytologyDate",
                "label": "宫颈细胞学筛查日期",

                "inputType": "single_date_picker",
                "inputProps": { "placeholder": "请输入宫颈细胞学筛查日期" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.cervicalCytology",
                "label": "结果",

                "inputType": "normal_select",
                "specialConfig": { "type": "premaritalExamResultMapping" },
                "inputProps": { "placeholder": "请输入结果" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.cervicalCytologyNote",
                "label": "备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入备注" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.cervicalCytologyReport",
                "label": "报告",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入报告" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.ultrasoundDate",
                "label": "B超筛查日期",

                "inputType": "single_date_picker",
                "inputProps": { "placeholder": "请输入B超筛查日期" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.ultrasoundResult",
                "label": "结果",

                "inputType": "normal_select",
                "specialConfig": { "type": "premaritalExamResultMapping" },
                "inputProps": { "placeholder": "请输入结果" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.ultrasoundNote",
                "label": "备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入备注" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.ultrasoundReport",
                "label": "报告",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入报告" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.leucorrheaDate",
                "label": "白带常规筛查日期",

                "inputType": "single_date_picker",
                "inputProps": { "placeholder": "请输入白带常规筛查日期" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.leucorrheaResult",
                "label": "结果",

                "inputType": "normal_select",
                "specialConfig": { "type": "premaritalExamResultMapping" },
                "inputProps": { "placeholder": "请输入结果" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.leucorrheaNote",
                "label": "备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入备注" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.leucorrheaReport",
                "label": "报告",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入报告" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.gonorrheaDate",
                "label": "淋球菌筛查日期",

                "inputType": "single_date_picker",
                "inputProps": { "placeholder": "请输入淋球菌筛查日期" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.gonorrhea",
                "label": "结果",

                "inputType": "normal_select",
                "specialConfig": { "type": "premaritalExamResultMapping" },
                "inputProps": { "placeholder": "请输入结果" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.gonorrheaNote",
                "label": "备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入备注" },

            }, {
                layout: '1/4',

                "key": "gynecologicalLabExam.gonorrheaReport",
                "label": "报告",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入报告" },

            }]
        },
        {
            label: '妇科检查',
            children: [{
                layout: '1/3',
                "key": "gynecologicalExam.nipple",
                "label": "乳头",
                inputType: 'MC',
                "inputProps": {
                    uniqueKey: 'GynecologicalExam.nipple',
                    marshal: 0,

                },
                // "inputType": "dictionary_select",
                // "specialConfig": { "type": "select", "mode": "single", "boxSpan": 6, "uniqueKey": "GynecologicalExam.nipple" },


            }, {
                layout: '1/3',

                "key": "gynecologicalExam.breast",
                "label": "乳房",
                inputType: 'MC',
                "inputProps": {
                    marshal: 0,
                    uniqueKey: 'GynecologicalExam.breast'
                },
                // "inputType": "dictionary_select",
                // "specialConfig": { "type": "select", "mode": "single", "boxSpan": 6, "uniqueKey": "GynecologicalExam.breast" },

            }, {
                layout: '1/3',

                "key": "gynecologicalExam.engagement",
                "label": "衔接",
                inputType: 'MC',
                "inputProps": {
                    marshal: 0,
                    uniqueKey: 'GynecologicalExam.engagement'
                },
                // "inputType": "dictionary_select",
                // "specialConfig": { "type": "select", "mode": "single", "boxSpan": 6, "uniqueKey": "GynecologicalExam.engagement" },

            }, {
                layout: '1/3',

                "key": "gynecologicalExam.pubes",
                "label": "阴毛",
                inputType: 'MC',
                "inputProps": {
                    marshal: 0,
                    uniqueKey: 'GynecologicalExam.pubes'
                },
                // "inputType": "dictionary_select",
                // "specialConfig": { "type": "select", "mode": "single", "boxSpan": 6, "uniqueKey": "GynecologicalExam.pubes" },

            }, {
                layout: '1/3',

                "key": "gynecologicalExam.vulva",
                "label": "外阴",
                inputType: 'MC',
                "inputProps": {
                    marshal: 0,
                    uniqueKey: 'GynecologicalExam.vulva'
                },
                // "inputType": "dictionary_select",
                // "specialConfig": { "type": "select", "mode": "single", "boxSpan": 6, "uniqueKey": "GynecologicalExam.vulva" },

            }, {
                layout: '1/3',

                "key": "gynecologicalExam.uterus",
                "label": "子宫",
                inputType: 'MC',
                "inputProps": {
                    marshal: 0,
                    uniqueKey: 'GynecologicalExam.uterus'
                },
                // "inputType": "dictionary_select",
                // "specialConfig": { "type": "select", "mode": "single", "boxSpan": 6, "uniqueKey": "GynecologicalExam.uterus" },

            }, {
                layout: '1/3',

                "key": "gynecologicalExam.vagina",
                "label": "阴道",
                inputType: 'MC',
                "inputProps": {
                    marshal: 0,
                    uniqueKey: 'GynecologicalExam.vagina'
                },
                // "inputType": "dictionary_select",
                // "specialConfig": { "type": "select", "mode": "single", "boxSpan": 6, "uniqueKey": "GynecologicalExam.vagina" },

            }, {
                layout: '1/3',

                "key": "gynecologicalExam.cervix",
                "label": "宫颈",
                inputType: 'MC',
                "inputProps": {
                    marshal: 0,
                    uniqueKey: 'GynecologicalExam.cervix'
                },
                // "inputType": "dictionary_select",
                // "specialConfig": { "type": "select", "mode": "single", "boxSpan": 6, "uniqueKey": "GynecologicalExam.cervix" },

            }, {
                layout: '1/3',

                "key": "gynecologicalExam.adnexa",
                "label": "附件",
                inputType: 'MC',
                "inputProps": {
                    marshal: 0,
                    uniqueKey: 'GynecologicalExam.adnexa'
                },
                // "inputType": "dictionary_select",
                // "specialConfig": { "type": "select", "mode": "single", "boxSpan": 6, "uniqueKey": "GynecologicalExam.adnexa" },

            }, {
                layout: '1/3',

                "key": "gynecologicalExam.examType",
                "label": "检查方式",
                inputType: 'MC',
                "inputProps": {
                    marshal: 0,
                    uniqueKey: 'GynecologicalExam.breast'
                },
                // "inputType": "dictionary_select",
                // "specialConfig": { "type": "select", "mode": "single", "boxSpan": 6, "uniqueKey": "GynecologicalExam.breast" },

            }]
        },
        {
            label: '妇科病史',
            children: [{
                layout: '1/4',
                "key": "gynecologicalNote.contraception",
                "label": "避孕方式",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入避孕方式" },


            }, {
                layout: '1/4',
                "key": "gynecologicalNote.contraceptionNote",
                "label": "避孕方式备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入避孕方式备注" },


            }, {
                layout: '1/4',
                "key": "gynecologicalNote.diseaseHistory",
                "label": "疾病史",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入疾病史" },


            }, {
                layout: '1/4',
                "key": "gynecologicalNote.diseaseHistoryNote",
                "label": "疾病史备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入疾病史备注" },


            }, {
                layout: '1/4',
                "key": "gynecologicalNote.sexualBleeding",
                "label": "性交出血",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入性交出血" },


            }, {
                layout: '1/4',
                "key": "gynecologicalNote.sexualBleedingNote",
                "label": "性交出血备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入性交出血备注" },


            }, {
                layout: '1/4',
                "key": "gynecologicalNote.tumour",
                "label": "家族肿瘤史",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入家族肿瘤史" },


            }, {
                layout: '1/4',
                "key": "gynecologicalNote.tumourNote",
                "label": "家族肿瘤史备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入家族肿瘤史备注" },


            }, {
                layout: '1/4',
                "key": "gynecologicalNote.gynecopathy",
                "label": "妇科病史",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入妇科病史" },


            }, {
                layout: '1/4',
                "key": "gynecologicalNote.gynecopathyNote",
                "label": "妇科病史备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入妇科病史备注" },


            }, {
                layout: '1/4',
                "key": "gynecologicalNote.mastopathy",
                "label": "乳腺病史",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入乳腺病史" },


            }, {
                layout: '1/4',
                "key": "gynecologicalNote.mastopathyNote",
                "label": "乳腺病史备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入乳腺病史备注" },


            }, {
                layout: '1/4',
                "key": "gynecologicalNote.complaint",
                "label": "主诉",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入主诉" },


            }]
        },
        {
            label: '月经史',
            children: [{
                layout: '1/4',
                "key": "menstrualHistory.menarche",
                "label": "月经初潮",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入月经初潮" },


            }, {
                layout: '1/4',
                "key": "menstrualHistory.menstrualCycle",
                "label": "周期",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入周期" },


            }, {
                layout: '1/4',
                "key": "menstrualHistory.menstrualPeriod",
                "label": "持续时间",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入持续时间" },


            }, {
                layout: '1/4',
                "key": "menstrualHistory.menstrualVolume",
                "label": "经量",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入经量" },


            }, {
                layout: '1/4',
                "key": "menstrualHistory.lmd",
                "label": "末次月经",

                "inputType": "single_date_picker",
                "inputProps": { "placeholder": "请输入末次月经" },


            }, {
                layout: '1/4',
                "key": "menstrualHistory.menopause",
                "label": "停经",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入停经" },


            }, {
                layout: '1/4',
                "key": "menstrualHistory.menopauseNote",
                "label": "停经备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入停经备注" },


            }, {
                layout: '1/4',
                "key": "menstrualHistory.dysmenorrhea",
                "label": "痛经",

                "inputType": "pregnant_radio",
                "inputProps": { "placeholder": "请输入痛经" },


            }, {
                layout: '1/4',
                "key": "menstrualHistory.dysmenorrheaNote",
                "label": "痛经备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入痛经备注" },


            }]
        },
        {
            label: '婚育史',
            children: [{
                layout: '1/4',
                "key": "maritalHistory.graviditycount",
                "label": "孕数",

                "inputType": 'input_number',
                "inputProps": { "placeholder": "请输入孕数" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.parityycount",
                "label": "产数",

                "inputType": 'input_number',

                "inputProps": { "placeholder": "请输入产数" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.term",
                "label": "足月产",

                "inputType": 'input_number',

                "inputProps": { "placeholder": "请输入足月产" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.preterm",
                "label": "早产",

                "inputType": "input_number",
                "inputProps": { "placeholder": "请输入早产" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.vaginalDelivery",
                "label": "顺产",

                "inputType": "input_number",
                "inputProps": { "placeholder": "请输入顺产" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.cesareanSection",
                "label": "剖宫产",

                "inputType": "input_number",
                "inputProps": { "placeholder": "请输入剖宫产" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.abortion",
                "label": "流产",

                "inputType": "input_number",
                "inputProps": { "placeholder": "请输入流产" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.birthdefect",
                "label": "出生缺陷",

                "inputType": "input_number",
                "inputProps": { "placeholder": "请输入出生缺陷" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.child",
                "label": "孩子",

                "inputType": "input_number",
                "inputProps": { "placeholder": "请输入孩子" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.lastTerminationMode",
                "label": "末次妊娠终止方式",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入末次妊娠终止方式" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.lastTerminationDate",
                "label": "末次妊娠终止日期",

                "inputType": "single_date_picker",
                "inputProps": { "placeholder": "请输入末次妊娠终止日期" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.lastDeliveryMode",
                "label": "末次分娩方式",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入末次分娩方式" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.lastDeliveryDate",
                "label": "末次分娩时间",

                "inputType": "single_date_picker",
                "inputProps": { "placeholder": "请输入末次分娩时间" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.exceptionalcase",
                "label": "特殊情况",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入特殊情况" },
            }, {
                layout: '1/4',
                "key": "maritalHistory.note",
                "label": "备注",

                "inputType": "input",
                "inputProps": { "placeholder": "请输入备注" },
            }]
        },


        ...知情同意书_tab,
    ],
    {
        containerType: 'tabs'
    }
)