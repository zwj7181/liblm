export * from './modal_template_types'
export * from './APP_CONFIG'
export type TLevelType = 'Ⅰ' | 'Ⅱ' | 'Ⅲ' | 'Ⅳ' | 'Ⅴ'
interface IOption { color_text: string, level_text: TLevelType }
const GZlevelOptions: IOption[] = [
    { color_text: '绿色', level_text: 'Ⅰ' },
    { color_text: '黄色', level_text: 'Ⅱ' },
    { color_text: '橙色', level_text: 'Ⅲ' },
    { color_text: '粉色', level_text: 'Ⅳ' },
    { color_text: '红色', level_text: 'Ⅴ' },
];
// 全国高危
const nationLevelOptions: IOption[] = [
    { color_text: '绿色', level_text: 'Ⅰ' },
    { color_text: '黄色', level_text: 'Ⅱ' },
    { color_text: '橙色', level_text: 'Ⅲ' },
    { color_text: '红色', level_text: 'Ⅳ' },
];

const levelOptionsobj = {
    21: GZlevelOptions,
    22: GZlevelOptions,
    23: nationLevelOptions,
};
export const mchcConstant = {
    levelOptionsobj,
    get_level_color_text(vertion: number, level_text: TLevelType) {
        const options = levelOptionsobj[vertion as keyof typeof levelOptionsobj]

        if (!options) return '未知' + vertion
        return options.find(_ => _.level_text === level_text)?.color_text ?? level_text
    }
}