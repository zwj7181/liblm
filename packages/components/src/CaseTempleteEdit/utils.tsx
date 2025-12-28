import { ds, mchcMacro } from "@lm_fe/env"
import { peek_provoke } from "@lm_fe/provoke"
import { sleep } from "@lm_fe/utils"
import { load_xemr } from "src/CaseTempleteEditEmr/utils"
let loaded = false

export async function load_sde() {
    if (!loaded) {
        const pp = mchcMacro.PUBLIC_PATH
        await ds([
            `${pp}lib/sde.config.js`,
            `${pp}lib/ueditor/ueditor.all.min.js`,
            `${pp}lib/ueditor/lang/zh-cn/zh-cn.js`,
            `${pp}lib/ueditor/themes/default/css/ueditor.css`,
            `${pp}lib/sde/sde-ie8-design.js`,
        ])
        loaded = true
        await sleep(1000)
    }
}

export function preload_tpl_editor() {
    const config = peek_provoke('config')
    if (config.模板编辑器 === 'XEMR') {
        load_xemr()
    } else {
        load_sde()
    }

}