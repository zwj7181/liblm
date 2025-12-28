
import { use_provoke } from "@lm_fe/provoke";
import { get } from "@lm_fe/utils";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { get_line_color, get_text_color } from "src/curve/utils";
import { curve_api } from "../api";
export interface IProps { hidePrintBtn?: boolean, isAllPregnancies?: boolean, onLoad?(): void, headerInfo?: any, id?: any }
interface TPointData {
    x: any;
    y: any;
    line: any;
    fetus: any;
    style: CSSProperties;
}
export function use_fetus(props: IProps) {
    const { headerInfo, id, isAllPregnancies } = props;

    const pid: string = get(headerInfo, `id`) || id;

    const sys_theme = use_provoke(s => s.sys_theme)

    const line_color = get_line_color(sys_theme)
    const font_color = get_text_color(sys_theme)


    const [formData, set_formData] = useState<{ mlUltrasounds: any[] }>()
    const [isShowPointModal, set_isShowPointModal] = useState(false)
    const [pointData, set_pointData] = useState<TPointData>()


    const imageRef = useRef<any>();



    async function getFetusData() {

        const res = await curve_api.getOutpatientFetuGrowsOfOutpatient(pid);
        set_formData(res)
    };

    useEffect(() => {
        getFetusData()
        return () => { }
    }, [])
    return {
        sys_theme,
        line_color,
        font_color,
        formData,
        isShowPointModal,
        set_isShowPointModal,
        pointData,
        set_pointData,
        set_formData,
        imageRef,
        getFetusData
    }
}