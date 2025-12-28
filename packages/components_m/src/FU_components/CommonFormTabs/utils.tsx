import { Form } from "antd";
import { isEmpty } from "lodash";
import { useRef } from "react";

export function useFormTabs(n = 10) {
    const forms = useRef(Array(n).fill(0).map(_ => Form.useForm()[0]))
    function getFormsData() {
        return forms.current.map(form => form.getFieldsValue()).filter(_ => !isEmpty(_))
    }
    return { forms: forms.current, getFormsData }
}
