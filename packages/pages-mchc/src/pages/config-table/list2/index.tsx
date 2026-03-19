import React from "react"
// import { message } from "antd"
import { BF_Wrap2, MyBaseList } from "@lm_fe/pages"
import { get_global_happy_arg } from "@lm_fe/utils"
import { ICommonProps } from "../utils"
import { defineFormConfig } from "@lm_fe/service"
function MyConfigTable2(props: ICommonProps) {

    const title: any = decodeURI(get_global_happy_arg('usr1') ?? props.configId)
    if (!title) return <div>请配置title</div>

    return <MyBaseList

        {...props}
        size="small"
        // name="/syphilis-quality-control"
        modalFormConfig={{
            width: '80vw',
            modal_data: {
                targetLabelCol: 4
            }
        }}
        bf_preset={
            {
                title: `动态表格-${title}`, name: '/api/users',
                showAction: 1,
                initialSearchValue: { nationality: '中' },
                searchParams: { args: 'abcd' },
                searchConfig: defineFormConfig([
                    { label: '国籍', name: 'nationality', inputType: 'Input' },
                    {
                        "inputType": "straw",
                        "title": "年龄范围",
                        "children": [
                            {
                                "dataIndex": "ageLimit.type",
                                "inputType": "MS",
                                "inputProps": {
                                    "width": 100,
                                    "uniqueKey": "Task.appointRange"
                                }
                            },
                            {
                                "name": "ageLimit.gt",
                                "inputType": "InputNumber",
                                "inputProps": {
                                    "width": 90,
                                    "suffix": "岁"
                                },
                                "showDeps": {
                                    "ageLimit.type": [
                                        1
                                    ]
                                }
                            },
                            {
                                "showDeps": {
                                    "ageLimit.type": [
                                        1
                                    ]
                                },
                                "inputType": "node",
                                "inputProps": {
                                    "node": "~"
                                }
                            },
                            {
                                "name": "ageLimit.lt",
                                "inputType": "InputNumber",
                                "inputProps": {
                                    "width": 90,

                                    "suffix": "岁"
                                },
                                "showDeps": {
                                    "ageLimit.type": [
                                        1
                                    ]
                                }
                            },
                            {
                                "name": "ageLimit.value",
                                "inputType": "InputNumber",
                                inputProps: {
                                    "width": 90,

                                },
                                "showDeps": {
                                    "ageLimit.type": [
                                        2,
                                        3,
                                        4,
                                        5
                                    ]
                                }
                            }
                        ]
                    },
                ]),
                tableColumns: () => import('./form_config')
            }
        }
    />

}
export default MyConfigTable2