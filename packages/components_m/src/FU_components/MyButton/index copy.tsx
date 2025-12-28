import React from 'react';
import { Button, ButtonProps } from 'antd';
import { OkButton } from '../OkButton';
export default function MyButton(props: ButtonProps & { btn_text?: string }) {

  return (
    <OkButton {...props}  >
      {props.btn_text}
    </OkButton>
  );
}
