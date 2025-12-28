import { LazyAntd } from '@lm_fe/components';
import { Button, message } from 'antd';
import React, { Component } from 'react';
import { isBase } from '../../../utils/func';
import EditableCell from '../../MyTable/TableEditableCell';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd

// 产前 孕产史 表格
// 写死字段
// 如果有id === -1 的记录
// 最后一个必定是 本孕的那一栏

interface Children {
  id: number;
  childGender: number; // 性别
  childLiving: boolean; // 孩子体健
  note?: string; // 备注
}

interface PregnancyHistories {
  id: number;
  gravidityindex: number; // 孕次
  vaginalDelivery: boolean;
  cesareanSection: boolean;
  forceps: boolean;
  delivery: object; // 分娩方式
  term: boolean; // 足月
  fetalcount: number; // 胎数
  children: Array<Children>;
}

interface PDPHTableProp {
  value: Array<PregnancyHistories>;
  input_props: any;
  onChange: Function;
}

interface PDPHTableState {
  value: Array<any>;
  selectedRowKeys: Array<any>;
  flag: boolean;
}

/**
 * 这里children下的字段都需要m
 */

let tableColumns = [
  {
    key: 'gravidityindex',
    title: '孕次',
    editor: {
      key: '',
      name: '',
      input_type: 'input',
    },
  },
  {
    title: '流产',
    align: 'center',
    children: [
      {
        key: 'naturalAbortion',
        title: '自然',
        align: 'center',
        editor: {
          key: '',
          name: '',
          input_type: 'checkbox',
          input_props: {
            type: 'default',
          },
        },
      },
      {
        key: 'medicalAbortion',
        title: '药物',
        align: 'center',
        editor: {
          key: '',
          name: '',
          input_type: 'checkbox',
          input_props: {
            type: 'default',
          },
        },
      },
      {
        key: 'surgicalAbortion',
        title: '手术',
        align: 'center',
        editor: {
          key: '',
          name: '',
          input_type: 'checkbox',
          input_props: {
            type: 'default',
          },
        },
      },
    ],
  },
  {
    key: 'ectopicPregnancy',
    title: '宫外孕',
    align: 'center',
    editor: { key: '', name: '', input_type: 'checkbox' },
  },
  {
    key: 'inducedLabor',
    title: '引产',
    align: 'center',
    editor: { key: '', name: '', input_type: 'checkbox' },
  },
  {
    key: 'preterm',
    title: '早产',
    align: 'center',
    editor: { key: '', name: '', input_type: 'checkbox' },
  },
  {
    key: 'term',
    title: '足月产',
    align: 'center',
    editor: { key: '', name: '', input_type: 'checkbox' },
  },
  {
    title: '分娩方式',
    align: 'center',
    children: [
      {
        key: 'vaginalDelivery',
        title: '顺产',
        editor: { key: '', name: '', input_type: 'checkbox' },
      },
      {
        key: 'operationType',
        title: '手术方式',
        align: 'center',
        editor: {
          key: '',
          name: '',
          input_type: 'select',
          input_props: {
            type: 'multiple',
            options: [
              { value: 'cesareanSection', label: '剖宫产' },
              { value: 'breechMidwifery', label: '臀助产' },
              { value: 'vacuumAssisted', label: '吸引产' },
              { value: 'forceps', label: '钳产' },
            ],
          },
        },
      },
    ],
  },
  {
    key: 'fetalcount',
    title: '胎数',
    align: 'center',
    editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' } },
  },
  {
    title: '小孩情况',
    children: [
      {
        key: 'childGender',
        title: '性别',
        align: 'center',
        editor: {
          name: '',
          key: '',
          input_type: 'select',
          input_props: {
            options: [
              { label: '男', value: 1 },
              { label: '女', value: 2 },
            ],
          },
        },
      },
      {
        key: 'childLiving',
        title: '生存',
        align: 'center',
        editor: {
          name: '',
          key: '',
          input_type: 'select',
          input_props: {
            options: [
              { label: '健在', value: true },
              { label: '死亡', value: false },
            ],
          },
        },
      },
    ],
  },
  {
    key: 'note',
    title: '备注',
    align: 'center',
    editor: {
      name: '',
      key: '',
      input_type: 'input',
    },
  },
];

// 需要进行行合并得key
const mergeKey = [
  'gravidityindex',
  'naturalAbortion',
  'medicalAbortion',
  'surgicalAbortion',
  'inducedLabor',
  'ectopicPregnancy',
  'term',
  'preterm',
  'vaginalDelivery',
  'operationType',
  'fetalcount',
  'note',
];

export default class PDPHTable extends Component<PDPHTableProp, PDPHTableState> {
  constructor(props: PDPHTableProp) {
    super(props);
    this.state = {
      value: [], // 存储已经进行了转换的信息
      selectedRowKeys: [],
      flag: false, // 表示是否显示那个孕产信息那一列
    };
  }

