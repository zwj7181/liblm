import { safe_json_parse } from '@lm_fe/utils';
import { Col, Input, Row } from 'antd';
import { get, map } from 'lodash';
import dayjs, { Dayjs } from 'dayjs'

import { Component } from 'react';
import { TimePickerAutoaccept } from '../../BusinessComponents/TimePickerAutoaccept';
import { GeneralComponents_EditInTable_Inner } from '../../GeneralComponents/EditInTable';
import styles from './index.less';
import React from 'react';
export const HOURS = Array.from(Array(24), (n, index) => index);
export const MINUTES = Array.from(Array(60), (n, index) => index);
export default class ProcedureRecords extends Component {
  constructor(props: any) {
    super(props);
    const { value } = props;
    this.state = {
      data: value,
      time: {
        startTime: get(value, '0.startTime') ? dayjs(get(value, '0.startTime')) : undefined,
        endTime: get(value, '0.endTime') ? dayjs(get(value, '0.endTime')) : undefined,
        duration: get(value, '0.duration') ? get(value, '0.duration') : 0,
      },
    };
  }

  handleTableChange = (data) => {
    const { onChange } = this.props;
    const { time } = this.state;
    this.setState({
      data,
    });
    const outData = map(data, (item, index) => {
      if (index == 0) {
        return {
          ...item,
          ...time,
        };
      }
      return item;
    });
    onChange && onChange(outData);
  };

  handlestartTimeChange = (value: Moment) => {
    const { onChange } = this.props;
    const { time, data } = this.state;
    const duration = time.endTime ? Math.round(time.endTime.diff(value, 'minutes', true)) : 0;
    const newTime = {
      ...time,
      startTime: value,
      duration,
    };
    this.setState({
      time: newTime,
    });
    const outData = map(data, (item, index) => {
      if (index == 0) {
        return {
          ...item,
          ...newTime,
        };
      }
      return item;
    });
    onChange && onChange(outData);
  };

  handleEndTimeChange = (value: Moment) => {
    const { onChange } = this.props;
    const { time, data } = this.state;
    const duration = time.startTime ? Math.round(value.diff(time.startTime, 'minutes', true)) : 0;
    const newTime = {
      ...time,
      endTime: value,
      duration,
    };
    this.setState({
      time: newTime,
    });
    const outData = map(data, (item, index) => {
      if (index == 0) {
        return {
          ...item,
          ...newTime,
        };
      }
      return item;
    });
    onChange && onChange(outData);
  };

  render() {
    const { data, time } = this.state;

    const { config, } = this.props;
    const specialConfig = safe_json_parse(get(config, 'specialConfig'));
    const tableColumns = get(specialConfig, 'tableColumns');

    return (
      <div className={styles["procedure-records"]}>
        <Row>
          <Col span={8}>
            <Row className={styles["procedure-records-items"]}>
              <Col className={styles["procedure-records-items__label"]} span={12}>
                开始时间：
              </Col>
              <Col span={12}>
                <TimePickerAutoaccept
                  format="HH:mm"
                  disabledHours={() => {
                    if (time.endTime) {
                      const h = time.endTime.hour();
                      return HOURS.slice(h + 1, HOURS.length);
                    }
                    return [];
                  }}
                  disabledMinutes={(selectedHour) => {
                    const endTime = time.endTime;
                    if (endTime) {
                      if (selectedHour < endTime.hour()) return [];
                      const m = endTime.minute();
                      return MINUTES.slice(m + 1, MINUTES.length);
                    }
                    return [];
                  }}
                  onChange={this.handlestartTimeChange}
                  value={time.startTime}
                />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row className={styles["procedure-records-items"]}>
              <Col className={styles["procedure-records-items__label"]} span={12}>
                结束时间：
              </Col>
              <Col span={12}>
                <TimePickerAutoaccept
                  disabledHours={() => {
                    if (time.startTime) {
                      const h = time.startTime.hour();
                      return HOURS.slice(0, h);
                    }
                    return [];
                  }}
                  disabledMinutes={(selectedHour) => {
                    const startTime = time.startTime;
                    if (startTime) {
                      if (selectedHour > startTime.hour()) return [];
                      const m = startTime.minute();
                      return MINUTES.slice(0, m + 1);
                    }
                    return [];
                  }}
                  format="HH:mm"
                  onChange={this.handleEndTimeChange}
                  value={time.endTime}
                />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row className={styles["procedure-records-items"]}>
              <Col className={styles["procedure-records-items__label"]} span={12}>
                持续时间(分)：
              </Col>
              <Col span={12}>
                <Input disabled value={time.duration} />
              </Col>
            </Row>
          </Col>
        </Row>
        <div>
          <GeneralComponents_EditInTable_Inner tableColumns={tableColumns} value={data} onChange={this.handleTableChange} />
        </div>
      </div>
    );
  }
}
