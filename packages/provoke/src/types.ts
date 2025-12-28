import { ISystemConfig } from "@lm_fe/env";
import { SystemState } from "./slices/system";
import { UserInfoState } from "./slices/user";


export type MixState = SystemState & UserInfoState;
export type LIGHT_COLOR = [string, string, string, string, string]
export type DARK_COLOR = [string, string, string, string]

export type THEME = Required<ISystemConfig>['styles'] & {
    collapsed?: boolean,
    bg_color: string,
    theme_bg_color: string,
    colors?: {
        light: LIGHT_COLOR
        primary: string,
        dark: DARK_COLOR
    }
}