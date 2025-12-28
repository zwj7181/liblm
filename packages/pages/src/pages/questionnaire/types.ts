import { IMchc_Questionnaire } from "@lm_fe/service"

export type TSelectCb = (qs: IMchc_Questionnaire) => void

export interface IQnBtnProps {
    onOk: (qs: IMchc_Questionnaire[]) => void
}

export interface IQnProps {

  onEditorUpload?: any;
  selected?: IMchc_Questionnaire[]
  onSelect?: TSelectCb
}