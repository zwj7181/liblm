import { FormConfig, formatTimeToStandard } from '@lm_fe/components_m';
import { otherOptions } from '@lm_fe/env';
export const config: Array<FormConfig> = [
  {
    name: 'visitsList',
    key: '.*',
    label: '',
    input_type: 'prenatalReturnTable',
    input_props: {
      editable: false,
      hiddenBtn: true,
      hiddenSelection: true,
      // scroll: { x: 'max-content' },
      tableColumns: [
        {
          key: 'visitDate',
          title: '日期',
          width: 100,
          editor: { name: '', key: '', input_type: 'date', unEditable: true },
          render: (text, record, index) => {
            return (
              <div style={{ minWidth: '60px', textAlign: 'center' }}>{formatTimeToStandard(text, 'YY-MM-DD')}</div>
            );
          },
        },
        {
          key: 'gestationalWeek',
          title: '孕周',
          width: 68,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
        },
        {
          key: 'physicalExam.weight',
          title: '体重',
          suffix: 'kg',
          suffixNewLine: true,
          width: 68,
          editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' }, unEditable: true },
        },
        {
          key: 'resetLic',
          title: '血压',
          suffix: 'mmHg',
          suffixNewLine: true,
          width: 108,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
        },
        {
          key: 'pulse',
          title: '脉搏',
          suffix: '次/分',
          suffixNewLine: true,
          width: 68,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
        },
        {
          key: 'gynExam.fundalHeight',
          title: '宫高',
          suffix: 'cm',
          suffixNewLine: true,
          width: 68,
          editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' }, unEditable: true },
        },
        {
          key: 'gynExam.waistHip',
          title: '腹围',
          suffix: 'cm',
          suffixNewLine: true,
          width: 68,
          editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' }, unEditable: true },
        },
        {
          key: 'edema',
          title: '下肢水肿',
          width: 68,
          editor: {
            name: '',
            key: '',
            input_type: 'select',
            input_props: { options: otherOptions.edemaOptions },
            // input_props: { options: 'edemaOptions'},
            unEditable: true,
          },
          selectOptions: otherOptions.edemaOptions,
        },

        /* 胎儿信息 */
        {
          key: 'resetTaix',
          title: '胎心率',
          suffix: 'bpm',
          suffixNewLine: true,
          width: 68,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
        },
        {
          key: 'resetXianl',
          title: '先露',
          width: 68,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
          render: (text, record, index) => {
            return <div style={{ width: '40px' }}>{text}</div>;
          },
        },

        /* 胎儿超声 */
        {
          title: '胎儿超声',
          fixedKey: 'childUltrasounds',
          children: [
            {
              key: 'childUltrasounds.resetBpd',
              fixedKey: 'childUltrasounds.resetBpd',
              title: 'BPD',
              width: 68,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
            {
              key: 'childUltrasounds.fetalweight',
              fixedKey: 'childUltrasounds.fetalweight',
              title: '体重',
              width: 68,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
            {
              key: 'childUltrasounds.afv',
              fixedKey: 'childUltrasounds.afv',
              title: 'AFV',
              width: 68,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
            {
              key: 'childUltrasounds.ubf',
              fixedKey: 'childUltrasounds.ubf',
              title: '脐血流',
              width: 68,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
          ],
        },

        /* 妊娠糖尿病 */
        {
          title: 'GDM',
          fixedKey: 'gdm',
          children: [
            {
              key: 'gdm.fbg',
              fixedKey: 'gdm.fbg',
              title: 'FBG',
              width: 50,
              editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' }, unEditable: true },
            },
            {
              key: 'gdm.pbg2',
              fixedKey: 'gdm.pbg2',
              title: 'P2BG',
              width: 50,
              editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' }, unEditable: true },
            },
            {
              key: 'gdm.hbalc',
              fixedKey: 'gdm.hbalc',
              title: 'HbA1C',
              width: 50,
              editor: { name: '', key: '', input_type: 'input' },
            },
          ],
        },

        {
          key: 'gdm.inslname',
          fixedKey: 'gdm.inslname',
          title: '胰岛素方案',
          width: 120,
          editor: { name: '', key: '', input_type: 'input' },
        },
        // {
        //   title: '胰岛素方案',
        //   fixedKey: 'resetIns',
        //   children: [
        //     {
        //       key: 'resetInsb',
        //       fixedKey: 'resetInsb',
        //       title: '早',
        //       width: 40,
        //       editor: { name: '', key: '', input_type: 'input', unEditable: true },
        //     },
        //     {
        //       key: 'resetInsl',
        //       fixedKey: 'resetInsl',
        //       title: '中',
        //       width: 40,
        //       editor: { name: '', key: '', input_type: 'input', unEditable: true },
        //     },
        //     {
        //       key: 'resetInsd',
        //       fixedKey: 'resetInsd',
        //       title: '晚',
        //       width: 40,
        //       editor: { name: '', key: '', input_type: 'input', unEditable: true },
        //     },
        //     {
        //       key: 'resetInss',
        //       fixedKey: 'resetInss',
        //       title: '睡前',
        //       width: 40,
        //       editor: { name: '', key: '', input_type: 'input', unEditable: true },
        //     },
        //   ],
        // },

        /* 妊娠高血压 */
        {
          title: '尿蛋白',
          fixedKey: 'pih',
          children: [
            {
              key: 'pih.quality',
              fixedKey: 'pih.quality',
              title: '定性',
              width: 40,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
            {
              key: 'pih.quantity',
              fixedKey: 'pih.quantity',
              title: '24H定量',
              width: 40,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
            {
              key: 'pih.medication',
              fixedKey: 'pih.medication',
              title: '用药方案',
              width: 100,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
          ],
        },

        /* 心脏病 */
        // {
        //   title: '心率特征',
        //   fixedKey: 'pvCardiacDisease',
        //   children: [
        //     {
        //       key: 'pvCardiacDisease.heartrate',
        //       fixedKey: 'pvCardiacDisease.heartrate',
        //       title: '心率',
        //       width: 30,
        //       editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' }, unEditable: true },
        //     },
        //     {
        //       key: 'pvCardiacDisease.otherNote',
        //       fixedKey: 'pvCardiacDisease.otherNote',
        //       title: '其他异常特征',
        //       width: 80,
        //       editor: { name: '', key: '', input_type: 'input', unEditable: true },
        //     },
        //     {
        //       key: 'pvCardiacDisease.medication',
        //       fixedKey: 'pvCardiacDisease.medication',
        //       title: '用药情况',
        //       width: 100,
        //       editor: { name: '', key: '', input_type: 'input', unEditable: true },
        //     },
        //   ],
        // },
        {
          key: 'cardiacDisease.heartrate',
          fixedKey: 'cardiacDisease.heartrate',
          title: '心率',
          width: 30,
          editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' }, unEditable: true },
        },
        {
          key: 'cardiacDisease.otherNote',
          fixedKey: 'cardiacDisease.otherNote',
          title: '其他异常特征',
          width: 80,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
        },
        {
          key: 'cardiacDisease.medication',
          fixedKey: 'cardiacDisease.medication',
          title: '用药情况',
          width: 100,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
        },

        /* ICP */
        {
          title: 'ICP',
          fixedKey: 'icp',
          children: [
            {
              key: 'icp.tba',
              fixedKey: 'icp.tba',
              title: 'TBA',
              width: 30,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
            {
              key: 'icp.alt',
              fixedKey: 'icp.alt',
              title: 'ALT',
              width: 30,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
            {
              key: 'icp.ast',
              fixedKey: 'icp.ast',
              title: 'AST',
              width: 30,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
          ],
        },

        /* 甲减 */
        {
          title: '甲减',
          fixedKey: 'hypothyroidism',
          children: [
            {
              key: 'hypothyroidism.tsh',
              fixedKey: 'hypothyroidism.tsh',
              title: 'TSH',
              width: 30,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
            {
              key: 'hypothyroidism.t4',
              fixedKey: 'hypothyroidism.t4',
              title: '游离T4',
              width: 30,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
          ],
        },

        {
          key: 'chiefComplaint',
          title: '主诉',
          width: 200,
          editor: { name: '', key: '', input_type: 'input', input_props: { type: 'textarea' }, unEditable: true },
        },
        {
          key: 'inspection',
          title: '检验检查',
          width: 200,
          editor: { name: '', key: '', input_type: 'input', input_props: { type: 'textarea' }, unEditable: true },
        },
        {
          key: 'prescription',
          title: '处理措施',
          // width: 200,
          editor: { name: '', key: '', input_type: 'input', input_props: { type: 'textarea' }, unEditable: true },
        },
        {
          key: 'resetAppoint',
          title: '下次复诊',
          width: 68,
          editor: { name: '', key: '', input_type: 'date', unEditable: true },
        },
        {
          key: 'doctorName',
          title: '医生',
          width: 68,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
        },
      ],
    },
  },
];
export const printConfig: Array<FormConfig> = [
  {
    name: 'visitsList',
    key: '.*',
    label: '',
    input_type: 'prenatalReturnTable',
    input_props: {
      editable: false,
      hiddenBtn: true,
      hiddenSelection: false,
      tableColumns: [
        {
          key: 'visitDate',
          title: '日期',
          width: 98,
          editor: { name: '', key: '', input_type: 'date', unEditable: true },
          render: (text, record, index) => {
            return <div style={{ width: '60px' }}>{formatTimeToStandard(text, 'YY-MM-DD')}</div>;
          },
        },
        {
          key: 'gestationalWeek',
          title: '孕周',
          width: 68,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
        },
        {
          key: 'physicalExam.weight',
          title: '体重',
          suffix: 'kg',
          suffixNewLine: true,
          width: 68,
          editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' }, unEditable: true },
        },
        {
          key: 'resetLic',
          title: '血压',
          suffix: 'mmHg',
          suffixNewLine: true,
          width: 68,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
        },
        {
          key: 'pulse',
          title: '脉搏',
          suffix: '次/分',
          suffixNewLine: true,
          width: 68,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
        },
        {
          key: 'gynExam.fundalHeight',
          title: '宫高',
          suffix: 'cm',
          suffixNewLine: true,
          width: 68,
          editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' }, unEditable: true },
        },
        {
          key: 'gynExam.waistHip',
          title: '腹围',
          suffix: 'cm',
          suffixNewLine: true,
          width: 68,
          editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' }, unEditable: true },
        },
        {
          key: 'edema',
          title: '下肢水肿',
          width: 68,
          editor: {
            name: 'edema',
            key: 'edema',
            input_type: 'select',
            input_props: { options: otherOptions.edemaOptions },
            unEditable: true,
          },
          selectOptions: otherOptions.edemaOptions,
        },

        /* 胎儿信息 */
        {
          key: 'resetTaix',
          title: '胎心率',
          suffix: 'bpm',
          suffixNewLine: true,
          width: 68,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
        },
        {
          key: 'resetXianl',
          title: '先露',
          width: 68,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
        },

        /* 胎儿超声 */
        {
          title: '胎儿超声',
          fixedKey: 'childUltrasounds',
          children: [
            {
              key: 'childUltrasounds.resetBpd',
              fixedKey: 'childUltrasounds.resetBpd',
              title: 'BPD',
              width: 68,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
            {
              key: 'childUltrasounds.fetalweight',
              fixedKey: 'childUltrasounds.fetalweight',
              title: '体重',
              width: 68,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
            {
              key: 'childUltrasounds.afv',
              fixedKey: 'childUltrasounds.afv',
              title: 'AFV',
              width: 68,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
            {
              key: 'childUltrasounds.ubf',
              fixedKey: 'childUltrasounds.ubf',
              title: '脐血流',
              width: 68,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
          ],
        },

        /* 妊娠糖尿病 */
        {
          title: 'OGTT',
          fixedKey: 'gdm',
          children: [
            {
              key: 'gdm.fbg',
              fixedKey: 'gdm.fbg',
              title: 'FBG',
              width: 68,
              editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' }, unEditable: true },
            },
            {
              key: 'gdm.pbg2',
              fixedKey: 'gdm.pbg2',
              title: 'P2BG',
              width: 68,
              editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' }, unEditable: true },
            },
            {
              key: 'gdm.hbalc',
              fixedKey: 'gdm.hbalc',
              title: 'HbA1C',
              width: 68,
              editor: { name: '', key: '', input_type: 'input' },
            },
          ],
        },

        {
          key: 'gdm.inslname',
          fixedKey: 'gdm.inslname',
          title: '胰岛素方案',
          width: 120,
          editor: { name: '', key: '', input_type: 'input' },
        },
        // {
        //   title: '胰岛素方案',
        //   fixedKey: 'resetIns',
        //   children: [
        //     {
        //       key: 'resetInsb',
        //       fixedKey: 'resetInsb',
        //       title: '早',
        //       width: 40,
        //       editor: { name: '', key: '', input_type: 'input', unEditable: true },
        //     },
        //     {
        //       key: 'resetInsl',
        //       fixedKey: 'resetInsl',
        //       title: '中',
        //       width: 40,
        //       editor: { name: '', key: '', input_type: 'input', unEditable: true },
        //     },
        //     {
        //       key: 'resetInsd',
        //       fixedKey: 'resetInsd',
        //       title: '晚',
        //       width: 40,
        //       editor: { name: '', key: '', input_type: 'input', unEditable: true },
        //     },
        //     {
        //       key: 'resetInss',
        //       fixedKey: 'resetInss',
        //       title: '睡前',
        //       width: 40,
        //       editor: { name: '', key: '', input_type: 'input', unEditable: true },
        //     },
        //   ],
        // },

        /* 妊娠高血压 */
        {
          title: '尿蛋白',
          fixedKey: 'pih',
          children: [
            {
              key: 'pih.quality',
              fixedKey: 'pih.quality',
              title: '定性',
              width: 50,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
            {
              key: 'pih.quantity',
              fixedKey: 'pih.quantity',
              title: '24H定量',
              width: 50,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
            {
              key: 'pih.medication',
              fixedKey: 'pih.medication',
              title: '用药方案',
              width: 100,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
          ],
        },

        /* 心脏病 */
        // {
        //   title: '心率特征',
        //   fixedKey: 'pvCardiacDisease',
        //   children: [
        //     {
        //       key: 'pvCardiacDisease.heartrate',
        //       fixedKey: 'pvCardiacDisease.heartrate',
        //       title: '心率',
        //       width: 50,
        //       editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' }, unEditable: true },
        //     },
        //     {
        //       key: 'pvCardiacDisease.otherNote',
        //       fixedKey: 'pvCardiacDisease.otherNote',
        //       title: '其他异常特征',
        //       width: 80,
        //       editor: { name: '', key: '', input_type: 'input', unEditable: true },
        //     },
        //     {
        //       key: 'pvCardiacDisease.medication',
        //       fixedKey: 'pvCardiacDisease.medication',
        //       title: '用药情况',
        //       width: 100,
        //       editor: { name: '', key: '', input_type: 'input', unEditable: true },
        //     },
        //   ],
        // },
        {
          key: 'cardiacDisease.heartrate',
          fixedKey: 'cardiacDisease.heartrate',
          title: '心率',
          width: 50,
          editor: { name: '', key: '', input_type: 'input', input_props: { type: 'number' }, unEditable: true },
        },
        {
          key: 'cardiacDisease.otherNote',
          fixedKey: 'cardiacDisease.otherNote',
          title: '其他异常特征',
          width: 80,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
        },
        {
          key: 'cardiacDisease.medication',
          fixedKey: 'cardiacDisease.medication',
          title: '用药情况',
          width: 100,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
        },

        /* ICP */
        {
          title: 'ICP',
          fixedKey: 'icp',
          children: [
            {
              key: 'icp.tba',
              fixedKey: 'icp.tba',
              title: 'TBA',
              width: 50,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
            {
              key: 'icp.alt',
              fixedKey: 'icp.alt',
              title: 'ALT',
              width: 50,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
            {
              key: 'icp.ast',
              fixedKey: 'icp.ast',
              title: 'AST',
              width: 50,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
          ],
        },

        /* 甲减 */
        {
          title: '甲减',
          fixedKey: 'hypothyroidism',
          children: [
            {
              key: 'hypothyroidism.tsh',
              fixedKey: 'hypothyroidism.tsh',
              title: 'TSH',
              width: 50,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
            {
              key: 'hypothyroidism.t4',
              fixedKey: 'hypothyroidism.t4',
              title: '游离T4',
              width: 50,
              editor: { name: '', key: '', input_type: 'input', unEditable: true },
            },
          ],
        },

        {
          key: 'chiefComplaint',
          title: '主诉',
          // width: 100,
          editor: { name: '', key: '', input_type: 'input', input_props: { type: 'textarea' }, unEditable: true },
        },
        {
          key: 'inspection',
          title: '检验检查',
          width: 200,
          editor: { name: '', key: '', input_type: 'input', input_props: { type: 'textarea' }, unEditable: true },
        },
        {
          key: 'prescription',
          title: '处理措施',
          width: 200,
          editor: { name: '', key: '', input_type: 'input', input_props: { type: 'textarea' }, unEditable: true },
        },
        {
          key: 'resetAppoint',
          title: '下次复诊',
          width: 85,
          editor: { name: '', key: '', input_type: 'date', unEditable: true },
        },
        {
          key: 'doctorName',
          title: '医生',
          width: 68,
          editor: { name: '', key: '', input_type: 'input', unEditable: true },
        },
      ],
    },
  },
];
