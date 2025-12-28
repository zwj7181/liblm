import React, { Component } from 'react';
import { get, map } from 'lodash';
import './index.less';
interface IProps {
  printConfig: any
  printData: any
  hasPrint: any
  selectKeys: any
  headerInfo: any
  printTableRef: any
}
export default function PrintTable(props: IProps) {

  const { printConfig, printData, hasPrint, selectKeys, headerInfo, printTableRef } = props;

  /*todo: 待重写*/
  const getThs = (columns, level) => {
    const nextColumns = Array.prototype.concat.apply(
      [],
      columns.map((k: any) => k.children || [k]),
    );
    const childrenCount = (column: any) => {
      if (column.children) {
        return column.children.map((cl: any) => childrenCount(cl)).reduce((p: any, c: any) => p + c);
      }
      return 1;
    };
    columns.forEach((column: any) => {
      column.level = column.level !== undefined ? column.level : level;
      column.span = childrenCount(column);
    });
    if (columns.filter((i: any) => i.children && i.children.length).length) {
      return [columns, ...getThs(nextColumns, level + 1)];
    }
    return [columns];
  };


  // console.log(printConfig, printData, hasPrint, selectKeys, '334');
  const headers = getThs(get(printConfig[0], 'input_props.tableColumns'), 0);
  const keysArr: string[] = [];
  const ignoreKeys = ['inspection', 'prescription']; // 'resetAppoint'

  const showHeaders = headers[1] ? headers[1] : headers[0];
  showHeaders.forEach((item: any) => {
    if (!ignoreKeys.includes(item.key)) {
      keysArr.push(item.key);
    }
  });

  return (
    <div className="print-wrapper" key={printData} ref={printTableRef}>
      <div className={hasPrint ? 'isHide' : ''}>
        {/* <div> */}
        <p className="print-info">
          <span className="info-item">姓名：{get(headerInfo, 'name')}</span>
          <span className="info-item">年龄：{get(headerInfo, 'age')}</span>
          <span className="info-item">就诊卡号：{get(headerInfo, 'outpatientNO')}</span>
          <span>建档号：{get(headerInfo, 'checkupNO')}</span>
        </p>
        {/* {get(printData[0], 'pregnancy.highriskNote') && (
          <p className="print-highrisk">高危诊断：{get(printData[0], 'pregnancy.highriskNote')}</p>
        )} */}
      </div>
      <table className="print-table">
        <tbody>
          {headers.map((item: any, index: any) => (
            <tr key={item.key} className={hasPrint ? 'isHide' : ''}>
              {item.map((subItem: any, subItemKey: string) =>
                !ignoreKeys.includes(subItem.key) ? (
                  <td
                    key={subItemKey}
                    className={subItem.className}
                    rowSpan={subItem.level !== index ? 0 : subItem.children ? 1 : headers.length - index}
                    colSpan={subItem.level !== index ? 0 : subItem.span}
                    style={subItem.level !== index ? { display: 'none' } : undefined}
                  >
                    {subItem.title}
                  </td>
                ) : null,
              )}
            </tr>
          ))}

          {map(printData, (item, index) => (
            <React.Fragment key={index}>
              <tr className={hasPrint && !selectKeys.includes(index) ? 'isHide' : ''}>
                {keysArr.map((subItem) => (
                  <td>{get(item, subItem) || '-'}</td>
                ))}
              </tr>
              {get(item, 'inspection') ? (
                <tr className={hasPrint && !selectKeys.includes(index) ? 'isHide' : ''}>
                  <td>检验检查</td>
                  <td colSpan={keysArr.length - 1} style={{ textAlign: 'left' }}>
                    {get(item, 'inspection')}
                  </td>
                </tr>
              ) : null}
              {get(item, 'prescription') ? (
                <tr className={hasPrint && !selectKeys.includes(index) ? 'isHide' : ''}>
                  <td>处理</td>
                  <td colSpan={keysArr.length - 1} style={{ textAlign: 'left' }}>
                    {get(item, 'prescription')}
                  </td>
                </tr>
              ) : null}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );

}
