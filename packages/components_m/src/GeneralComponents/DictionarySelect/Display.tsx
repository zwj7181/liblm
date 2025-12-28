import { mchcUtils } from '@lm_fe/env';
import React from 'react';
interface IProps {
  mode?: 'single' | 'multiple';
  type?: 'radio' | 'checkbox' | 'select';
  uniqueKey?: any;
  boxSpan?: number;
  dictionaries?: any;
  onChange?: any;
  value?: any;
  disabled?: boolean
}
const SelectDisplay = (props: IProps) => {

  const { uniqueKey, value } = props;
  const label = mchcUtils.getDictionaryLabel(uniqueKey, value)
  return <>{label}</>;
};
export const GeneralComponents_DictionarySelect_Display = SelectDisplay;
