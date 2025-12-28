import React from 'react';

import { PdfFrameView } from '@lm_fe/components';
import { mchcEnv, mchcLogger } from '@lm_fe/env';
const options = {

  cMapPacked: true,
  cMapUrl: `${mchcEnv.gs(_ => _.lm_pdfjs['3.11.174'].web)}cmaps/`,
};

interface IProps {
  file?: string;
  data?: string
}

export default function PDFPreview_View(props: IProps) {
  const { file, data } = props
  return (file || data) ? <PdfFrameView filepath={file} printData={data} PDFAppConfig={{ hidenToolbar: true }} /> : <span>加载中......</span>
}