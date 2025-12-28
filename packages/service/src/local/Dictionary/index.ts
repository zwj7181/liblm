import { mchcUtils } from "@lm_fe/env"
import { IMchc_Dictionaries, IMchc_Dictionaries_Enumeration } from "../../mchc"





export type ILocal_Dic = {
  [x: string]: IMchc_Dictionaries,
} & { initDictionaries: IMchc_Dictionaries[] }



export const SLocal_Dictionary = {


  /**
   *
   * @param value 枚举值value
   * @param type string 字典类型
   */
  getDictionariesEnumerations(type: string) {
    return mchcUtils.getDictionariesEnumerations(type) as IMchc_Dictionaries_Enumeration[]
  },

  /**
   *
   * @param value 枚举值value
   * @param type string 字典类型
   */
  getDictionaryLabel(type: string, value: string | number,) {
    const enumerations = this.getDictionariesEnumerations(type)

    const item = enumerations.find((_) => _.value === +value);
    if (!item) {
      return null;
    }
    return item.label;
  },
  /**
   *
   * @param label 枚举值value
   * @param type string 字典类型
   */
  getDictionaryValue(type: string, label: string,) {
    const enumerations = this.getDictionariesEnumerations(type)

    const item = enumerations.find((_) => _.label === label);
    if (!item) {
      return null;
    }
    return item.value;
  },

}