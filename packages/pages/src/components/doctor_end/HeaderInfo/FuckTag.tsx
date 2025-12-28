import { identity, isNil, isString, text_ellipsis } from '@lm_fe/utils'
import { Tag } from 'antd'
import React from 'react'
interface IProps {
    str_data: string | null | undefined
}
export function FuckTags(props: IProps) {
    const { str_data } = props
    if (!str_data || !isString(str_data)) return null
    const arr = str_data.split(',')
    return (
        <span style={{ margin: '0 4px' }}>
            {arr.map((_) => (
                <FuckTagItem symbol={_} />
            ))}
        </span>
    )
}
function FuckTagItem(props: { symbol?: string }) {
    const { symbol } = props
    if (!symbol || !isString(symbol)) return null
    const arr = symbol.split(':').filter((_) => {
        return !isNil(_) && !['null', 'undefined'].includes(_.toLowerCase())
    })
    const len = arr.length
    if (len == 0) return null
    if (len == 1) return <Tag>{arr[0]}</Tag>
    const title = `${arr[0]}:${arr[1]}`
    return (
        <Tag color={arr[2] ?? 'default'} title={title}>
            {text_ellipsis(arr[1], 8)}
        </Tag>
    )
}