  componentDidMount() {
    const { value = [] } = this.props;
    this.setState({
      value: this.convertData(value),
      flag: Array.isArray(value) ? value.findIndex((v: any) => v.id === -1) !== -1 : false,
    });
  }

  componentDidUpdate(prevProps: PDPHTableProp) {
    const { value = [] } = this.props;
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setState({
        value: this.convertData(value),
        flag: Array.isArray(value) ? value.findIndex((v: any) => v.id === -1) !== -1 : false,
      });
    }
  }

  // 将children中的数据扁平化到上一层级
  convertData = (data: Array<any>): Array<any> => {
    if (!data) return [];
    const res = [];
    for (let i = 0; i < data.length; i++) {
      // 无children
      if (data[i].children.length === 0) {
        res.push({
          ...data[i],
          gravidityindex: i + 1,
          operationType: {
            cesareanSection: data[i].cesareanSection,
            breechMidwifery: data[i].breechMidwifery,
            vacuumAssisted: data[i].vacuumAssisted,
            forceps: data[i].forceps,
          },
          childGender: null,
          childLiving: null,
          otherNote: null,
          rowSpan: 1,
          // id: data[i].id,
          // 默认做一条记录新建
          childId: 0 - Math.random(),
        });
        continue;
      }
      for (let j = 0; j < data[i].children.length; j++) {
        const targetData = {
          ...data[i],
          gravidityindex: i + 1,
          operationType: {
            cesareanSection: data[i].cesareanSection,
            breechMidwifery: data[i].breechMidwifery,
            vacuumAssisted: data[i].vacuumAssisted,
            forceps: data[i].forceps,
          },
          childGender: data[i].children[j].childGender,
          childLiving: data[i].children[j].childLiving,
          otherNote: data[i].children[j].otherNote,
          // 仅仅第一行rowSpan有值，其余全部都是0
          rowSpan: j === 0 ? data[i].children.length : 0,
          // id: data[i].id,
          childId: data[i].children[j].id,
        };
        res.push(targetData);
      }
    }
    return res;
  };

  // 这里类型之后再加
  convertBack = (data: Array<any>): Array<any> => {
    const res: any[] = [];
    let id = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === -1) {
        res.push({
          id: -1,
          children: [],
          gravidityindex: '1',
          note: '本孕',
        });
        continue;
      }
      if (data[i].id !== id) {
        id = data[i].id;
        res.push({
          id,
          gravidityindex: data[i].gravidityindex,
          naturalAbortion: data[i].naturalAbortion,
          medicalAbortion: data[i].medicalAbortion,
          surgicalAbortion: data[i].surgicalAbortion,
          inducedLabor: data[i].inducedLabor,
          ectopicPregnancy: data[i].ectopicPregnancy,
          term: data[i].term,
          preterm: data[i].preterm,
          vaginalDelivery: data[i].vaginalDelivery,
          fetalcount: data[i].fetalcount,

          cesareanSection: data[i].operationType.cesareanSection,
          breechMidwifery: data[i].operationType.breechMidwifery,
          vacuumAssisted: data[i].operationType.vacuumAssisted,
          forceps: data[i].operationType.forceps,
          // 胎儿数为0,就置为空，下方数据不可嗯那个存在相同id
          children:
            data[i].fetalcount === 0
              ? []
              : [
                {
                  id: data[i].childId < 0 ? null : data[i].childId,
                  childGender: data[i].childGender,
                  childLiving: data[i].childLiving,
                },
              ],
          note: data[i].note,
        });
      } else {
        res[res.length - 1].children.push({
          id: data[i].childId < 0 ? null : data[i].childId,
          childGender: data[i].childGender,
          childLiving: data[i].childLiving,
        });
      }
    }
    return res;
  };

  // editableCell 编辑
  handleEdit = (val: any, key: any, index: number): void => {
    const { onChange } = this.props;
    const { value } = this.state;
    const newValue = JSON.parse(JSON.stringify(value));
    let firstIndex: number = 0;
    if (mergeKey.includes(key)) {
      for (let i = 0; i <= index; i++) {
        if (value[i].id === value[index].id) {
          // 将数据存储在第一层的第一条数据中
          newValue[i][key] = val;
          firstIndex = i;
          break;
        }
      }
    } else {
      newValue[index][key] = val;
      firstIndex = index;
    }
    // 判断是否修改了胎数，对其修改做处理
    if (key === 'fetalcount') {
      // 防止用户输入 -1 0 值
      if (newValue[firstIndex][key] < 0 || !newValue[firstIndex][key]) {
        newValue[firstIndex][key] = 0;
        val = 1;
      }
      const sameIdArr = value.filter((v: PregnancyHistories) => v.id === value[firstIndex].id);
      if (val > sameIdArr.length) {
        const newData = sameIdArr[0];
        // 将 性别 生存置空
        newData.childGender = null;
        newData.childLiving = null;
        for (let i = 0; i < val - sameIdArr.length; i++) {
          newData.childId = 0 - Math.random();
          newValue.splice(firstIndex + sameIdArr.length + i, 0, newData);
        }
      } else if (val < sameIdArr.length) {
        newValue.splice(firstIndex + val, sameIdArr.length - val);
      }
    }
    this.setState({ value: newValue }, () => {
      onChange(this.convertBack(this.state.value));
    });
  };

  // 整理tableColumns
  handleTabColumnsFormat = (tableColumns: Array<any>): any => {
    const { value = [{}], flag } = this.state;
    // 是否存在本孕那一栏
    return tableColumns.map((v: any, i: number) => {
      if (v.key) {
        return {
          ...v,
          dataIndex: v.key,
          render: (text: string, record: any, index: number) => {
            if (v.key === 'gravidityindex') {
              return text;
            }
            // 无用的 那个本孕栏
            if (flag && index === value.length - 1) {
              return {
                children: <span>{isBase(text) ? text : ''}</span>,
                props: {
                  rowSpan: 1,
                  colSpan: (() => {
                    if (v.key === 'gravidityindex') {
                      return 1;
                    }
                    if (v.key === 'note') {
                      return 13;
                    }
                    return 0;
                  })(),
                },
              };
            }
            return {
              children: (
                <EditableCell
                  value={record[v.key]}
                  onChange={(val: any) => this.handleEdit(val, v.key, index)}
                  editor={v.editor}
                />
              ),
              props: {
                rowSpan: mergeKey.includes(v.key) ? record.rowSpan : 1,
              },
            };
          },
        };
      }
      if (v.children) {
        return {
          title: v.title,
          children: this.handleTabColumnsFormat(v.children),
        };
      }
      return {};
    });
  };

  handleAdd = () => {
    const { value, flag } = this.state;
    const newValue = JSON.parse(JSON.stringify(value));
    const len = value.length;
    const newData = {
      gravidityindex: null,
      naturalAbortion: false,
      medicalAbortion: false,
      surgicalAbortion: false,
      inducedLabor: false,
      ectopicPregnancy: false,
      term: false,
      preterm: false,
      vaginalDelivery: false,
      operationType: {
        vacuumAssisted: false,
        breechMidwifery: false,
        vaginalDelivery: false,
        cesareanSection: false,
        forceps: false,
      },
      fetalcount: null,
      childGender: null,
      childLiving: null,
      note: null,
      rowSpan: 1,
      id: 0 - Math.random(),
      childId: 0 - Math.random(),
    };
    if (flag) {
      newValue.splice(len - 1, 0, newData);
    } else {
      newValue.splice(len, 0, newData);
    }
    this.setState({ value: newValue }, () => {
      this.props.onChange(this.convertBack(this.state.value));
    });
  };

  handleDelete = () => {
    const { selectedRowKeys = [] } = this.state;
    const newValue = JSON.parse(JSON.stringify(this.state.value));
    selectedRowKeys.forEach((selectedChildId: number) => {
      const i = newValue.findIndex((val: any) => val.childId === selectedChildId);
      // 需要改变fetalcount的index
      for (let j = 0; j < newValue.length; j++) {
        if (newValue[j].id === newValue[i].id) {
          newValue[j].fetalcount -= 1;
          break;
        }
      }
      if (i !== -1) {
        newValue.splice(i, 1);
      }
    });
    this.setState({ value: newValue }, () => {
      this.props.onChange(this.convertBack(this.state.value));
    });
  };

  handleRowSelectChange = (selectedRowKeys: Array<number | string>): void => {
    const { value } = this.state;
    if (value[value.length - 1].childId === selectedRowKeys[0]) {
      message.warning('此栏信息不可编辑与删除');
      return;
    }
    this.setState({ selectedRowKeys });
  };

  render() {
    const { value = [], selectedRowKeys = [] } = this.state;
    tableColumns = this.handleTabColumnsFormat(tableColumns);
    const rowSelection = {
      selectedRowKeys: selectedRowKeys,
      onChange: this.handleRowSelectChange,
    };
    return (
      <div>
        <div>
          <Button onClick={this.handleAdd}>新增</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleDelete}>
            删除
          </Button>
        </div>
        <Table
          size="small"
          bordered
          rowSelection={rowSelection}
          dataSource={value}
          columns={tableColumns}
          childrenColumnName="noChildren"
          pagination={false}
          // 这里要用childID去做唯一id
          rowKey={(record: any) => record.childId}
        />
      </div>
    );
  }
}
