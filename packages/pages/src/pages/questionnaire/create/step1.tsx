import { MyIcon } from '@lm_fe/components';
import { mchcEnv } from '@lm_fe/env';
import { IMchc_Questionnaire } from '@lm_fe/service';
import { identity } from '@lm_fe/utils';
import { Card, Checkbox, List } from 'antd';
import React from 'react';
import { TSelectCb } from '../types';
import styles from './step1.module.less';
const itemBgColors = ['#FFEFDD', '#FBDDDD', '#DDF3FB', '#DDFBE4', '#E8DDFB'];
interface IProps {
  handleInitQuestions: (item: Partial<IMchc_Questionnaire>, isCopy?: boolean, step?: number) => void
  onDeleteTemplate: (item: IMchc_Questionnaire) => void
  templateList: IMchc_Questionnaire[]

  selected?: IMchc_Questionnaire[]
  onSelect?: TSelectCb
}
export function Step1(props: IProps) {

  const { handleInitQuestions, templateList, onDeleteTemplate, selected = [], onSelect } = props;



  function handleNewTemplate() {
    handleInitQuestions({});
  };

  return (
    <div className={styles["follow-up-step1"]}>
      <List
        rowKey={item => item?.id || -1}
        grid={{ gutter: 24, column: 4 }}
        dataSource={[null, ...templateList]}
        renderItem={(item, idx) => {
          const selected_idx = selected.findIndex(s => s.id === item?.id)
          return item ? (
            <List.Item key={item.id}>
              <Card
                hoverable
                bodyStyle={{ paddingBottom: 20 }}
                // onClick={() => {
                //   handleInitQuestions(item);
                // }}
                cover={
                  <div
                    className={styles["item-top"]}
                    style={{ backgroundColor: itemBgColors[idx % 5] || '#FFEFDD' }}
                  >
                    <img className={styles["item-top-img"]} src={mchcEnv.gs(_ => _.lm_imgs.qn['questionnaire-item-top.png'])} alt="" />
                  </div>
                }
                actions={[
                  <div onClick={() => handleInitQuestions(item)}>
                    <MyIcon value='EditOutlined' key="edit" />
                    编辑
                  </div>,
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInitQuestions(item, true);
                    }}
                  >
                    <MyIcon value='CopyOutlined' key="copy" />
                    复制
                  </div>,
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteTemplate(item);
                    }}
                  >
                    <MyIcon value='DeleteOutlined' key="delete" />
                    删除
                  </div>,
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInitQuestions(item, false, 3);
                    }}
                  >
                    <MyIcon value='PieChartOutlined' key="delete" />
                    统计
                  </div>,
                  onSelect
                    ? <div onClick={e => onSelect(item)}>
                      <Checkbox checked={selected_idx > -1} />
                    </div>
                    : null,
                ].filter(identity)}
              >
                <Card.Meta style={{ cursor: 'pointer' }} title={item.questionnaireTitle} description={<div title={item.description} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.description}</div>} />
              </Card>
            </List.Item>
          ) : (
            <List.Item>
              <div className={styles["follow-up-new-item"]} onClick={handleNewTemplate}>
                {/* <CustomIcon type="icon-and" /> */}
                <span>新建调查问卷</span>
              </div>
            </List.Item>
          )
        }
        }
      />
    </div>
  );
}
export default Step1;
