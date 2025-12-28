import { pressure_fd } from "@lm_fe/pages";
import { IMchc_FormDescriptions_Field_Nullable } from "@lm_fe/service";
export const 体征检查_config = () => {
    const config: IMchc_FormDescriptions_Field_Nullable = {
        "name": "体征检查",
        "children": [
            // {
            //     "key": "physicalExam.MyPressure1__",
            //     "label": "血压-首测(mmHg)",
            //     "inputType": "MyPressure",
            //     "inputProps": { "style": { "width": 156 }, marshal: 0 },
            //     layout: '1/3',
            // }, {
            //     "key": "physicalExam.MyPressure2__",
            //     "label": "血压-二测(mmHg)",
            //     "inputType": "MyPressure",
            //     "inputProps": { "style": { "width": 156 }, marshal: 0 },
            //     layout: '1/3',
            // }, {
            //     "key": "physicalExam.MyPressure3__",
            //     "label": "血压-三测(mmHg)",
            //     "inputType": "MyPressure",
            //     "inputProps": { "style": { "width": 156 }, marshal: 0 },
            //     layout: '1/3',
            // },
            pressure_fd(
                { label: '血压首测', isNewRow: true, layout: '1/3', },
                { name: 'physicalExam.systolic', },
                { name: 'physicalExam.diastolic', }
            ),
            pressure_fd(
                { label: '血压二测', layout: '1/3', },
                { name: 'physicalExam.systolic2', },
                { name: 'physicalExam.diastolic2', }
            ),
            pressure_fd(
                { label: '血压三测', layout: '1/3', },
                { name: 'physicalExam.systolic3', },
                { name: 'physicalExam.diastolic3', }
            ),


            {
                "key": "physicalExam.height",
                "label": "身高(cm)",
                "inputType": "input_number",
                "inputProps": { "placeholder": "请输入身高", "style": { "width": 156 } },
                layout: '1/3',
            }, {
                "key": "physicalExam.weight",
                "label": "体重(kg)",
                "inputType": "input_number",
                "inputProps": { "placeholder": "请输入体重", "style": { "width": 156 } },
                layout: '1/3',
            }, {
                "key": "physicalExam.pulse",
                "label": "脉搏(bpm)",
                "inputType": "input_number",
                "inputProps": { "placeholder": "请输入脉搏", "style": { "width": 156 } },
                layout: '1/3',
            }]
    }
    return config
}
