import observePatientData from '@/utils/observePatientData';
import { MyIcon } from '@lm_fe/components';
import { Button, Drawer, Tooltip } from 'antd';
import classnames from 'classnames';
import dayjs from 'dayjs';
import { get, omit } from 'lodash';
import React, { useState } from 'react';
import './index.less';
import PatientList from './PatientList';
export default (props: any) => {
  const [showPanel, setShowPanel] = useState(false);

  const handleVisible = () => {
    setShowPanel(!showPanel);
  };

  const handlePasteData = (data: any) => {
    observePatientData.triger({
      ...omit(data, [
        'id',
        'createDate',
        'modifyDate',
        'validateDate',
        'recordsrc',
        'recordstate',
        'note',
        'allergyHistory',
        'diseaseHistory',
        'familyHistory',
        'maritalHistory',
        'premaritalVisit',
        'procedureHistory',
        'husband',
      ]),
      dob: dayjs(get(data, 'dob')),
    });
  };

  return (
    <div className="fixed-search">
      {!showPanel && (
        <Tooltip title={props.tooltip}>
          <Button
            type={props.type}
            shape={props.shape || 'circle'}
            icon={props.icon || <MyIcon value='SearchOutlined' />}
            size={props.size || 'middle'}
            ghost={props.ghost}
            onClick={handleVisible}
            className={classnames('fixed-search-triger', { 'fixed-search-triger-fixed': props.fixed })}
          >
            {props.title}
          </Button>
        </Tooltip>
      )}
      <Drawer
        title="用户资料查询"
        placement="right"
        width={520}
        onClose={handleVisible}
        closable
        visible={showPanel}
        className="fixed-search-panel"
      // footer={renderFooter()}
      >
        <PatientList onExport={handlePasteData} />
      </Drawer>
    </div>
  );
};
