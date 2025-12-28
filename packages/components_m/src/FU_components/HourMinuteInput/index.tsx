import { safe_json_parse } from "@lm_fe/utils"
import { ArrayInput } from "../ArrayInput"
import { TCommonComponent } from "../types"
import React from "react"
interface IProps {

}
export const HourMinuteInput: TCommonComponent<IProps, any> = function HourMinuteInput(props) {
    const { isDisplay, ...others } = props
    if (isDisplay) {
        return <HourMinuteInput.DisplayFC {...props} />
    }
    return <ArrayInput options={[
        { inputType: 'MA', suffix: '时', props: { options: ['-'] } },
        { inputType: 'MA', suffix: '分', props: { options: ['-'] } },
    ]} {...others} />
}
HourMinuteInput.DisplayFC = (p) => {
    const { value } = p
    const arr = safe_json_parse<number[]>(value, [])
    const h = arr?.[0] ?? 0
    const m = arr?.[1] ?? 0
    return <span>
        {h}时{m}分
    </span>
}