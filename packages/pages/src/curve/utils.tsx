import { peek_provoke, THEME } from "@lm_fe/provoke";
import { IMchc_Doctor_OutpatientHeaderInfo } from "@lm_fe/service";
const lineColor = '#B1E3E6';
const fontColor = '#131415';

export function get_fetus_color(t: THEME, child_idx: number) {
    const others = ['#0ba56d', '#8878E0', '#D9D9F3', '#D9D9F3', '#6BB6FF'];

    const colors = t.darkTheme ? ['#ddd', ...others] : ['#222', ...others]
    return colors[child_idx]
}
export function get_abnormal_color(t: THEME) {
    return t.darkTheme ? '#FF0909' : '#FF0909'
}
export function get_line_color(t: THEME) {
    return t.colors?.light[1] || lineColor
}
export function get_text_color(t: THEME) {
    return t.darkTheme ? '#fff' : '#000'
}
export function get_canvas_el(id: string, t: THEME) {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    canvas.style.background = t.bg_color
    return canvas
}

export function draw_info(h: IMchc_Doctor_OutpatientHeaderInfo,) {
    return `${draw_info_item(h, '姓名', 'name', 0)}${draw_info_item(h, '就诊卡号', 'outpatientNO')}${draw_info_item(h, '年龄', 'age')}`
}
function draw_info_item(h: IMchc_Doctor_OutpatientHeaderInfo, l: string, k: string, n = 16) {
    const info: string = h?.[k] || '-'

    return `${' '.repeat(info.length > n / 4 ? n / 2 : n)}${l}:${info} `
}
