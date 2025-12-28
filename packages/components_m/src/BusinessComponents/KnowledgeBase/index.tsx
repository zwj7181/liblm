import React, { useEffect, useState } from 'react';
import {  Row, Col } from 'antd';
import { get, set, cloneDeep, isEmpty } from 'lodash';
import { request } from '@lm_fe/utils';
import { LazyAntd } from '@lm_fe/components';
const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd


export default function DataSelectWithOptionsOrInput(props: any) {
  const { onChange, value } = props;
  const [options, setOptions] = useState<any[]>([]);
  const [knowledgeList, setKnowledgeList] = useState<any[]>([]);
  const [values, setValues] = useState({});

  const handleChange = async (data: any) => {
    let res = await request.get(
      `/api/women/healthcare/knowledge/getWomenHealthcareKnowledgePage/page?sort=id,desc&page=0&size=999&deleteFlag.equals=0&releaseType.equals=1&type.equals=${Number(
        data,
      )}`,
      {
        headers: { isLoading: false },
      },
    );
    let listData = get(res.data, 'data.pageData');
    const tempData = cloneDeep(values);
    setKnowledgeList(listData);
    set(tempData, 'type', data);
    setValues(tempData);
    onChange && onChange(tempData);
  };

  const handleChange2 = (data: any, option: any) => {
    const tempData = cloneDeep(values);
    set(tempData, 'content', get(option, 'label'));
    set(tempData, 'id', get(option, 'id'));
    setValues(tempData);
    onChange && onChange(tempData);
  };

  useEffect(() => {
    !isEmpty(value) && setValues(value);
  }, [value]);

  useEffect(() => {
    let subscribe = false;
    const getData = async () => {
      let knowledgeTypList = await request.get(`/api/dictionaries/287`, {
        headers: { isLoading: false },
      });
      let options = get(knowledgeTypList.data, 'enumerations');

      if (!subscribe) {
        setOptions(options);
      }
    };
    getData();
    return () => {
      subscribe = true;
    };
  }, []);

  useEffect(() => {
    let subscribe = false;
    if (get(value, 'type')) {
      let knowledgeList: any = [];
      const getData = async () => {
        const res = await request.get(
          `/api/women/healthcare/knowledge/getWomenHealthcareKnowledgePage/page?sort=id,desc&page=0&size=999&deleteFlag.equals=0&releaseType.equals=1&type.equals=${Number(
            get(value, 'type'),
          )}`,
          {
            headers: { isLoading: false },
          },
        );

        knowledgeList = get(res, 'data.pageData');

        if (!subscribe) {
          setKnowledgeList(knowledgeList);
        }
      };
      getData();
    }
    return () => {
      subscribe = true;
    };
  }, []);

  return (
    <>
      <Row>
        <Col span={8}>
          <Select
            value={get(value, 'type') && Number(get(value, 'type'))}
            options={options}
            placeholder="请选择知识库类型"
            onChange={handleChange}
          ></Select>
        </Col>
        <Col span={8}>
          <Select
            options={knowledgeList.map((_) => ({ label: _.title, value: _.content, id: _.id }))}
            placeholder="请选择知识库"
            onChange={handleChange2}
            value={get(value, 'content')}
          ></Select>
        </Col>
      </Row>
    </>
  );
}
