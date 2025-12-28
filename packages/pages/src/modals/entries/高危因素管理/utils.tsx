import { IMchc_TemplateTree_Item } from '@lm_fe/service'
import { isEmpty } from '@lm_fe/utils'
import { DataNode } from 'antd/lib/tree'
import React from 'react'
export function transfer_to_treeNode(data: IMchc_TemplateTree_Item[], pid = 0) {
    const treeData: DataNode[] = []
    data.map((item) => {
        if (item.pid === pid) {
            const _item: DataNode = { ...item, key: String(item.id) }

            _item.title = item.val
            _item.children = transfer_to_treeNode(data, item.id)
            if (isEmpty(_item.children)) {
                _item.isLeaf = true
            } else {
                _item.isLeaf = false
            }
            treeData.push(_item)
        }
    })
    return treeData
}
export function ColorSpan(props: { bg_color: any; styles?: React.CSSProperties }) {
    const { bg_color, styles = {} } = props
    return (
        <span
            style={{
                background: bg_color ? bg_color : '',
                display: 'inline-block',
                width: '12px',
                height: '12px',
                margin: '0 10px',
                ...styles,
            }}
        ></span>
    )
}
