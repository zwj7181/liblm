
import { defineFormConfig, IMchc_FormDescriptions_Field } from "@lm_fe/service"
type T = IMchc_FormDescriptions_Field
export function pressure_fd(conf: T = {}, systolic_conf: T = {}, diastolic_conf: T = {}) {
    return defineFormConfig([
        {
            "label": "血压",
            "layout": "1/4",
            "inputType": "straw",
            'unit': 'mmHg',

            "children": [
                {
                    "name": 'systolic',
                    "inputType": "input_number",
                    checkWarn(v, f) {
                        return v < 90 || v > 130
                    },
                    "inputProps": {
                        width: 86,
                        "placeholder": "收缩压请填写"
                    },
                    ...systolic_conf
                }, {
                    "inputType": "input",
                    "processRemote": function (e) { return '/' },
                    "inputProps": {
                        "disabled": true,
                        "width": 12,
                        "style": {
                            paddingLeft: 2,
                            paddingRight: 2
                        }
                    }
                },
                {
                    "name": 'diastolic',
                    "inputType": "input_number",
                    checkWarn(v, f) {
                        return v < 60 || v > 90
                    },
                    "inputProps": {
                        width: 86,
                        "placeholder": "舒张压请填写"
                    },
                    ...diastolic_conf

                }
            ],
            ...conf,
        },
    ]).__lazy_config[0]
}