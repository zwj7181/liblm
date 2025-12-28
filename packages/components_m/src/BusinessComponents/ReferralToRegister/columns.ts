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
    dataIndex: 'referralType',
    key: 'referralType',
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
    dataIndex: 'referralDept',
    key: 'referralDept',
    inputType: 'autoComplete',
    options: [{ value: '妇科' }, { value: '新生儿科' }, { value: '产科' }],
    width: 120,
    editable: true,
  },
  {
    title: '转入/转出日期',
    dataIndex: 'referralDate',
    key: 'referralDate',
    inputType: 'date',
    width: 140,
    editable: true,
  },
  {
    title: '备注',
    dataIndex: 'reason',
    key: 'reason',
    inputType: 'input',
    width: 200,
    editable: true,
  },
];

export const data = [
  { id: '101', referralType: 1, referralDept: '妇科', referralDate: '2020-01-10', reason: '备注' },
  { id: '201', referralType: 2, referralDept: '新生儿科', referralDate: '2020-02-10', reason: '备注' },
];

export const transValuesToForm = (data = []) => {
  let result = [];
  if (!data.length) {
    return result;
  }
  for (let i = 0; i < data.length; i++) {
    const element = { ...data[i], referralDate: dayjs(data[i]['referralDate']) };
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
    const element = { ...data[i], referralDate: dayjs(data[i]['referralDate']).format('YYYY-MM-DD') };
    result.push(element);
  }
  return result;
};

export default columns;
