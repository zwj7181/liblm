import { IGlobalModalProps } from '@lm_fe/components';
import { IMchc_Doctor_OutpatientHeaderInfo, IMchc_TemplateTree_Item, SMchc_TemplateTrees, TIdTypeCompatible } from '@lm_fe/service';
import { Button, Modal, Space } from 'antd';
import { DataNode } from 'antd/lib/tree';
import { forEach, isEmpty } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import styles from './index.module.less';

import { LazyAntd } from '@lm_fe/components';
import React from 'react';
import { mchcEnv } from '@lm_fe/env';
import { fuck_sign_doctor, fuck_sign_user, fuck_user_info } from '../子痫前期风险评估表/utils';

const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd


const TYPE = 33

function Index(props: IGlobalModalProps<{ headerInfo: IMchc_Doctor_OutpatientHeaderInfo }>) {

  const { modal_data, close, ...others } = props
  const { headerInfo, } = modal_data
  const [treeToalc, setTreeToalc] = useState<IMchc_TemplateTree_Item[]>([]);
  const [toalcKeys, setToalcKeys] = useState<string[]>([]);

  const printTableRef = useRef<HTMLDivElement>(null)
  const pregnancyId = headerInfo.id
  useEffect(() => {

    (async () => {


      const _treeToalc = await SMchc_TemplateTrees.getTemplateTree(TYPE);
      const selecteToalc = await SMchc_TemplateTrees.findAlertAssessment(TYPE, pregnancyId);

      const toalcValue = selecteToalc.value ?? [];
      const _toalcKeys = toalcValue.map(_ => String(_.id))


      setTreeToalc(_treeToalc)
      setToalcKeys(_toalcKeys)

    })()
    return () => {

    }
  }, [])



  function handleCheck(keys: any) {

    forEach(treeToalc, (item: any) => {
      if (keys.includes(String(item.id))) {
        item.selected = true;
      } else {
        item.selected = null;
      }
    });
    setToalcKeys(keys)
    setTreeToalc([...treeToalc])
  };


  async function handleOk() {




    const filterData = treeToalc.filter(item => toalcKeys.includes(String(item.id)));
    const data = { pregnancyId, type: TYPE, value: filterData.length ? filterData : undefined, templateId: null };

    if (filterData.length == 0) {
      await SMchc_TemplateTrees.deleteHighrisk(data);

    } else {
      await SMchc_TemplateTrees.saveAlertAssessment(data);
    }


    close?.(true);
  };

  function transferTemplateData(data: IMchc_TemplateTree_Item[], pid = 0) {
    const treeData: DataNode[] = [];
    data.forEach((item) => {

      if (item.pid === pid) {
        const tmpData: DataNode = { key: String(item.id) }

        if (item.pid === 0) tmpData.className = styles['tree-title'];
        tmpData.title = item.val;
        tmpData.key = String(item.id);
        tmpData.children = transferTemplateData(data, item.id);
        if (isEmpty(tmpData.children)) {
          tmpData.isLeaf = true;
        } else {
          tmpData.isLeaf = false;
        }
        treeData.push(tmpData);
      }
    });
    return treeData;
  };
  function renderFooter() {
    return (
      <Space style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button key="back" onClick={() => close?.(false)}>
          取消
        </Button>
        <Button key="submit" type="primary" onClick={handleOk}>
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
    );
  }


  const treeData = transferTemplateData(treeToalc);
  return (
    <Modal
      {...others}
      className={styles["tolac-modal"]}
      title="瘢痕子宫阴道试产表"

      width={800}

      onOk={handleOk}
      maskClosable={false}
      footer={renderFooter()}
    >
      {!!treeToalc.length && (
        <Tree checkable defaultExpandAll checkedKeys={toalcKeys} treeData={treeData} onCheck={handleCheck} />
      )}
      <div style={{ display: 'none' }}>
        <div style={{ marginTop: '28px' }} ref={printTableRef} className={styles['printtoalc']}>
          <h2 style={{ textAlign: 'center' }}>瘢痕子宫阴道试产表</h2>
          {fuck_user_info(headerInfo)}
          {!!treeToalc.length && (
            <Tree checkable defaultExpandAll checkedKeys={toalcKeys} treeData={treeData} onCheck={handleCheck} />
          )}
          <div style={{ display: mchcEnv.in(['越秀妇幼']) ? 'block' : 'none', lineHeight: 2.6, pageBreakBefore: 'always', padding: '48px 24px' }}>
            <div>患者知情选择</div>
            <div>1、医生已告知我关于癜痕子宫的介绍、目前孕产妇的情况及可采取的分娩方式。</div>
            <div>2、我同意医生根据孕产妇情况而要采取的分娩方式。</div>
            <div>3、我并未得到百分之百成功的许诺。</div>
            <div>4.我已详细阅读以上内容，对医师详细告知的各种风险表示完全理解。</div>


            {
              fuck_sign_user()
            }
            <div>我已告知孕产妇及孕产妇亲属或授权关系人关于癜痕子宫的介绍，目前孕产妇的情况及可采取的分娩方式。</div>
            {
              fuck_sign_doctor()
            }
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default Index;
