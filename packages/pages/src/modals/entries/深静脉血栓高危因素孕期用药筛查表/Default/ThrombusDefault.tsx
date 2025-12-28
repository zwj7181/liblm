import { IGlobalModalProps } from '@lm_fe/components';
import { IMchc_Doctor_PreRiskAssessmentInfo, IMchc_TemplateTree_Item, SMchc_Doctor, SMchc_TemplateTrees, TIdTypeCompatible } from '@lm_fe/service';
import { Button, Col, Modal, Row, Space } from 'antd';
import { DataNode } from 'antd/lib/tree';
import classNames from 'classnames';
import { filter, forEach, get, includes, isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import styles from './index.module.less';
import React from 'react';
import { LoadingPlaceholder } from '@lm_fe/components_m';
import { LazyAntd } from '@lm_fe/components';
import { mchcEnv } from '@lm_fe/env';
import { fuck_sign_doctor, fuck_sign_user, fuck_user_info } from '../../子痫前期风险评估表/utils';
import { IThrombusProps } from '../types';

const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd



export function ThrombusDefault(props: IThrombusProps) {

  const { modal_data, close, ...others } = props;
  const { headerInfo, } = modal_data;


  const printTableRef = useRef<HTMLDivElement>(null)
  const [treeFactor, setTreeFactor] = useState<IMchc_TemplateTree_Item[]>([])
  const [treeGuide, setTreeGuide] = useState<IMchc_TemplateTree_Item[]>([])
  const [factorKeys, setFactorKeys] = useState<string[]>([])
  const [guideKeys, setGuideKeys] = useState<string[]>([])
  const pregnancyId = headerInfo?.id

  useEffect(() => {


    (async () => {

      const treeFactor = await SMchc_TemplateTrees.getTemplateTree(31);
      const treeGuide = await SMchc_TemplateTrees.getTemplateTree(32);
      const selecteFactor = await SMchc_TemplateTrees.findAlertAssessment(31, pregnancyId);
      const selecteGuide = await SMchc_TemplateTrees.findAlertAssessment(32, pregnancyId);

      const factorValue = get(selecteFactor, 'value') || [];
      const factorKeys: string[] = [];
      forEach(factorValue, (item) => factorKeys.push(String(item.id)));
      const guideValue = get(selecteGuide, 'value') || [];
      const guideKeys: string[] = [];
      forEach(guideValue, (item) => guideKeys.push(String(item.id)));


      await fuck_auto_check(treeFactor, factorKeys)

      setTreeFactor(treeFactor)
      setTreeGuide(treeGuide)
      setFactorKeys(factorKeys)
      setGuideKeys(guideKeys)
    })()

  }, [])
  async function fuck_auto_check(factor: IMchc_TemplateTree_Item[], keys: string[]) {
    return
    const info = await SMchc_Doctor.getPreRiskAssessmentInfo(pregnancyId);


    /**自动勾选项判断*/
    const bmi = get(info, 'bmi');
    const futureAge = get(info, 'eddAge');
    const parity = get(info, 'parity');
    const diagnosesList = get(info, 'diagnoses')
    const familyHistoryOtherNote = get(info, 'familyHistoryOrderNote') || '';
    const smoke = get(info, 'smoke');
    const conceiveMode = get(info, 'conceiveMode');


    if (bmi > 30) keys.push(getTreeId('肥胖(BMI>30kg/㎡)', factor));
    if (futureAge >= 35) keys.push(getTreeId('年龄>=35岁', factor));
    if (parity >= 3) keys.push(getTreeId('产次≥3', factor));
    if (smoke) keys.push(getTreeId('吸烟', factor));
    if (conceiveMode === 1) keys.push(getTreeId('IVF/ART', factor));
    forEach(diagnosesList, (item) => {
      if (
        item.diagnosis.indexOf('肿瘤') !== -1 ||
        item.diagnosis.indexOf('癌') !== -1 ||
        item.diagnosis.indexOf('心衰') !== -1 ||
        item.diagnosis.indexOf('心力衰竭') !== -1 ||
        item.diagnosis.indexOf('狼疮') !== -1 ||
        item.diagnosis.indexOf('SLE') !== -1 ||
        item.diagnosis.indexOf('肠炎') !== -1 ||
        item.diagnosis.indexOf('肠道感染') !== -1 ||
        item.diagnosis.indexOf('镰状细胞病') !== -1 ||
        item.diagnosis.indexOf('镰状细胞疾患') !== -1 ||
        item.diagnosis.indexOf('多关节炎') !== -1 ||
        item.diagnosis.indexOf('多关节型关节炎') !== -1 ||
        item.diagnosis.indexOf('肾病综合征') !== -1
      ) {
        keys.push(
          getTreeId(
            '内科合并症：\r\n 肿瘤、心衰、狼疮活动\r\n 炎症性肠病、镰状细胞病、炎性多关节病\r\n 肾病综合征、1型糖尿病合并肾病',
            factor,
          ),
        );
      }
      if (
        item.diagnosis.indexOf('1型糖尿病') !== -1 &&
        item.diagnosis.indexOf('肾') !== -1 &&
        item.diagnosis.indexOf('胎') == -1
      ) {
        keys.push(
          getTreeId(
            '内科合并症：\r\n 肿瘤、心衰、狼疮活动\r\n 炎症性肠病、镰状细胞病、炎性多关节病\r\n 肾病综合征、1型糖尿病合并肾病',
            factor,
          ),
        );
      }
      if (item.diagnosis.indexOf('子痫前期') !== -1) {
        keys.push(getTreeId('本次妊娠子痫前期', factor));
      }
      if (item.diagnosis.indexOf('静脉曲张') !== -1) {
        keys.push(getTreeId('静脉曲张', factor));
      }
      if (item.diagnosis.indexOf('截瘫') !== -1) {
        keys.push(getTreeId('不能活动如截瘫或者长时间制动者', factor));
      }
      if (
        familyHistoryOtherNote.indexOf('栓') !== -1 ||
        familyHistoryOtherNote.indexOf('梗') !== -1 ||
        familyHistoryOtherNote.indexOf('VTE') !== -1
      ) {
        keys.push(getTreeId('VTE家族史', factor));
      }
      if (
        item.diagnosis.indexOf('双胎妊娠') !== -1 ||
        item.diagnosis.indexOf('三胎妊娠') !== -1 ||
        item.diagnosis.indexOf('四胎妊娠') !== -1 ||
        item.diagnosis.indexOf('五胎妊娠') !== -1 ||
        item.diagnosis.indexOf('多胎妊娠') !== -1
      ) {
        keys.push(getTreeId('多胎妊娠', factor));
      }
    });


  }

  function getTreeId(val: string, treeData: any) {
    let treeId = '';
    forEach(treeData, (item) => {
      if (item.val === val) treeId = item.id;
    });
    return String(treeId);
  };

  function handleCheckFactor(keys: any) {
    forEach(treeFactor, (item: any) => {
      if (keys.includes(String(item.id))) {
        item.selected = true;
      } else {
        item.selected = null;
      }
    });
    setFactorKeys(keys)
    setTreeFactor(treeFactor)
  };

  function handleCheckGuide(keys: any) {
    forEach(treeGuide, (item: any) => {
      if (keys.includes(String(item.id))) {
        item.selected = true;
      } else {
        item.selected = null;
      }
    });
    setGuideKeys(keys)
    setTreeGuide(treeGuide)
  };

  function handleCancel() {


    close?.(false);
  };

  async function handleOk() {


    const filterFactor = filter(treeFactor, (item: any) => includes(factorKeys, String(item.id)));
    const factorData = { pregnancyId, type: 31, value: filterFactor, templateId: null };
    await SMchc_TemplateTrees.saveAlertAssessment(factorData);

    const filterGuide = filter(treeGuide, (item: any) => includes(guideKeys, String(item.id)));
    const guideData = { pregnancyId, type: 32, value: filterGuide, templateId: null };
    await SMchc_TemplateTrees.saveAlertAssessment(guideData);


    close?.(true);
  };

  function transferTemplateData(data: IMchc_TemplateTree_Item[], pid = 0) {
    const treeData: DataNode[] = [];
    data.forEach((item) => {
      const _item: DataNode = { key: String(item.id) }
      if (item.pid === pid) {
        _item.style = { padding: `${item.depid}px 0`, }
        _item.className = classNames({ [styles['tree-title']]: item.pid === 0 }, { [styles['active-item']]: item.active });
        _item.title = item.val;
        _item.key = String(item.id)

        _item.children = transferTemplateData(data, item.id);
        if (isEmpty(_item.children)) {
          _item.isLeaf = true;
        } else {
          _item.isLeaf = false;
        }
        treeData.push(_item);
      }
    });
    return treeData;
  };

  const treeFactorNodes = transferTemplateData(treeFactor);
  const treeGuideNodes = transferTemplateData(treeGuide);
  const footer = [
    <>
      {/* <p className={styles["footer-tips"]}>
        《2015RCOG降低妊娠及产褥期静脉血栓栓塞的风险》附录1 Obstetric thromboprophylaxis risk assessment and
        management
      </p> */}
      <Space>
        <Button onClick={handleCancel}>取消</Button>
        <Button type="primary" onClick={handleOk}>
          确定
        </Button>
        <ReactToPrint
          trigger={() => (
            <div>
              <Button type="primary">打印</Button>
            </div>
          )}
          /*为了获取更新数据后的页面*/
          onBeforeGetContent={async () => {
            setTimeout(() => { }, 100);
          }}
          content={() => printTableRef.current}
        />
      </Space>
    </>,
  ];

  return (
    <Modal
      {...others}
      className={styles["screening-modal"]}
      title="深静脉血栓高危因素孕期用药筛查表"
      width={960}
      onCancel={handleCancel}
      footer={footer}
      maskClosable={false}
    >
      {
        treeFactor.length
          ? <Row>
            <Col span={12} className={styles["tree-left"]}>
              <Tree
                key={treeFactorNodes}
                checkable
                defaultExpandAll={true}
                checkedKeys={factorKeys}
                onCheck={handleCheckFactor}
                treeData={treeFactorNodes}
              />
            </Col>
            <Col span={11} offset={1} className={styles["tree-right"]}>
              <Tree
                key={treeGuideNodes}
                checkable
                defaultExpandAll={true}
                checkedKeys={guideKeys}
                onCheck={handleCheckGuide}
                treeData={treeGuideNodes}
              />
            </Col>
          </Row>
          : <LoadingPlaceholder />
      }
      <div style={{ display: 'none' }}>
        <div style={{ marginTop: '28px' }} ref={printTableRef} className={styles["printscreening"]}>
          <h2 style={{ textAlign: 'center' }}>深静脉血栓高危因素孕期用药筛查表</h2>
          {fuck_user_info(headerInfo)}
          <Row>
            <Col span={12} className={styles["tree-left"]}>
              <Tree
                key={treeFactorNodes}
                checkable
                defaultExpandAll={true}
                checkedKeys={factorKeys}
                treeData={treeFactorNodes}
              />
            </Col>
            <Col span={11} offset={1} className={styles["tree-right"]}>
              <Tree
                key={treeGuideNodes}
                checkable
                defaultExpandAll={true}
                checkedKeys={guideKeys}
                treeData={treeGuideNodes}
              />
            </Col>
          </Row>
          <div style={{ display: mchcEnv.in(['越秀妇幼']) ? 'block' : 'none', lineHeight: 2.6, pageBreakBefore: 'always', padding: '48px 24px' }}>
            <div>患者知情选择</div>
            <div>1.我的医生已经告知我的病情将要采取的静脉血栓栓塞症的预防性抗凝治疗措施、治疗中需要注意的事项、该治疗及可能发生的并发症和风险、可能存在的其它治疗方法并且解答了我关于该治疗的相关问题。我理解我的治疗需要多位医生共同进行。我并未得到治疗百分之百成功的许诺。</div>
            <div>2.我明白在治疗中，在不可预见的情况下，可能需要其它附加操作或变更诊疗方案，我授权医师在遇有紧急情况时，为保障患者的生命安全实施必要的救治措施，我保证承担全部所需费用。</div>
            <div>3.我明白在治疗开始之前，我可以随时签署拒绝医疗的意见，以取消本同意书的决定。</div>
            <div>4.我已详细阅读以上内容，对医师详细告知的各种风险表示完全理解，经慎重考虑，我同意进行静脉血栓栓塞症的预防性抗凝治疗。</div>

            {
              fuck_sign_user()
            }
            <div>我已告知患者病情、静脉血栓栓塞症的预防性抗凝治疗措施及治疗后可能发生的并发症和风险、可能存在的其他治疗方法并且解答了患者关于该治疗的相关问题。</div>
            {
              fuck_sign_doctor()
            }
          </div>
        </div>
      </div>
    </Modal>
  );
}




