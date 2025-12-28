import dayjs from 'dayjs';

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width: 48,
    align: 'center',
    render: (text, record, index) => index + 1,
  },
  {
    title: '转入/转出',
    dataIndex: 'transferType',
    key: 'transferType',
    width: 120,
    inputType: 'select',
    options: [
      {
        label: '转入',
        value: 1,
      },
      {
        label: '转出',
        value: 2,
      },
    ],
    render: (text) => {
      return text === 1 ? '转入' : '转出';
    },
    editable: true,
  },
  {
    title: '转入/转出科室',
    dataIndex: 'deptName',
    key: 'deptName',
    inputType: 'autoComplete',
    options: [{ value: '妇科' }, { value: '新生儿科' }, { value: '产科' }],
    width: 120,
    editable: true,
  },
  {
    title: '转入/转出日期',
    dataIndex: 'transferDate',
    key: 'transferDate',
    inputType: 'date',
    width: 140,
    editable: true,
  },
  {
    title: '备注',
    dataIndex: 'note',
    key: 'note',
    inputType: 'input',
    width: 200,
    editable: true,
  },
];

export const data = [
  { id: '101', transferType: 1, deptName: '妇科', transferDate: '2020-01-10', note: '备注' },
  { id: '201', transferType: 2, deptName: '新生儿科', transferDate: '2020-02-10', note: '备注' },
];

export const transValuesToForm = (data = []) => {
  let result = [];
  if (!data.length) {
    return result;
  }
  for (let i = 0; i < data.length; i++) {
    const element = { ...data[i], transferDate: dayjs(data[i]['transferDate']) };
    result.push(element);
  }
  return result;
};

export const transFormToValues = (data = []) => {
  let result = [];
  if (!data.length) {
    return result;
  }
  for (let i = 0; i < data.length; i++) {
    const element = { ...data[i], transferDate: dayjs(data[i]['transferDate']).format('YYYY-MM-DD') };
    result.push(element);
  }
  return result;
};

export default columns;
