import { mchcEvent, mchcLogger } from '@lm_fe/env';
import classnames from 'classnames';
import { get, has, indexOf, isArray, isEmpty, isNil, isObject, isString } from 'lodash';
import React, { Component } from 'react';
import { CustomIcon, } from '../GeneralComponents/CustomIcon';
import MyComponent from './components';
import './formItem.less';
import { FormItemProp, FormItemState } from './interface';
import { validFun } from './utils/valid';

function isRequired(rules: any[] = []) {
  for (let index = 0; index < rules.length; index++) {
    const rule = rules[index];
    if (get(rule, 'required')) {
      return true;
    }
  }
  return false;
}
export default class FormItem extends Component<FormItemProp, FormItemState> {
  constructor(props: FormItemProp) {
    super(props);
    this.state = {
      value: '',
      error: false,
      path: '',
      rules: [],
      labelSign: false,
    };
  }

  componentDidMount() {
    this.setInitialVal();
  }

  // 外部页面更新引发
  componentDidUpdate(prevProps: FormItemProp) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.setInitialVal();
    }
  }

  setInitialVal = () => {
    const { value, validate = [], path, getActions, labelSign } = this.props;
    this.setState({
      value: value,
      rules: validate || [],
      path: path,
      labelSign,
    });
    if (!!value && JSON.stringify(validate).indexOf('rang') !== -1) {
      const validation = validFun(value, validate);
      this.updateError(validation);
    }
    getActions &&
      getActions({
        getValue: this.getValue,
        setValue: this.setValue,
        reset: this.reset,
        valid: this.valid,
        getValidate: this.getRules,
        setValidate: this.setRules,
      });
  };

  // 获取组件内部的自己的验证方法
  getChildrenValid = (func: any) => {
    if (func) {
      this.childrenValid = func;
    }
  };

  // 承载组件的验证方法 - 相当于一个别名/引用
  childrenValid = () => {
    return true;
  };

  handleClick = (value?: any) => {
    const { name, dispatch } = this.props;
    dispatch(name, 'click', value);
  };

  handleChange = (value: any, error: any = '') => {
    const { name, dispatch, hidden, formHandler } = this.props;
    mchcLogger.log('onChange', name, value)
    if (hidden) return;
    const { rules } = this.state;
    this.setState({ value });
    if (name) {
      dispatch(name, 'change', value);
      formHandler?.submit?.()
        .then((r: any) => {
          mchcEvent.emit('my_form', {
            type: 'onChange',
            value,
            name,
            values: r,
            config: this.props.config,
            setValue(name, value) { formHandler[name]?.actions?.setValue(value); }
          })
        })


    }
    const validation = validFun(value, rules);
    this.updateError(validation);
  };
  handleOnFocus(value?: any) {
    const { name, dispatch } = this.props;
    dispatch(name, 'focus', value);
  }
  handleOnBlurs(value?: any) {
    const { name, dispatch } = this.props;
    dispatch(name, 'blur', value);
  }

  // 这个dispatch默认会使用本组件渲染的路径
  handleDispatch = (eventName: string, args: any) => {
    const { name, dispatch } = this.props;
    dispatch(name, eventName, args);
  };

  setMyRef(ref: any) {
    const { name, setMyRef } = this.props;
    setMyRef && setMyRef(name, ref);
  }

  // 渲染必填项标志
  renderAsterisk = () => {
    const { rules } = this.state;
    for (let index = 0; index < rules.length; index++) {
      const rule = rules[index];
      if (get(rule, 'required')) {
        return <i className="form-item-required">*</i>;
      }
    }
    return <></>;
  };

  getValue = () => {
    const { value, path, labelSign } = this.state;
    const { name, input_props } = this.props;
    if (has(input_props, 'labelSign')) {
      return {
        value: value,
        path: path,
        [`${name}Sign`]: labelSign,
      };
    } else {
      return {
        value: value,
        path: path,
      };
    }
  };

  setValue = (value: any) => {
    this.setState({ value });
  };

  getRules = () => {
    return this.state.rules;
  };

  setRules = (rules: any) => {
    this.setState({ rules });
  };

  reset = () => {
    const { hidden } = this.props;
    const { value } = this.state;
    if (!hidden) {
      if (isObject(value)) {
        this.setState({ value: {} });
      } else if (isArray(value)) {
        this.setState({ value: [] });
      } else {
        this.setState({ value: null });
      }
    }
  };

  updateError = (validation: any) => {
    this.setState({ error: validation === true ? !validation : validation });
  };

  valid = () => {
    const { value, rules } = this.state;
    const { label } = this.props;
    const validation = validFun(value, rules, label);
    this.updateError(validation);
    if (validation === true) {
      return true;
    }
    if (indexOf(validation, '*') > -1 || isNil(validation)) return true;
    return false;
  };

  validError = () => {
    const { error } = this.state;
    if (error === '') {
      return false;
    }
    return isString(error) && !/\*/.test(error);
  };
  handleIconSign() {
    const { name, dispatch, hidden } = this.props;
    const { labelSign } = this.state;
    this.setState({ labelSign: !labelSign });
    if (name) {
      dispatch(`${name}Sign`, 'change', !labelSign);
    }
  }

  render() {
    const { name, subscribe, type, label, input_props, unit, header_label, just_header, disabled_all, allValue, thisConfig } = this.props;
    const { value, error, rules, labelSign } = this.state;
    const required = isRequired(rules);
    const C = MyComponent[type];

    const safe_input_props = input_props ?? {}
    const disabled = safe_input_props.disabled || disabled_all
    // id转化
    let id = name;
    if (id?.includes('.') || id?.includes('(Note)')) {
      const re = id.replace('(Note)', '');
      const reArr = re.split('.');
      id = reArr.join('-');
    }
    return (
      <>
        {label !== '' && header_label ? (
          <div className="form-item-header-label">
            <div className={type === 'label' ? 'form-item-just-label' : 'form-item-header-label-text'}>
              <span>
                {/* {this.renderAsterisk(rules)} */}
                {type === 'label' ? `${label}` : label}
              </span>
            </div>
          </div>
        ) : null}
        {!just_header ? (
          <div id={id} className="ant-form-item form-item">
            {!isEmpty(label) && (!header_label || type.indexOf('custom') === -1) ? (
              <div className="ant-form-item-label form-item-inline-label">
                {!isEmpty(get(input_props, 'labelSign')) && get(input_props, 'labelSign.type') == 'iconfont' && (
                  <CustomIcon
                    type={get(input_props, 'labelSign.value')}
                    className={classnames('iconfont', { 'icon-sign': labelSign })}
                    onClick={this.handleIconSign.bind(this)}
                  />
                )}

                <label className={classnames({ 'ant-form-item-required': required })}>
                  <span className="label-words">{label}</span>
                  {unit && <span className="label-unit">({unit})</span>}
                  {(__DEV__ && thisConfig.id) ? <sup className="label-unit">{thisConfig.id}</sup> : null}
                </label>
              </div>
            ) : null}
            {/*
             * full-main 代表label为header形式出现
             * main      label在同一行
             */}
            <div
              style={{ display: 'flex', alignItems: 'center' }}
              className={classnames({
                'form-item-full-main': header_label,
                'form-item-main': !header_label,
                // 填写错误，无法提交
                'form-item-main-error': this.validError(),
                // 异常警告，但仍可以提交
                'form-item-main-warn': /\*/.test(error),
              })}
            >
              {C ? (

                <div style={{ flex: 1 }}>
                  <C
                    config={this.props.config}
                    {...safe_input_props}
                    allValue={allValue}
                    disabled={disabled}
                    onClick={this.handleClick}
                    onChange={this.handleChange}
                    dispatch={this.handleDispatch}
                    onFocus={this.handleOnFocus.bind(this)}
                    onBlur={this.handleOnBlurs.bind(this)}
                    setMyRef={this.setMyRef.bind(this)}
                    // subscribe仅在一些 业务组件/内嵌表单组件 中使用
                    myForm
                    subscribe={subscribe}
                    name={name}
                    value={value}
                    input_props={{ ...safe_input_props, disabled }}
                    error={error}
                    getValidFun={this.getChildrenValid}
                    validate={rules}
                    label={`${label}`}
                    unit={unit}
                  />
                </div>
              ) : (
                <strong>组件{type}不存在</strong>
              )}
            </div>
            {/* {unit !== '' ? < className="form-item-unit">{unit}</> : null} */}
          </div>
        ) : null}
        {/* 基本的组件的error统一在这里做，复杂的放入业务组件中 */}
        {/* 7/31  暂时注释 */}
        {/* {isBase(error) && error.indexOf('*') === -1 ? <div className="form-item-error">{error}</div> : null} */}
      </>
    );
  }
}
