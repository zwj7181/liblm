import { MyIcon } from '@lm_fe/components';
import { mchcDriver } from '@lm_fe/env';
import { ButtonProps, Divider, Space } from 'antd';
import React from 'react';
import { OkButton } from '../OkButton';

export interface IIdNOButtonButtonProps extends Omit<ButtonProps, 'form'> {
  isShowQrCode?: false
}

export function IdNOButton(props: IIdNOButtonButtonProps) {


  function send_msg(type: string) {
    const command = {
      name: type,
      data: {},
    };
    return mchcDriver.send(command)
  }

  return (
    <Space.Compact>
      <OkButton primary btn_text='读取身份证' {...props} icon={<MyIcon value='IdcardOutlined' />} onClick={() => send_msg('ReadCard')} />
      <Divider type='vertical' />
      <OkButton primary btn_text='读取二维码' {...props} icon={<MyIcon value='QrcodeOutlined' />} onClick={() => send_msg('QRScan')} />
    </Space.Compact>
  );
}
