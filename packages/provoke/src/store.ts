import { createStore, useStore } from 'zustand';
import { createTabsSlice } from './slices/system';
import { createUserInfoSlice } from './slices/user';
import { MixState } from './types';
import { devtools, persist } from 'zustand/middleware';
import { get, isFunction, isString, pick } from '@lm_fe/utils';
import { useShallow } from 'zustand/react/shallow'

export const mchc_provoke = createStore<MixState>()(
    persist(
        (...a) => ({
            ...createUserInfoSlice(...a),
            ...createTabsSlice(...a),
        }),
        {
            name: 'userInfo4',
            merge(persistedState, currentState) {
                const pState = persistedState as Partial<MixState>;
                pState.panes = pState.panes?.map(p => {
                    return {
                        ...p, element: null
                    }
                })
                return {
                    ...currentState,
                    ...pState,
                };
            },
            partialize: ({ panes, activeKey, config, sys_layout }) => ({
                config,
                sys_layout,
                activeKey: location.pathname,
                panes: panes.map(_ => ({
                    ..._, content: ''

                }))
            })
        },
    ),
)

// export function use_provoke<T>(params: (s: MixState) => T) {
//     return useStore(mchc_provoke, params)
// }
// export function use_provoke() {
//     return useStore(mchc_provoke,)
// }
type StateKeys = keyof MixState
type TA<T> = (s: MixState) => T
export function use_provoke(): MixState;
export function use_provoke<T>(actions: TA<T>): T;
export function use_provoke<T extends StateKeys>(...actions: T[]): Pick<MixState, T>;

export function use_provoke<T>(actions?: TA<T> | StateKeys, ...args: StateKeys[]) {
    if (!actions) {
        return useStore(mchc_provoke)
    }
    if (isFunction(actions))
        return useStore(mchc_provoke, useShallow(actions))
    return useStore(mchc_provoke, useShallow(s => pick(s, [actions, ...args])))

}


export function peek_provoke(): MixState;
export function peek_provoke<T extends StateKeys>(k: T): MixState[T];
export function peek_provoke<T>(actions: TA<T>): T;
export function peek_provoke<T>(actions?: TA<T> | string) {
    const s = mchc_provoke.getState()
    if (!actions) return s
    if (isFunction(actions)) return actions(s)
    if (isString(actions)) return get(s, actions)
    return s
}



; (window as any).peek_provoke = peek_provoke
