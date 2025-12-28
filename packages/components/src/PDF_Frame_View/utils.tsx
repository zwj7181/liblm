import { lm_pdfjs_info } from '@lm_fe/static';
import { IPdfFrameView_Res_Data } from './types';
import { SLocal_SystemConfig } from '@lm_fe/service';
import { mchcLogger } from '@lm_fe/env';



function convertDataURIToBinary(dataURI: string) {
    var raw = window.atob(dataURI);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}


const metaHead = 'data:application/pdf;base64,'
export function handlePrintData(printData: string) {
    const noHeadData = printData.startsWith(metaHead) ? printData.slice(metaHead.length) : printData
    return convertDataURIToBinary(noHeadData)
}

export function handleRes(res: any) {
    let resData: IPdfFrameView_Res_Data
    if (!res)
        return {}
    if (typeof res.code === 'number') {
        resData = res.data
    } else {
        resData = res
    }
    if (!resData) return {}
    const { pdfdata, filepath, imagesData } = resData

    resData.filepath = filepath && `${location.origin}${filepath}`
    resData.pdfdata = pdfdata && handlePrintData(pdfdata) as any
    resData.imagesData = (imagesData ?? [])
    // .map(_ => `data:image/png;base64,${_}`)

    return {
        pdf: resData.filepath ?? resData.pdfdata,
        images: resData.imagesData
    }
}


export function get_PdfFrameView_version() {

    return SLocal_SystemConfig.get('PDF预览组件版本') || lm_pdfjs_info.dirs['3.11.174']


}