import { Dispatch } from 'redux';
import { get, set, map, keys, keyBy, isNil } from 'lodash';
import { request, safe_json_parse } from '@lm_fe/utils';
import { ACTION_TYPE } from '../actionType';
import { ISystemConfig } from '../types';




export const _getSystemConfig = () => async (dispatch: Dispatch) => {
  const res = (await request.get('/api/dictionaries?type.equals=99')).data;
  const data = {
    id: get(res, '0.id'),
    ...safe_json_parse(get(res, '0.note')),
  };
  dispatch({
    type: ACTION_TYPE.UPDATE_SYSTEM_CONFIG,
    payload: {
      data,
    },
  });
  return data as ISystemConfig;
};

export const _updateSystemConfig = (data: any) => async (dispatch: Dispatch) => {
  const res = (await request.put('/api/dictionaries', data)).data;
  const dataSource = {
    id: get(res, 'id'),
    ...safe_json_parse(get(res, 'note')),
  };
  dispatch({
    type: ACTION_TYPE.UPDATE_SYSTEM_CONFIG,
    payload: {
      data: dataSource,
    },
  });
};



export const updateSocketState = (state: number) => async (dispatch: Dispatch) => {
  dispatch({
    type: ACTION_TYPE.UPDATE_SOCKET_STATE,
    payload: {
      socketState: state,
    },
  });
  return state;
};

