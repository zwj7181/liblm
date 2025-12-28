
import { get } from 'lodash';

export const fromApi = (data) => {
  return {
    ...data,
    datetime: { date: get(data, 'courseDate'), time: get(data, 'period') },
  };
};

export const toApi = (data) => {
  return {
    ...data,
    courseDate: get(data, `datetime.date`),
    period: get(data, `datetime.time`),
  };
};
