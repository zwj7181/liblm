
export const MODAL_TEMPLATE_TYPES_科室模板 = 1
export const MODAL_TEMPLATE_TYPES_个人模板 = 2
export interface ITemplateConfig { type: number, title: string, depid?: number }
export const MODAL_TEMPLATE_TYPES = {
    产前产后: [
        { type: 34, title: '产前' },
        { type: 35, title: '产后' },
        { type: 36, title: '婴儿' },
        { type: 37, title: '产房' },
    ] as ITemplateConfig[],
    科室个人: [
        { type: MODAL_TEMPLATE_TYPES_科室模板, title: '科室' },
        { type: MODAL_TEMPLATE_TYPES_个人模板, title: '个人' },
    ] as ITemplateConfig[],
}