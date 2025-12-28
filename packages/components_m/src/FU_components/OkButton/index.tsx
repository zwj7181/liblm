import { IMyButtonProps, MyButton } from '@lm_fe/components';
import { mchcEvent } from '@lm_fe/env';
import React from 'react';

export function OkButton(props: IMyButtonProps) {

  const { form, name } = props
  function on_click(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    mchcEvent.emit('my_form', {
      type: 'onClick',
      btnName: name!,
      values: form?.getFieldsValue(),
      setValue(k: string, v: any) { form?.setFieldsValue({ [k]: v }) }
    })

  }
  // const node = (visible) ? tip : (text ?? children)
  return (
    <MyButton onClick={on_click} {...props} />
  );
}
