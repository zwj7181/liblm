//  产科住院-入院登记-查看登记详情-护理文书

import { MyIcon } from '@lm_fe/components';
import { IMchc_Admission_DocumentListItem, TIdTypeCompatible } from '@lm_fe/service';
import { getSearchParamsValue, request } from '@lm_fe/utils';
import { Col, List, Row, Tooltip } from 'antd';
import classnames from 'classnames';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import './index.less';
import Right from './Right';

type TItem = Partial<IMchc_Admission_DocumentListItem<'mchc'>>

export function Page_DocRecord(props: { type?: '门诊' | '住院', id?: TIdTypeCompatible }) {

    const { type = '住院', id } = props;

    let _id = id || getSearchParamsValue('id')!


    const [siderPanels, set_siderPanels] = useState<TItem[]>([])
    const [activeItem, set_activeItem] = useState<TItem>({})


    useEffect(() => {

        handleInit();

        return () => {

        }
    }, [])








    function handleClickListItem(item: TItem) {
        return () => {

            set_activeItem(item)

        };
    }

    async function handleInit() {
        const siderPanels = (await request.get(`/api/listInformedConsentForm`, {
            params: {
                type: type === '住院' ? 2 : 1,
            }
        })).data as any;


        set_siderPanels(siderPanels)

    };





    function renderSider() {

        return (
            <>
                <List

                    size="small"
                    dataSource={siderPanels}
                    renderItem={(item: TItem) => {
                        return (
                            <List.Item
                                className={classnames('doctor-desk-first-visit-sider-list__item', {
                                    'doctor-desk-first-visit-sider-list__item_active': get(activeItem, 'code') === get(item, 'code'),
                                })}
                                style={get(activeItem, 'code') === get(item, 'code') ? { background: '#eaf4fd' } : { background: 'none' }}
                                onClick={handleClickListItem(item)}
                                key={item.code}
                            >
                                {/* {activeItem.isTempStroage && <InfoCircleOutlined style={{ marginRight: 4 }} />} */}
                                <Tooltip title={item.name} placement="left">
                                    <span className="doctor-desk-first-visit-sider-list__item-title">
                                        {item.code ? '' : <MyIcon value='InfoCircleOutlined' style={{ marginRight: 4 }} />}
                                        {item.name}
                                    </span>
                                </Tooltip>


                            </List.Item>
                        );
                    }}
                />
            </>
        );
    };

    function renderContent() {


        return (
            <Right
                id={_id}
                activeItem={activeItem}
            />
        );

    };

    return (
        <Row style={{ height: '100%' }} className="nuser-record">
            <Col style={{ height: '100%', width: 300, overflow: 'auto' }}>


                {/* {

          map(oldsiderPanels, (nurseType) => {
            return (
              <div style={{
                margin: 8,
                display: 'inline-block',
                // padding: '2.7px 4px',
                minWidth: 'calc(50% - 16px)',
                maxWidth: 'calc(50% - 16px)',
              }}>

                <Button
                  title={nurseType.name}
                  disabled={siderPanels.some(_ => _.code === nurseType.code)}
                  style={{ width: '100%', }}
                  key={nurseType.code}
                  onClick={handleChooseTemplate(nurseType)}
                >
                  <span className="menu-btn-span">{nurseType.name}</span>




                </Button>

              </div>
            );
          })

        } */}
                {renderSider()}
            </Col>
            <Col style={{ height: '100%', width: 'calc(100% - 300px)', overflow: 'auto' }} className="nur-form-container">
                {renderContent()}
            </Col>

        </Row>
    );
}
