import { get, map, reduce, isEmpty, omit } from 'lodash';
import dayjs from 'dayjs';
import { ICommonOption } from '@lm_fe/env';
import { formatTimeToDate, formatTimeToStandard } from '@lm_fe/components_m';
import { IMchc_Group } from '@lm_fe/service';
import { safe_json_parse_arr } from '@lm_fe/utils';

export const processFromApi = (data) => {
  return map(data, (item) => {
    return {
      ...item,
      overdueDate: dayjs(get(item, 'overdueDate')),
      createdDate: formatTimeToStandard(get(item, 'createdDate')),
      lastModifiedDate: formatTimeToStandard(get(item, 'lastModifiedDate')),
      roles: map(get(item, 'groups'), (group) => get(group, 'id')),
      role: reduce(
        get(item, 'groups'),
        (sum, group) => {
          return `${isEmpty(sum) ? '' : sum + '、'}${get(group, 'nickname')}`;
        },
        '',
      ),
    };
  });
};

export const fromApi = (item) => {
  const groups = get(item, 'groups') as IMchc_Group[]
  return {
    ...item,
    overdueDate: get(item, 'overdueDate') ? dayjs(get(item, 'overdueDate')) : undefined,
    createdDate: formatTimeToStandard(get(item, 'createdDate')),
    lastModifiedDate: formatTimeToStandard(get(item, 'lastModifiedDate')),
    // roles: map(groups, (group) => ({ value: get(group, 'id'), text: get(group, 'groupRanks').map(_ => ({ value: _.id })) })),
  };
};

export const toApi = (item) => {
  return {
    ...omit(item, ['createdDate', 'lastModifiedDate', 'roles', 'role']),
    overdueDate: formatTimeToDate(get(item, 'overdueDate')),
    // groups: map(get(item, 'roles'), (obj: ICommonOption) => ({ id: obj.value, groupRanks: safe_json_parse_arr(obj.text).map(_ => ({ id: _.value })) })),
  };
};
