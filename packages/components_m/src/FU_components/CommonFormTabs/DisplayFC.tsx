import { IFormTabsProps } from "./types"
import React from 'react'
export function DisplayFC<T = any>(props: IFormTabsProps<T>) {
    const { value, DisplayFC_render } = props

    const node = DisplayFC_render?.(value) ?? `${value?.length ?? 0}项`

    return <div style={{}}  >
        {
            node
        }
    </div>
}