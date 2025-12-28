import { SelectTip } from '@lm_fe/pages';
import { Button, Card, Col, Form, List, message, Popconfirm, Row, Space } from 'antd';
import { filter, first, get, isEmpty, map, set, values } from 'lodash';
import { useEffect, useState } from 'react';

import { FormSection, MyIcon } from '@lm_fe/components_m';
import { mchcEnv } from '@lm_fe/env';
import { IMchc_FormDescriptions_Field_Nullable, mchcEnums } from '@lm_fe/service';
import { AnyObject, getSearchParamsValue, request, safe_json_parse_arr, safe_json_stringify } from '@lm_fe/utils';
import classnames from 'classnames';
import moment from 'moment';
import './index.less';
import { IDoctorEnd_QQProps } from './types';

const EQuestionType = mchcEnums.Questionnaire.type
const formItemLayout = {

  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}
export default function BirthPlan(props: IDoctorEnd_QQProps) {
  const { id, } = props;
  const pregnancyId = getSearchParamsValue('id') || id;

  const [form] = Form.useForm()
  const [modalForm] = Form.useForm()
  const [siderPanels, set_siderPanels] = useState<AnyObject[]>([])
  const [activeItem, set_activeItem] = useState<AnyObject>({})
  const [allBirthPlan, set_allBirthPlan] = useState([])
  const [formDescriptions, set_formDescriptions] = useState(null)
  const [formObj, set_formObj] = useState(null)
  const [originFormFieldsValue, set_originFormFieldsValue] = useState({})
  const [propaganda, set_propaganda] = useState<AnyObject>({})
  const [loading, set_loading] = useState(false)


  useEffect(() => {


    getBirthPlanDescriptions()
    initData()
    return () => {

    }
  }, [])

  async function initData() {

    const siderPanels = await getBirthPlanList();
    const resultItem = first(first(values(siderPanels))) || {};
    handleClickListItem(resultItem);
  }
  async function getBirthPlanDescriptions() {
    const res: any = (await request.get(`/api/pnc/midwife/getPncMidwifePropaganda?visitType=1`)).data
    let groupJsonArr = safe_json_parse_arr(get(res, 'groupJson'))
    let questionIndexList = get(groupJsonArr[0], 'questionIndexList') // 排序的questionIndex
    let formDescriptions = formatQuestionListToFormDescriptions(res.questionList, questionIndexList)
    console.log('formDescriptions', formDescriptions)
    set_formDescriptions(formDescriptions)
    set_propaganda(res)
  }
  function formatQuestionListToFormDescriptions(questionList: any, questionIndexList: Array<number>) {
    // 通过questionIndex进行排序
    let arr: IMchc_FormDescriptions_Field_Nullable[] = []
    questionList.sort((a, b) => {
      // 根据questionIndex进行排序
      return questionIndexList.indexOf(a.questionIndex) - questionIndexList.indexOf(b.questionIndex);
    })
    questionList.map((question: any) => {
      const labelType = EQuestionType.getLabel(question.questionType)
      let logic = question.logic || {}
      let deps = undefined;
      if (logic.bind) {
        let bind = logic.bind; // 题目绑定的index
        let depQuestion = filter(questionList, dep => {
          return dep.questionIndex == bind
        })[0]
        deps = {
          [depQuestion.id]: map(logic.selectOption, select => {
            return select + 1000
          })
        }
      }
      console.log('deps', deps)
      if (labelType == '多选题') {
        let option = question.questionOptionList.map(data => {
          return { label: data.optionTitle, value: data.optionIndex }
        })
        arr.push({
          name: question.id,
          label: question.questionTitle,
          inputType: 'MC',
          layout: '1',
          inputProps: {
            type: 'multiple',
            options: option,
          },
          formItemLayout: formItemLayout,
          required: true,
          showDeps: deps
        })
      }

      if (labelType == '填空题') {
        arr.push({
          name: question.id,
          label: question.questionTitle,
          inputType: 'text_area',
          layout: '1',
          formItemLayout: formItemLayout,
          required: true,
          showDeps: deps
        })
      }
    })
    return arr
  }
  async function getBirthPlanList() {
    const list = (await request.get(`/api/pnc/midwife/getPncMidwifePropagandaResult`,
      {
        params: {
          pregnancyId: pregnancyId,
          visitType: 1 // 分娩计划书传1，母乳喂养传2
        }
      }
    )).data
    const siderPanels = list

    set_allBirthPlan(list)
    set_loading(false)
    set_siderPanels(siderPanels)
    return siderPanels;
  };


  async function handleAdd() {
    const mathRandom = Math.random();
    const nowDate = moment().format('YYYY-MM-DD');
    let newMedicalRecords = [
      {
        id: -mathRandom,
        fillDate: nowDate,
      },
      ...allBirthPlan,
    ];
    const siderPanels = newMedicalRecords

    set_activeItem(
      {
        id: -mathRandom,
      }
    )
    set_siderPanels(siderPanels)
    if (allBirthPlan.length > 0) {
      let lastestItem = await (await request.get(`/api/propaganda/questionnaire/getWriterRecordsDetailById?id=${get(allBirthPlan, '0.id')}`)).data
      setFieldsValueByQuestion(lastestItem)
    }
  };

  async function handleDelete(item: any) {
    if (get(item, 'id') < 0) {
      // 如果id < 0则为临时添加进列表的 直接移除
    } else {
      await request.delete(`/api/pnc-visits/${get(item, 'id')}`);
    }
    if (get(activeItem, 'id') === get(item, 'id')) {

      set_activeItem({})
    }
    getBirthPlanList();
  };

  async function handleClickListItem(item: any) {
    if (get(activeItem, 'id') === get(item, 'id')) return;
    if (get(activeItem, 'id', -1) < 0) {
      // 如果原先处于暂存的诊断
      let formFieldsValue = form?.getFieldsValue();
      set_originFormFieldsValue(formFieldsValue)

    }

    // 判断点的列表是已有的还是新增的
    if (get(item, 'id') < 0) {
      set_activeItem(item)

      form?.setFieldsValue({
        ...originFormFieldsValue,
      });
    } else {
      const newItem = (await request.get(`/api/propaganda/questionnaire/getWriterRecordsDetailById?id=${get(item, 'id')}`)).data;
      set_activeItem(newItem)

      setFieldsValueByQuestion(newItem)

    }
  };
  function setFieldsValueByQuestion(newItem: any) {


    let writeDetailList: any = get(newItem, 'writeDetailList')
    let questionnaireQuestionList = get(newItem, 'questionnaire.questionList') // 问卷的问题
    let finalValue = {}
    writeDetailList.map((writeDetail: any) => {
      let questionType = filter(questionnaireQuestionList, question => {
        return question.id == writeDetail.questionId
      })[0].questionType
      const labelType = EQuestionType.getLabel(questionType)
      let optionIndex: string = get(writeDetail, 'optionIndex')
      let questionResult: string = get(writeDetail, 'questionResult')
      let value = ''
      if (labelType == '填空题') {
        value = questionResult
      }
      if (labelType == '多选题') {
        let optionIndexArr = optionIndex.split(',');
        let valueArr: any = []
        map(optionIndexArr, optionIndex => {
          // 先找到对应的题目
          let questionListDetailArr: any = filter(questionnaireQuestionList, (questionnaireOption: any) => {
            return questionnaireOption.id == writeDetail.questionId
          }) || []

          // 通过题目的optionIndex和已勾选的optionIndex选项 找到对应的option 将label赋值
          let questionOptionList = questionListDetailArr[0]?.questionOptionList
          let detailOptionArr = filter(questionOptionList, questionOption => {
            return questionOption.optionIndex == optionIndex
          })
          valueArr.push({
            label: detailOptionArr[0].optionTitle,
            value: parseInt(optionIndex)
          })
        })
        value = safe_json_stringify(valueArr)
      }
      set(finalValue, writeDetail.questionId, value)
    })
    form?.setFieldsValue({ ...finalValue });
  }

  async function handleSubmit() {
    await form?.validateFields();
    let formData = form?.getFieldsValue();
    const serialNo = getSearchParamsValue('serialNo');
    const nurseNO = mchcEnv.user_data?.login
    let questionList = get(propaganda, 'questionList');
    let writeDetailList: any = []
    console.log('formData', formData, questionList)
    map(questionList, question => {

      const labelType = EQuestionType.getLabel(question.questionType)
      let value = get(formData, question.id)

      if (labelType == '多选题') {
        let optionIndexArr = map(safe_json_parse_arr(value), data => {
          return data.value
        })
        writeDetailList.push({
          questionId: question.id,
          optionIndex: optionIndexArr.join(','),
          questionResult: optionIndexArr.join(','),
        })
      }
      if (labelType == '填空题') {
        writeDetailList.push({
          questionId: question.id,
          questionResult: value,
          optionIndex: question.questionOptionList[0].optionIndex,
        })
      }
    })
    console.log('writeDetailList', writeDetailList)
    let id = activeItem.id < 0 ? null : activeItem.id
    const res = (await request.post(`/api/pnc/midwife/savePncMidwifePropaganda/${pregnancyId}`, {
      ...activeItem,
      id: id,
      questionnaireId: propaganda.id,
      questionnaireTitle: propaganda.questionnaireTitle,
      writeDetailList,
      isAnswer: 1,
      fillDate: moment().format('YYYY-MM-DD'),
      beginTime: moment().format('YYYY-MM-DD HH:mm'),
      endTime: moment().format('YYYY-MM-DD HH:mm'),
      nurseNO,
      serialNo
    })).data
    set_activeItem(res)
    await getBirthPlanList();
    message.success('操作成功');
  };

  function handleFieldsChange(changedFields: any) { };

  function renderSider() {
    return (
      <Card
        size="small"
        bordered={false}
        title="填写记录"
        extra={<MyIcon value='PlusCircleOutlined' onClick={handleAdd} />}
        loading={loading}
      >
        {map(siderPanels, (siderPanel, key) => {
          return (
            <List
              size="small"
              dataSource={siderPanel}
              renderItem={(item: any) => {
                return (
                  <List.Item
                    className={classnames('birth-plan-sider-list__item', {
                      'birth-plan-sider-list__item_active': activeItem.id === item.id,
                    })}
                    onClick={() => handleClickListItem(item)}
                  >
                    <span className="birth-plan-sider-list__item-title">
                      {item.id < 0 && <MyIcon value='InfoCircleOutlined' />}{item.fillDate}
                    </span>
                    {item.id < 0 && <Popconfirm
                      title="确定要删除吗?"
                      onConfirm={() => handleDelete(item)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <MyIcon value='DeleteOutlined' />
                    </Popconfirm>}
                  </List.Item>
                );
              }}
            />
          );
        })}
        <div className='ant-card-body-button'>
          <Button onClick={initData}>获取填写结果</Button>
        </div>
      </Card>
    );
  };




  return (
    <Row className="birth-plan">
      <Col className="birth-plan-sider" span={3}>
        {renderSider()}
      </Col>
      <Col className="birth-plan-content" span={21}>
        <div className="birth-plan-content-block">
          {isEmpty(activeItem)
            ? <SelectTip />
            : <Form
              key={get(activeItem, 'id')}
              form={form}
              onFinish={handleSubmit}
              onFieldsChange={handleFieldsChange}
            >
              <FormSection formDescriptions={formDescriptions} form={formObj} />
              <Space className="prenatal-visit-main_initial-btns">
                <Button
                  // disabled={disabled}
                  size="large"
                  type="primary"
                  onClick={() => handleSubmit()}
                  icon={<MyIcon value='SaveOutlined' />}
                >
                  保存
                </Button>
              </Space>
            </Form>}
        </div>
      </Col>
    </Row>
  );
}
