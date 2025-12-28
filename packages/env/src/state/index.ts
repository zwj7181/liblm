// import { Dispatch } from 'redux';
import { Store } from 'redux';

import { MyLog } from '@lm_fe/utils';
import { filter, get } from 'lodash';
import { mchcConstant } from '../constant';
import { mchcLogger } from '../logger';
import { getSameOptions } from '../select_options/funcs';
import { _getSystemConfig, _updateSystemConfig } from './actions/system';
import { deleteAllTabs, deleteTab } from './actions/tabs';
import { IState, ISystemConfig } from './types';
export { ACTION_TYPE } from './actionType'
export * from './types';
class MchcStore {
    logger = new MyLog('MchcStore')

    private _store!: Store;
    get store(): Store {
        return this._store;
    }
    set store(value: Store) {
        this._store = value;
    }
    __getState!: () => IState
    __getDispatch!: () => Store['dispatch']
    get state() {

        return window.peek_provoke?.() as IState
    }
    get dispatch() {
        if (this.__getDispatch) return this.__getDispatch()

        if (!this._store) {
            this.logger.warn('为设置 store')
            return (() => { }) as Store['dispatch']
        }
        return this._store.dispatch

    }

    deleteAllTabs() {
        return deleteAllTabs()(this.dispatch)
    }
    deleteCurrentTab() {
        const key = this.state.activeKey
        return deleteTab(key)(this.dispatch)
    }
    getSystemConfig() {
        return _getSystemConfig()(this.dispatch)
    }
    updateSystemConfig(data: any) {
        return _updateSystemConfig(data)(this.dispatch)
    }

    get highrisk_version_options() {
        const dictionaries = this.state.dictionaries
        const versionOptions = get(dictionaries, ['Highrisk.highriskVersion', 'enumerations'],) ?? [];
        return versionOptions.map(_ => ({ ..._, label: `${_.label}(${_.value})` }))
    }
    get highriskContagionConfig() {
        const dictionaries = this.state.dictionaries
        const system = this.state.system
        const highriskVersion = get(system, 'config.highriskVersion');
        const initDictionaries = get(dictionaries, 'initDictionaries');
        const contagionDic = filter(
            initDictionaries,
            (item) => item.key === 'highriskContagion' && item.type === highriskVersion,
        )[0]?.enumerations?.[0]
        return {
            color: get(contagionDic, 'note'),
            options: getSameOptions(get(contagionDic, 'label'))
        }

    }
    get highriskGradeConfig() {
        const dictionaries = this.state.dictionaries
        const system = this.state.system
        const highriskVersion = get(system, 'config.highriskVersion') as 22
        const initDictionaries = get(dictionaries, 'initDictionaries');
        const gradeDic = filter(initDictionaries, (item) => item.key === 'highriskGrade' && item.type === highriskVersion)[0]
        const enumerations = get(gradeDic, 'enumerations')
        if (!enumerations) {
            mchcLogger.warn('gradeDic 为空', { initDictionaries, highriskVersion })
            return []
        }
        const colors = mchcConstant.levelOptionsobj[highriskVersion] ?? []

        const enums = enumerations.map(_ => {
            const colorConfig = colors.find(c => c.level_text === _.label)
            return { ..._, colorText: colorConfig?.color_text! }
        })
        return enums

    }
}
class MchcConfig {

    get<T extends keyof ISystemConfig>(key: T) {
        return this.getAll()?.[key]
    }
    getAll() {
        const config = window.peek_provoke?.('config')
        return config
    }

}
export const mchcStore = (window as any).mchcStore = new MchcStore
export const mchcConfig = (window as any).mchcConfig = new MchcConfig
