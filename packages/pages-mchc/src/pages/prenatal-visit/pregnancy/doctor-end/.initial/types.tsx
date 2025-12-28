import { FormInstance } from "antd";

export interface IInitial_Tab_props { form: FormInstance, active: boolean, set_disabled_save?(v: boolean): void, disabled_save?: boolean }