import { defineFormConfig } from "@lm_fe/service";

export default defineFormConfig(
    [

        // { title: '组套号', dataIndex: 'suitNO' },
        { title: '组套名', dataIndex: 'suitName' },
        // { title: 'visitNo', dataIndex: 'visitNo' },
        // { title: '样本号', dataIndex: 'sampleNO' },
        { title: '检验日期', dataIndex: 'examinationDate' },
        { title: '审核状态', dataIndex: 'state', inputType: 'MS', inputProps: { options: '未审核,已审核' } },
        { title: '审核人', dataIndex: 'reviewer', },
        // { title: 'recycleer', dataIndex: 'recycleer', },
        // { title: 'recycleerNO', dataIndex: 'recycleerNO', },
        // { title: '结果', dataIndex: 'reportResults', inputType: 'MyEditTable' },
        // { title: '备注', dataIndex: 'remark', },
    ]
)