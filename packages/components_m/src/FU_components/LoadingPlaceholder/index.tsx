import { Spin } from "antd";
import React from "react";


export function LoadingPlaceholder(props: { height?: number | string, tip?: React.ReactNode }) {
    const { height = 120, tip } = props
    return <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin tip={tip} />
    </div>
}