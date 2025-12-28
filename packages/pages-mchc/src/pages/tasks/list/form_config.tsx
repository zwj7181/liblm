import { APP_CONFIG, rt_ctx } from "@lm_fe/env";
import { peek_provoke } from "@lm_fe/provoke";
import { defineFormConfig } from "@lm_fe/service";
const ctx = rt_ctx
export default defineFormConfig([


    {
        title: '任务类型',
        dataIndex: 'contentType',
        inputType: 'MS',
        layout: '1/1',
        required: true,
        inputProps: {
            uniqueKey: 'Task.contentType'
        }
    },
    {
        title: '任务标题',
        dataIndex: 'title',
        layout: '1/1',
        required: true,
    },
    {
        title: '宣教内容',
        dataIndex: 'contentType',
        isActive: 0,
        render: (value, rowData) => {
            if (value === 1) {
                return ctx.utils.get(rowData, 'knowledge.title');
            }
            if (value === 2) {
                return ctx.utils.get(rowData, 'video.title');
            }
            if (value === 3) {
                return ctx.utils.get(rowData, 'url');
            }
            if (value === 4) {
                return ctx.utils.get(rowData, 'workQuestion.title');
            }
            return '';
        },
    },
    {
        title: '文章类型',
        dataIndex: 'knowledgeType',
        inputType: 'MS',
        layout: '1/1',
        inputProps: {
            uniqueKey: 'Knowledge.knowledgeType',
        },
        hidden: true,
        showDeps: {
            contentType: [1]
        }
    },
    {
        title: '选择文章',
        layout: '1/1',
        hidden: true,

        dataIndex: 'knowledge.id',
        inputType: 'MS',
        inputProps: {
            marshal: 0,
            fetch_options_on_open: true,
            fetch_options(f) {
                if (!f) return []
                const releaseType = f.getFieldValue('knowledgeType')
                return ctx.request
                    .get('/api/knowledges', { params: { sort: 'id,desc', page: 0, size: 9999, 'type.equals': releaseType } })
                    .then(r => {
                        const data = ctx.utils.expect_array(r.data)
                        return data.map((_: any) => ({ label: _.title, value: _.id }))
                    })
            }
        },
        showDeps: {
            contentType: [1]
        }
    },
    {
        title: '选择视频',
        layout: '1/1',
        hidden: true,

        dataIndex: 'video.id',
        inputType: 'MS',
        inputProps: {
            marshal: 0,
            fetch_options: {
                url: '/api/videos?page=0&size=99999&sort=id,desc',
                valueKey: 'id',
                labelKey: 'title'
            }
        },
        showDeps: {
            contentType: [2]
        }
    },
    {
        title: '外部链接',
        layout: '1/1',
        hidden: true,

        dataIndex: 'url',
        inputType: 'MA',
        showDeps: {
            contentType: [3]
        }
    },
    {
        title: '选择问卷',
        layout: '1/1',
        hidden: true,

        dataIndex: 'workQuestion.id',
        inputType: 'MS',
        inputProps: {
            marshal: 0,
            fetch_options: {
                url: '/api/work-questions?page=0&size=99999&sort=id,desc',
                valueKey: 'id',
                labelKey: 'title'
            }
        },
        showDeps: {
            contentType: [4]
        }
    },
    {
        title: '推送目标对象',
        layout: '1/1',
        dataIndex: 'pregnantLimits',
        width: APP_CONFIG.CELL_WIDTH_LARGE,
        inputType: 'MS',
        required: true,
        processLocal(v, form) {
            if (form)
                form.setFieldsValue({ pregnantLimitsNote: { gesweekLimits: null, ageLimits: null, outpatientNOs: [] } })
        },
        inputProps: {
            uniqueKey: 'Task.pushObject'
        }
    },
    {
        inputType: 'straw',
        title: '孕周范围',
        layout: '1/1',
        unit: '周',
        hidden: true,
        showDeps: {
            pregnantLimits: [3]
        },
        inputProps: { size: 'middle' },
        children: [
            {
                dataIndex: 'pregnantLimitsNote.gesweekLimits',
                inputType: 'MS',


                inputProps: {
                    uniqueKey: 'Task.appointRange',
                    width: 120
                },
            },

            {
                name: 'pregnantLimitsNote.gesweekGt',
                inputType: 'InputNumber',
                inputProps: { suffix: '周' },
                showDeps: {
                    'pregnantLimitsNote.gesweekLimits': [1],
                },
            },
            {
                showDeps: {
                    'pregnantLimitsNote.gesweekLimits': [1],
                },
                inputType: 'node',
                inputProps: { node: '~' }
            },
            {
                name: 'pregnantLimitsNote.gesweekLt',
                inputType: 'InputNumber',
                inputProps: { suffix: '周' },
                showDeps: {
                    'pregnantLimitsNote.gesweekLimits': [1],
                },

            },
            {
                name: 'pregnantLimitsNote.gesweek',
                inputType: 'InputNumber',
                showDeps: {
                    'pregnantLimitsNote.gesweekLimits': [2, 3, 4, 5]
                },
            },
        ]
    },

    {
        inputType: 'straw',
        inputProps: { size: 'middle' },

        title: '年龄范围',
        layout: '1/1',
        unit: '岁',
        hidden: true,
        showDeps: {
            pregnantLimits: [3]
        },
        children: [
            {
                dataIndex: 'pregnantLimitsNote.ageLimits',
                inputType: 'MS',


                inputProps: {
                    width: 120,
                    uniqueKey: 'Task.appointRange'
                },
            },
            {
                name: 'pregnantLimitsNote.ageGt',
                inputType: 'InputNumber',
                inputProps: { suffix: '岁' },
                showDeps: {
                    'pregnantLimitsNote.ageLimits': [1],
                },
            },
            {
                showDeps: {
                    'pregnantLimitsNote.ageLimits': [1],
                },
                inputType: 'node',
                inputProps: { node: '~' }
            },
            {
                name: 'pregnantLimitsNote.ageLt',
                inputType: 'InputNumber',
                inputProps: { suffix: '岁' },
                showDeps: {
                    'pregnantLimitsNote.ageLimits': [1],
                },

            },
            {
                name: 'pregnantLimitsNote.age',
                inputType: 'InputNumber',
                showDeps: {
                    'pregnantLimitsNote.ageLimits': [2, 3, 4, 5]
                },
            },





        ]
    },

    {
        title: '高危等级',
        name: 'pregnantLimitsNote.highriskGrade',
        inputType: 'MS',
        hidden: true,
        layout: '1/1',
        inputProps: {
            type: 'tags',
            marshal: 3,
            options: peek_provoke(s => s.可选高危等级?.map(_ => ({ label: _.colorText, value: _.levelText })))
        },
        showDeps: {
            pregnantLimits: [3]
        },
    },
    {
        title: '传染病',
        name: 'pregnantLimitsNote.diseases',
        inputType: 'MS',
        layout: '1/1',
        hidden: true,

        inputProps: {
            type: 'tags',
            marshal: 3,
            options: peek_provoke(s => s.可选传染病?.options)

        },
        showDeps: {
            pregnantLimits: [3]
        },
    },
    {
        title: '用户标签',
        name: 'pregnantLimitsNote.tag',
        inputType: 'MS',
        layout: '1/1',
        hidden: true,

        inputProps: {
            uniqueKey: 'Task.tag'

        },
        showDeps: {
            pregnantLimits: [3]
        },
    },


    {
        title: '就诊卡号',
        dataIndex: 'pregnantLimitsNote.outpatientNOs',
        inputType: 'ArraySingle',
        hidden: true,
        showDeps: {
            pregnantLimits: [4]
        },
        inputProps: {
            marshal: 2,
            inputType: 'PatientSelect'
        },
        layout: '1/1',
    },





    {
        title: '推送详情',
        dataIndex: 'pregnantLimitsNote',
        isActive: 0,
        hidden: true,
    },
    {
        title: '推送频率',
        dataIndex: 'pushFrequency',
        required: true,
        width: APP_CONFIG.CELL_WIDTH_MIDDLE,
        inputType: 'MS',
        layout: '1/1',
        inputProps: {
            fetch_options_on_open: true,
            uniqueKey: 'Task.pushFrequency'
        }
    },
    {
        title: '推送时间',
        dataIndex: 'pushTime',
        layout: '1/1',
        inputType: 'straw',
        inputProps: { size: 'middle' },

        hidden: true,
        children: [
            {
                name: 'pushTime.timeType',
                inputType: 'MS',
                inputProps: {
                    uniqueKey: 'Task.pushDateType',
                    width: 150
                }
            },
            {
                name: 'pushTime.timeNode',
                inputType: 'MS',
                showDeps: {
                    'pushTime.timeType': [1, 2, 3, 4, 5, 11]
                },
                inputProps: {
                    uniqueKey: 'Task.pushTimeType',
                    width: 80

                }
            },
            {
                name: 'pushTime.gesweek',
                showDeps: {
                    'pushTime.timeType': [11]
                },
                inputType: 'InputNumber',
                inputProps: {
                    suffix: '周',
                }
            },
            {
                name: 'pushTime.day',
                showDeps: {
                    'pushTime.timeType': [1, 2, 3, 4, 5, 11]

                },
                inputType: 'InputNumber',
                inputProps: {
                    suffix: '天',
                }
            },
            {
                name: 'pushTime.date',
                showDeps: {
                    'pushTime.timeType': [12]
                },
                inputType: 'DatePicker',
                inputProps: {
                    format: 'YYYY-MM-DD'
                }
            },
            {
                name: 'pushTime.time',
                showDeps: {
                    'pushTime.timeType': (v) => {
                        return v > 0
                    }

                },
                inputType: 'DatePicker',
                inputProps: {
                    time_only: true,
                    format: 'HH:mm:ss'
                }
            },
        ],

    },

    {
        title: '创建人',
        dataIndex: 'createUser.firstName',
        width: APP_CONFIG.CELL_WIDTH_MIDDLE,
        isActive: 0
    },
    {
        title: '创建时间',
        dataIndex: 'createDate',
        width: APP_CONFIG.CELL_WIDTH_LARGE,
        isActive: 0

    },
    {
        title: '发布状态',
        dataIndex: 'releaseStatus',
        width: APP_CONFIG.CELL_WIDTH_LARGE,
        inputType: 'MS',
        inputProps: {
            marshal: 0,
            options: '开启,关闭'
        },
        layout: '1/1',

    },
    {
        title: '发布者',
        dataIndex: 'releaseUser.firstName',
        width: APP_CONFIG.CELL_WIDTH_LARGE,
        isActive: 0

    },
    {
        title: '运行状态',
        dataIndex: 'runStatus',
        width: APP_CONFIG.CELL_WIDTH_LARGE,
        inputType: 'MS',
        layout: '1/1',
        inputProps: {
            uniqueKey: 'Task.runStatus'
        }
    },
    {
        title: '运行情况',
        dataIndex: 'runStatusNote',
        width: APP_CONFIG.CELL_WIDTH_LARGE,
        isActive: 0

    },
])