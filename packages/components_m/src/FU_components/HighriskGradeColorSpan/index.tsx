import React from "react"
export function HighriskGradeColorSpan(props: { color?: string }) {


    return <span
        style={{
            background: props.color,
            display: 'inline-block',
            width: '12px',
            height: '12px',
            margin: '0 10px',
        }}
    ></span>
}

