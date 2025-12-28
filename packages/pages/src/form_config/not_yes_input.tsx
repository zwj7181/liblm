import { IMchc_FormDescriptions_Field } from "@lm_fe/service";
const trueFalseOptions2 = [{ value: false, label: '否', }, { value: true, label: '是', warning: true }]
type F = IMchc_FormDescriptions_Field

export function not_yes_input(key: string, label: string, { inputProps: child1_inputProps, ...child1 }: F = {}, { inputProps: child2_inputProps, ...child2 }: F = {}, dep_value: any = true) {
    return {
        label,
        layout: '1/3',
        inputType: "straw",
        children: [
            {
                name: key,
                inputType: 'MC',
                inputProps: { marshal: 0, options: trueFalseOptions2, ...child1_inputProps },
                ...child1
            },
            {
                name: key + 'Note',
                inputType: "MI",
                inputProps: {
                    width: 120,
                    // status: 'error',
                    ...child2_inputProps
                },
                checkWarn(v, form) {
                    return v && 'error'
                },
                showDeps: { [key]: [dep_value] },
                ...child2

            }
        ]
    } as IMchc_FormDescriptions_Field
}