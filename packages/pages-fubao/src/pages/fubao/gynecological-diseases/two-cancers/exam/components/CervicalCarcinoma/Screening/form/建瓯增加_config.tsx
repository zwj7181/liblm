// import { mchcEnv } from "@lm_fe/env";
// import { IMchc_FormDescriptions_Field } from "@lm_fe/service";


// export function 建瓯增加_config(): IMchc_FormDescriptions_Field[] {
//     return [
//         {
//             "name": "HPV检测",
//             "fields": [
//                 {
//                     "key": "cervicalCancerInspection.testResult",
//                     "label": "HPV检测",
//                     required: true,
//                     "inputType": "MC",
//                     "inputProps": { options: '阴性,阳性', marshal: 0 },
//                     layout: "1/3",
//                 },
//                 {
//                     "key": "cervicalCancerInspection.undeterminedType",
//                     required: true,
//                     "label": "未分型",
//                     "inputType": "MyInput",
//                     inputProps: {
//                         dependency: {
//                             show: {
//                                 key: 'cervicalCancerInspection.testResult',
//                                 value: [2]
//                             }
//                         }
//                     },
//                     layout: "1/3",
//                 },
//                 {
//                     "key": "cervicalCancerInspection.positiveTypeNote",
//                     "label": "选项",
//                     required: true,
//                     "inputType": "MC",
//                     "inputProps": {
//                         options: 'HPV亚型(16),HPV亚型(18),HPV亚型(31),HPV亚型(33),HPV亚型(35),HPV亚型(39),HPV亚型(45),HPV亚型(51),HPV亚型(52),HPV亚型(56),HPV亚型(58),HPV亚型(59),HPV亚型(66),HPV亚型(68),其他i',
//                         type: 'multiple',
//                         dependency: {
//                             show: {
//                                 key: 'cervicalCancerInspection.testResult',
//                                 value: [2]
//                             }
//                         }
//                     },
//                     layout: "1/1",
//                 },

//                 {
//                     "key": "cervicalCancerInspection.furtherCheckNote",
//                     required: true,
//                     "label": "需进一步检查",
//                     "inputType": "MC",
//                     "inputProps": {
//                         options: '是,否',
//                         sp: [{
//                             label: '是', inputType: 'MC', parentheses: true, props: { options: '宫颈细胞学检查,阴道镜检查', type: 'multiple' }
//                         }]
//                     },
//                     layout: "1/1",
//                 },
//             ]
//         },
//         {
//             "name": "宫颈细胞学检查",
//             "fields": [
//                 {
//                     "key": "cervicalCancerInspection.cellCollectionMethodNote",
//                     "label": "取材方式",
//                     required: true,
//                     inputType: 'MC',
//                     inputProps: { options: '巴氏涂片,液基/薄层细胞学检查,其他i', },
//                     layout: '1/1',
//                 },
//                 {
//                     "key": "cervicalCancerInspection.tbsResult",
//                     "label": "TBS分类报告结果",
//                     required: true,
//                     inputType: 'MC',
//                     inputProps: {
//                         options: `未见上皮内病变细胞和恶性细胞,未明确意义的不典型鳞状上皮细胞(ASC-US),不典型鳞状上皮细胞-不除外高度鳞状上皮内病变(ASC-H),低度鳞状上皮内病变(LSIL),高度鳞状上皮内病变(HSIL),鳞状细胞癌(SCC),不典型腺上皮细胞(AGC),不典型宫颈管腺细胞倾向瘤变,宫颈管原位腺癌,腺癌`,
//                         marshal: 0,
//                         // type: 'multiple'
//                     },
//                     layout: '1/1',
//                 },
//                 {
//                     "key": "cervicalCancerInspection.vaginoscopyCheck",
//                     required: true,
//                     "label": "需阴道镜检查",
//                     inputType: 'MC',
//                     inputProps: { options: '是,否', marshal: 0 },
//                     layout: '1/1',
//                 },
//             ]
//         },
//         {
//             "name": "阴道镜检查",
//             "fields": [
//                 {
//                     "key": "cervicalCancerInspection.preDiagnosisNote",
//                     "label": "初步诊断",
//                     inputType: 'MC',
//                     inputProps: {
//                         options: '未见异常,异常,其他i',
//                         inputWidth: 120,
//                         marshal: 1,
//                         sp: [
//                             { label: '异常', inputType: 'MC', props: { options: '低度病变,高度病变,可疑癌' } }
//                         ]
//                     },
//                     layout: '1/1',
//                 },
//                 {
//                     "key": "cervicalCancerInspection.colposcopyAdequacy",
//                     "label": "阴道镜检查充分性",
//                     inputType: 'MC',
//                     inputProps: { options: '充分,不充分', marshal: 0 },
//                     layout: '1/2',
//                 },
//                 {
//                     "key": "cervicalCancerInspection.transitionZoneVisibility",
//                     "label": "转化区可见性",
//                     inputType: 'MC',
//                     inputProps: { options: '完全可见,部分可见,完全不可见', marshal: 0 },
//                     layout: '1/2',
//                 },

//                 {
//                     "key": "cervicalCancerInspection.needTissueCheck",
//                     required: true,
//                     "label": "需组织病理检查",
//                     inputType: 'MC',
//                     inputProps: { options: '是,否', marshal: 0 },
//                     layout: '1/3',
//                 },
//             ]
//         },
//         {
//             "name": "组织病理检查",
//             "fields": [
//                 {
//                     "key": "cervicalCancerInspection.organPathologyCheck",
//                     "label": "检查结果",
//                     required: true,
//                     inputType: 'MC',
//                     inputProps: { options: '未见异常,异常', marshal: 0 },
//                     layout: '1/1',
//                 },
//                 {
//                     "key": "cervicalCancerInspection.errorTypeNote",
//                     "label": "异常类型",
//                     required: true,
//                     inputType: 'MC',
//                     inputProps: {
//                         options: `炎症,低级别鳞状上皮内病变(LSIL),高级别鳞状上皮内病变(HSIL),宫颈原位腺癌(AIS),宫颈微小浸润癌(鳞癌/腺癌),宫颈浸润癌(鳞癌/腺癌),其他i`,
//                         type: 'multiple',
//                     },
//                     showDeps: {
//                         'cervicalCancerInspection.organPathologyCheck': [2]
//                     },
//                     layout: '1/1',
//                 },
//             ]
//         },

//     ]
// }