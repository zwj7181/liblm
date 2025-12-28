export const gdmConfig: Array<any> = [
  {
    name: 'gdm',
    key: '.*',
    label: '',
    input_type: 'table',
    input_props: {
      editable: true,
      hiddenSelection: true,
      tableColumns: [
        {
          key: 'checkdate',
          title: '日期',
          width: 60,
          editor: { input_type: 'single_date_picker' },
        },
        {
          key: 'kf',
          title: '空腹血糖(mmol/L)',
          width: 40,
          editor: {
            input_type: 'input_number',
            // input_props: { min: 60, max: 100, tip: '脉搏的正常范围值是60~100bpm' },
          },
          // render: (value: any) => <InputWithRange value={value} min={60} max={100} hiddenIpt={true} />,
        },
        {
          key: 'ch1',
          title: '餐后1h血糖(mmol/L)',
          width: 40,
          editor: { input_type: 'input_number' },
        },
        {
          key: 'ch2',
          title: '餐后2h血糖(mmol/L)',
          width: 40,
          editor: { input_type: 'input_number' },
        },
        {
          key: 'th',
          title: '糖化血红蛋白(%)',
          width: 40,
          editor: { input_type: 'input_number' },
        },
        {
          key: 'kfy',
          title: '空腹胰岛素(uU/L)',
          width: 40,
          editor: { input_type: 'input_number' },
        },
        {
          key: 'miny',
          title: '30min胰岛素(uU/L)',
          width: 40,
          editor: { input_type: 'input_number' },
        },
        {
          key: 'hy',
          title: '2h胰岛素(uU/L)',
          width: 40,
          editor: { input_type: 'input_with_range' },
        },

        {
          title: '早胰岛素方案',
          children: [
            {
              key: 'zdrug',
              title: '药名',
              width: 50,
              editor: {
                name: '',
                key: '',
                input_type: 'select_with_options',
                input_props: {
                  options: [
                    { label: '诺和平', value: '诺和平' },
                    { label: '诺和锐', value: '诺和锐' },
                  ],
                },
              },
            },
            {
              key: 'zdosage',
              title: '用量(U)',
              width: 40,
              editor: { input_type: 'input_number' },
            },
          ],
        },
        {
          title: '中胰岛素方案',
          children: [
            {
              key: 'jdrug',
              title: '药名',
              width: 50,
              editor: {
                name: '',
                key: '',
                input_type: 'select_with_options',
                input_props: {
                  options: [
                    { label: '诺和平', value: '诺和平' },
                    { label: '诺和锐', value: '诺和锐' },
                  ],
                },
              },
            },
            {
              key: 'jdosage',
              title: '用量(U)',
              width: 40,
              editor: { input_type: 'input_number' },
            },
          ],
        },
        {
          title: '晚胰岛素方案',
          children: [
            {
              key: 'wdrug',
              title: '药名',
              width: 50,
              editor: {
                name: '',
                key: '',
                input_type: 'select_with_options',
                input_props: {
                  options: [
                    { label: '诺和平', value: '诺和平' },
                    { label: '诺和锐', value: '诺和锐' },
                  ],
                },
              },
            },
            {
              key: 'wdosage',
              title: '用量(U)',
              width: 40,
              editor: { input_type: 'input_number' },
            },
          ],
        },
      ],
    },
  },
];
export const bmiConfig: Array<any> = [
  {
    name: 'bmi',
    key: '.*',
    label: '',
    input_type: 'table',
    input_props: {
      editable: true,
      hiddenSelection: true,
      tableColumns: [
        {
          key: 'checkdate',
          title: '日期',
          width: 60,
          editor: { input_type: 'single_date_picker' },
        },
        {
          key: 'tz',
          title: '体重(kg)',
          width: 40,
          editor: { input_type: 'input_number' },
        },

        {
          key: 'xl',
          title: '心率(bpm)',
          width: 40,
          editor: { input_type: 'input_number' },
        },
        {
          key: 'td',
          title: '胎动',
          width: 40,
          editor: {
            input_type: 'select_with_options',
            input_props: {
              options: [
                { label: '未有', value: '未有' },
                { label: '正常', value: '正常' },
                { label: '减少', value: '减少' },
                { label: '增多', value: '增多' },
              ],
            },
          },
        },
        {
          key: 'xh',
          title: '血红蛋白(g/L)',
          width: 40,
          editor: { input_type: 'input_number' },
        },
        {
          key: 'bpd',
          title: 'BPD(mm)',
          width: 40,
          editor: { input_type: 'input_number' },
        },
        {
          key: 'hc',
          title: 'HC(mm)',
          width: 40,
          editor: { input_type: 'input_number' },
        },
        {
          key: 'ac',
          title: 'AC(mm)',
          width: 40,
          editor: { input_type: 'input_number' },
        },
        {
          key: 'fl',
          title: 'FL(mm)',
          width: 40,
          editor: { input_type: 'input_number' },
        },
        {
          key: 'hl',
          title: 'HL(mm)',
          width: 40,
          editor: { input_type: 'input_number' },
        },
        {
          key: 'efw',
          title: 'EFW(g)',
          width: 40,
          editor: { input_type: 'input_number' },
        },
        {
          key: 'afv',
          title: 'AFV(uU/L)',
          width: 40,
          editor: { input_type: 'input_number' },
        },
        {
          key: 'ys',
          title: '饮食建议(uU/L)',
          width: 40,
          editor: { input_type: 'input' },
        },
        {
          key: 'yd',
          title: '运动建议(uU/L)',
          width: 40,
          editor: { input_type: 'input' },
        },
      ],
    },
  },
];
export const fetalOption = {
  二胎: [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
  ],
  三胎: [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
  ],
  四胎: [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
  ],
  五胎: [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ],
  六胎: [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
  ],
};
const commonColumns = [
  {
    key: 'checkdate',
    title: '日期',
    width: 60,
    editor: { input_type: 'single_date_picker' },
  },
  {
    key: 'gestationalWeek',
    title: '孕周',
    width: 40,
    editor: { input_type: 'input' },
  },
  {
    key: 'fetal',
    title: '胎儿',
    width: 40,
    editor: {
      input_type: 'select_with_options_or_input',
      input_props: {
        options: [],
      },
    },
  },
  {
    key: 'fetalMovement',
    title: '胎动',
    width: 40,
    editor: {
      input_type: 'select_with_options',
      input_props: {
        options: [
          { label: '未有', value: '未有' },
          { label: '正常', value: '正常' },
          { label: '减少', value: '减少' },
          { label: '增多', value: '增多' },
        ],
      },
    },
  },
  {
    key: 'fhr',
    title: '胎心率',
    width: 40,
    editor: { input_type: 'input_number' },
  },
  {
    key: 'fetalMonitor',
    title: '胎监',
    width: 40,
    editor: { input_type: 'input' },
  },
  {
    key: 'bpd',
    title: 'BPD(mm)',
    width: 40,
    editor: { input_type: 'input_number' },
  },
  {
    key: 'hc',
    title: 'HC(mm)',
    width: 40,
    editor: { input_type: 'input_number' },
  },
  {
    key: 'ac',
    title: 'AC(mm)',
    width: 40,
    editor: { input_type: 'input_number' },
  },
  {
    key: 'fl',
    title: 'FL(mm)',
    width: 40,
    editor: { input_type: 'input_number' },
  },
  {
    key: 'hl',
    title: 'HL(mm)',
    width: 40,
    editor: { input_type: 'input_number' },
  },
  {
    key: 'efw',
    title: 'EFW(g)',
    width: 40,
    editor: { input_type: 'input_number' },
  },
  {
    key: 'afv',
    title: 'AFV(mm)',
    width: 40,
    editor: { input_type: 'input_number' },
  },
  {
    key: 'ubf',
    title: '脐血流',
    width: 40,
    editor: { input_type: 'input' },
  },
];
export const slowGrowingConfig: Array<any> = [
  { name: '', key: '', label: '关键指标', header_label: true, just_header: true, input_type: '' },
  {
    name: 'slowGrowing',
    key: '.*',
    label: '',
    input_type: 'table',
    input_props: {
      editable: true,
      hiddenSelection: true,
      tableColumns: commonColumns,
    },
  },

  { name: '', key: '', label: '病理因素', header_label: true, just_header: true, input_type: '' },
  {
    name: 'allergyHistory',
    key: '.allergyHistory',
    label: '母体因素',
    span: 24,
    input_type: 'checkbox',
    input_props: {
      type: 'multiple',
      radio: false,
      renderData: [
        {
          key: 'drsdug',
          label: '紫绀型心脏病',
        },
        {
          key: 'foodfsf',
          label: '慢性肾病',
        },
        {
          key: 'ogdsgther',
          label: '慢性高血压',
        },
        {
          key: 'fgsgood',
          label: '糖尿病',
        },
        {
          key: 'othegsgr',
          label: '甲状腺疾病',
        },
        {
          key: 'foogsgd',
          label: '系统性红斑狼疮',
        },
        {
          key: 'othhdher',
          label: '抗磷脂抗体综合征',
        },
        {
          key: 'fdhhood',
          label: '子痫前期',
        },
        {
          key: 'othhegsgr',
          label: '妊娠期肝内胆汁淤积症',
        },
      ],
    },
  },
  {
    name: 'hypertension',
    key: '.diseaseHistory.hypertdfgension(Note)',
    label: '胎儿结构异常',
    input_type: 'checkbox',
    span: 18,
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'hypertension',
          label: '',
          options: [
            { label: '无', value: 1 },
            { label: '先天性心脏病', value: 2 },
            { label: '腹壁裂', value: 3 },
            { label: '未查', value: 4 },
          ],
        },
      ],
    },
  },
  {
    name: 'diabetes',
    key: '.diseaseHistory.diagdbetes(Note)',
    label: '胎盘异常',
    input_type: 'checkbox',
    span: 18,
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'diabetes',
          label: '',
          options: [
            { label: '无', value: 1 },
            { label: '轮廓胎盘', value: 2 },
            { label: '胎盘血管瘤', value: 3 },
            { label: '绒毛膜下血肿', value: 4 },
            { label: '小胎盘', value: 5 },
            { label: '副胎盘', value: 6 },
            { label: '未查', value: 7 },
            { label: '其他', value: 8 },
          ],
          extraEditors: [
            {
              key: 8,
              editors: [{ input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'cardiacDisease',
    key: '.diseaseHistory.cardiacDgaisease(Note)',
    label: '脐带异常',
    input_type: 'checkbox',
    span: 18,
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'cardiacDisease',
          label: '',
          options: [
            { label: '无', value: 1 },
            { label: '单脐动脉', value: 2 },
            { label: '脐带过细', value: 3 },
            { label: '脐带扭转', value: 4 },
            { label: '脐带打结', value: 5 },
            { label: '未查', value: 6 },
            { label: '其他', value: 7 },
          ],
          extraEditors: [
            {
              key: 7,
              editors: [{ input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'cardiacDisease',
    key: '.diseaseHistory.cardiacgarDisease(Note)',
    label: '其他因素',
    input_type: 'checkbox',
    span: 18,
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'cardiacDisease',
          label: '',
          options: [
            { label: '无', value: 1 },
            { label: '吸烟', value: 2 },
            { label: '喝酒', value: 3 },
            { label: '接触放射线', value: 4 },
            { label: '其他', value: 5 },
          ],
          extraEditors: [
            {
              key: 5,
              editors: [{ input_type: 'input' }],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'cardiacDisease',
    key: '.diseaseHistory.cardiacDisgagease(Note)',
    label: '产前诊断',
    input_type: 'checkbox',
    span: 18,
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'cardiacDisease',
          label: '',
          options: [
            { label: '正常', value: 1 },
            { label: '异常', value: 2 },
            { label: '拒绝产前诊断', value: 3 },
          ],
        },
      ],
    },
  },
  {
    name: 'cardiacDisease',
    key: '.diseaseHistory.cardiacDigagsease(Note)',
    label: '巨细胞病毒',
    input_type: 'checkbox',
    span: 8,
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'cardiacagDisease',
          label: '',
          options: [
            { label: '阴性', value: 1 },
            { label: '阳性', value: 2 },
            { label: '未查', value: 3 },
          ],
        },
      ],
    },
  },
  {
    name: 'cardiacDisease',
    key: '.diseaseHistory.cardiacDigazgsease(Note)',
    label: '风疹病毒',
    input_type: 'checkbox',
    span: 8,
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'cardiacggDisease',
          label: '',
          options: [
            { label: '阴性', value: 1 },
            { label: '阳性', value: 2 },
            { label: '未查', value: 3 },
          ],
        },
      ],
    },
  },
  {
    name: 'cardiacDisease',
    key: '.diseaseHistory.cardiacDgagisease(Note)',
    label: '弓形虫',
    input_type: 'checkbox',
    span: 8,
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'cardiacDisease',
          label: '',
          options: [
            { label: '阴性', value: 1 },
            { label: '阳性', value: 2 },
            { label: '未查', value: 3 },
          ],
        },
      ],
    },
  },
  {
    name: 'cardiacDisease',
    key: '.diseaseHistory.cardiacDigazgsease(Note)',
    label: 'HIV',
    input_type: 'checkbox',
    span: 8,
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'cardiacDgaisease',
          label: '',
          options: [
            { label: '阴性', value: 1 },
            { label: '阳性', value: 2 },
            { label: '未查', value: 3 },
          ],
        },
      ],
    },
  },
  {
    name: 'cardiacDisease',
    key: '.diseaseHistory.cardiacDisease(Note)',
    label: '丙肝',
    input_type: 'checkbox',
    span: 8,
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'cardiacDisease',
          label: '',
          options: [
            { label: '阴性', value: 1 },
            { label: '阳性', value: 2 },
            { label: '未查', value: 3 },
          ],
        },
      ],
    },
  },
  {
    name: 'cardiacDisease',
    key: '.diseaseHistory.cardiafhshgacDisease(Note)',
    label: '梅毒',
    input_type: 'checkbox',
    span: 8,
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'cardiacgrgDisease',
          label: '',
          options: [
            { label: '阴性', value: 1 },
            { label: '阳性', value: 2 },
            { label: '未查', value: 3 },
          ],
        },
      ],
    },
  },
];
export const twinsConfig: Array<any> = [
  { name: '', key: '', label: '双胎情况', header_label: true, just_header: true, input_type: '' },
  {
    name: 'twinPregnancyType',
    key: 'twinPregnancyType',
    label: '双胎妊娠类型',
    span: 8,
    input_type: 'select',
    input_props: {
      options: [
        { label: '双绒毛膜双羊膜囊双胎', value: '双绒毛膜双羊膜囊双胎' },
        { label: '单绒毛膜双羊膜囊双胎', value: '单绒毛膜双羊膜囊双胎' },
        { label: '单绒毛膜单羊膜囊双胎', value: '单绒毛膜单羊膜囊双胎' },
        { label: '未确认', value: '未确认' },
      ],
    },
  },
  {
    name: 'multipleComplications',
    key: 'multipleComplications',
    label: '双胎并发症',
    input_type: 'checkbox',
    span: 18,
    input_props: {
      type: 'group',
      options: [
        { label: '双胎输血综合征(TTTS)', value: 1 },
        { label: '无心畸胎序列征(TRAPS)', value: 2 },
        { label: '选择性胎儿生长受限(sIUGR)', value: 3 },
      ],
    },
  },
  {
    name: 'reduction(Note)',
    key: 'reduction(Note)',
    label: '减胎',
    input_type: 'checkbox',
    span: 18,
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'reduction',
          label: '',
          options: [
            { label: '无', value: 1 },
            { label: '有', value: 2 },
          ],
          extraEditors: [
            {
              key: 2,
              editors: [
                { label: '减胎对象', name: 'reductionObject', key: 'reductionObject', input_type: 'input' },
                { label: '减胎原因', name: 'reductionReason', key: 'reductionReason', input_type: 'input' },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'stillbornFoetus(Note)',
    key: 'stillbornFoetus(Note)',
    label: '死胎',
    input_type: 'checkbox',
    span: 18,
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'stillbornFoetus',
          label: '',
          options: [
            { label: '无', value: 1 },
            { label: '有', value: 2 },
          ],
          extraEditors: [
            {
              key: 2,
              editors: [
                { label: '死胎对象', name: 'stillbornFoetusObject', key: 'stillbornFoetusObject', input_type: 'input' },
                { label: '死胎原因', name: 'stillbornFoetusReason', key: 'stillbornFoetusReason', input_type: 'input' },
              ],
            },
          ],
        },
      ],
    },
  },

  { name: '', key: '', label: '超声指标', header_label: true, just_header: true, input_type: '' },
  {
    name: 'mlUltrasounds',
    key: 'mlUltrasounds',
    label: '',
    input_type: 'table',
    input_props: {
      editable: true,
      hiddenSelection: true,
      tableColumns: commonColumns,
    },
  },
];
export const multipletsConfig: Array<any> = [
  { name: '', key: '', label: '多胎情况', header_label: true, just_header: true, input_type: '' },
  {
    name: 'fetalCount',
    key: 'fetalCount',
    label: '胎数',
    span: 8,
    input_type: 'select',
    input_props: {
      options: [
        { label: '三胎', value: '三胎' },
        { label: '四胎', value: '四胎' },
        { label: '五胎', value: '五胎' },
        { label: '六胎', value: '六胎' },
      ],
    },
  },
  {
    name: 'multipleComplications',
    key: 'multipleComplications',
    label: '多胎并发症',
    input_type: 'checkbox',
    span: 18,
    input_props: {
      type: 'group',
      options: [
        // { label: '双胎输血综合征(TTTS)', value: 1 },
        { label: '无心畸胎序列征(TRAPS)', value: 2 },
        { label: '选择性胎儿生长受限(sIUGR)', value: 3 },
      ],
    },
  },
  {
    name: 'reduction(Note)',
    key: 'reduction(Note)',
    label: '减胎',
    input_type: 'checkbox',
    span: 18,
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'reduction',
          label: '',
          options: [
            { label: '无', value: 1 },
            { label: '有', value: 2 },
          ],
          extraEditors: [
            {
              key: 2,
              editors: [
                { label: '减胎对象', name: 'reductionObject', key: 'reductionObject', input_type: 'input' },
                { label: '减胎原因', name: 'reductionReason', key: 'reductionReason', input_type: 'input' },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    name: 'stillbornFoetus(Note)',
    key: 'stillbornFoetus(Note)',
    label: '死胎',
    input_type: 'checkbox',
    span: 18,
    input_props: {
      type: 'custom',
      renderData: [
        {
          key: 'stillbornFoetus',
          label: '',
          options: [
            { label: '无', value: 1 },
            { label: '有', value: 2 },
          ],
          extraEditors: [
            {
              key: 2,
              editors: [
                { label: '死胎对象', name: 'stillbornFoetusObject', key: 'stillbornFoetusObject', input_type: 'input' },
                { label: '死胎原因', name: 'stillbornFoetusReason', key: 'stillbornFoetusReason', input_type: 'input' },
              ],
            },
          ],
        },
      ],
    },
  },

  { name: '', key: '', label: '超声指标', header_label: true, just_header: true, input_type: '' },
  {
    name: 'mlUltrasounds',
    key: 'mlUltrasounds',
    label: '',
    input_type: 'table',
    input_props: {
      editable: true,
      hiddenSelection: true,
      tableColumns: commonColumns,
    },
  },
];
