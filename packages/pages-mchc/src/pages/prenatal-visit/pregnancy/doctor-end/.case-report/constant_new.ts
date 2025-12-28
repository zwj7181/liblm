

export enum ReportCardEnum {
  hepatitispregnantbaby = 'IC_HBV_REGISTER',
  hepatitisbabyfollowup = 'IC_HBV_FOLLOW',
  syphilispregnantcard = 'IC_SYPHILIS_PATIENT',
  syphilisbabycard = 'IC_SYPHILIS_CHILD',
  aidspregnantcard = 'IC_HIV_PATIENT',
  aidspregnantbabycard = 'IC_HIV_CHILD',
  birthdefect = 'AD_IC_BIRTH_DEFECT',
  pregnantdeath = 'AD_IC_MATERNAL_DEATH',
  childrendeath = 'AD_IC_CHILD_DEATH',
}

export type ITpl = typeof ReporCardList[number]
export interface IIC {
  "id": 5,
  "code": "IC_SYPHILIS_PATIENT",
  "name": "梅毒感染孕产妇基本情况",
  "state": 2,
  "filler": "超级管理员",
  "fillerTitle": null,
  "filledDate": "2025-09-12",
  "admissionId": null,
  "neonateOrder": 1
}

// 门诊：乙肝1一张 梅毒1一张 艾滋1一张
// 住院：乙肝1多张 梅毒1一张 梅毒2多张 艾滋1一张 艾滋2多张

// 门诊
export const ReporCardList = [
  {
    name: '乙肝感染孕产妇及所生新生儿个案登记卡（保密）',
    code: ReportCardEnum.hepatitispregnantbaby,
    conf: () => import('./form_config/乙肝感染孕产妇及所生新生儿个案登记卡'),
    way: 1,
    state: 1,
    neonateOrder: 1,
  },
  {
    name: '梅毒感染孕产妇基本情况',
    code: ReportCardEnum.syphilispregnantcard,
    conf: () => import('./form_config/梅毒感染孕产妇基本情况'),

    way: 1,
    state: 1,
    neonateOrder: 1,
  },
  {
    name: '艾滋病感染妇女基本情况',
    code: ReportCardEnum.aidspregnantcard,
    conf: () => import('./form_config/艾滋病感染妇女基本情况'),

    way: 1,
    state: 1,
    neonateOrder: 1,
  },
];



export const stateCheck = {
  '1': '未提交 ',
  '2': '已提交',
  '3': '驳回',
  '4': '已审核',
  '5': '已上报',
};

export const stateIcon = {
  '1': 'icon-unsettled',
  '2': 'icon-pending',
  '3': 'icon-reject',
  '4': 'icon-finish',
  '5': 'icon-upload',
};
