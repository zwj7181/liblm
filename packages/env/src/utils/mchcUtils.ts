import { checkBloodPressure, checkPulse, checkTemperature } from './medical_examination'
import { getDictionaries, getDictionariesEnumerations, getDictionaryLabel, getDictionaryValue } from './dictionary'
import { getGlobalDispatch, getGlobalHistory, getGlobalState, setGlobalState, setGlobalDispatch, setGlobalHistory } from './state'

import { getUserData } from './user_data'
import { autoCommonOptionToNote, autoNoteToCommonOption, commonOptionToNote, getActionType, fuck_cache, single_id, noteToCommonOption } from './func'

import { checkAge, checkIdNo, checkIdNo_new, checkProvince } from './checkIdNO'
import * as  uu from '@lm_fe/utils'
import Dayjs from 'dayjs'
export type MchcUtils = typeof mchcUtils
export const mchcUtils = {
    Dayjs,
    ...uu,
    checkBloodPressure,
    checkSphygmus: checkPulse,
    checkTemperature,
    getDictionariesEnumerations,
    getDictionaryLabel,
    getDictionaryValue,
    getDictionaries,
    getUserData,
    autoCommonOptionToNote, autoNoteToCommonOption, commonOptionToNote, getActionType, fuck_cache, single_id, noteToCommonOption,
    checkAge, checkIdNo, checkIdNo_new, checkProvince,
    getGlobalDispatch,
    getGlobalHistory,
    getGlobalState,
    setGlobalState,
    setGlobalDispatch,
    setGlobalHistory
}

