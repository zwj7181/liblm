import { mchcEnv } from "@lm_fe/env";
import { useEffect } from "react";
// const useMyEffect = mchcEnv.isSp ? useEffect : MyKeepAlive.useKeepAliveEffect
const useMyEffect = useEffect

const useMyEffectSafe = (props: any) => {
    if (mchcEnv.is_single || props.is_modal) {
        return useEffect
    }
    return useEffect
    // return mchcEnv.isSp ? useEffect : MyKeepAlive.useKeepAliveEffect
}


export { useMyEffect, useMyEffectSafe };
