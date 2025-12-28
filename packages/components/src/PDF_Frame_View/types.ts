import { Request } from '@lm_fe/utils';
import { AxiosRequestConfig } from 'axios';
import { lm_pdfjs_info } from '@lm_fe/static'
export interface IPdfFrameView_Res_Data {
    pdfdata?: string
    filepath?: string
    imagesData?: string[]
}
export type PdfFrameView_Version = keyof typeof lm_pdfjs_info.dirs

export interface IPdfFrameView_Props {
    PDFAppConfig?: {
        hidenToolbar?: boolean
    },
    request?: Request
    requestData?: {
        url: string
        resource?: string
        template?: string
        version?: string
        note?: string
        id?: number | string
        method?: 'GET' | 'POST'
        subid?: number
        vmName?: string
        [x: string]: any
    }
    requestConfig?: AxiosRequestConfig
    printData?: string
    version?: PdfFrameView_Version
    filepath?: string
    callback?(data?: string): void
}
