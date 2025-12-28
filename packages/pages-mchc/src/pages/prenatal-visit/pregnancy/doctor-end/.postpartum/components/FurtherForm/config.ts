import { IMchc_Doctor_Diagnoses } from '@lm_fe/service';
interface IPreDiagKeyword { diagKeyword: string[], }
/*关联表单关键词*/

export const checkAssociatedForm = (list: IMchc_Doctor_Diagnoses<"mchc">[] = [], searchObj?: IPreDiagKeyword) => {
  if (!searchObj?.diagKeyword) return false
  let diagItem = list
    ?.filter(l => l.diagnosis)
    ?.map(l => l.diagnosis) ?? [];

  // let searchObj = diag_search_param[type];

  const is_coronary = searchObj.diagKeyword.includes('心脏')
  const refreshFrom = () => {
    let is_hidden = true;

    for (let user_diag of diagItem) {
      for (let pre_diag of searchObj['diagKeyword']) {


        if (user_diag.includes(pre_diag)) {

          if (!is_coronary) {
            return false
          }
          if (is_coronary && user_diag.includes('胎')) {

            return false
          }
        }
      }

    }




    return is_hidden;
  };

  return refreshFrom();
};




