import React from 'react';
import styles from './less/panel-with-child.module.less';
import { PanelTitle } from './PanelWithChildFC';
export interface IPanelWithChildProps { }
interface IState {
  data: {
    name?: string;
    age?: string | number;
    [propName: string]: any;
  };
  [propName: string]: any;
}
export class PanelWithChild extends React.Component<IPanelWithChildProps, IState> {
  constructor(props) {
    super(props);
    this.headerRef = React.createRef();
    this.state = {
      data: {
        name: '',
        age: '',
        currentGestationalWeek: '',
        sureEdd: '',
        edd: '',
        outpatientNO: '',
        inpatientNO: '',
        checkupNO: '',
      },
    };
  }

  renderHeader = () => {
    const {
      data: { name, age, currentGestationalWeek, sureEdd, edd, outpatientNO, inpatientNO, checkupNO },
    } = this.state;

    const h = [
      { title: '姓名', value: name },
      { title: '年龄', value: age },
      { title: '孕周', value: currentGestationalWeek },
      { title: '孕产期', value: sureEdd || edd },
      { title: '就诊卡号', value: outpatientNO },
      inpatientNO ? { title: '住院号', value: inpatientNO } : null,
      { title: '产检编号', value: checkupNO },

    ]
    return (
      <PanelTitle headerItems={h} />
    );

  };

  renderContent = () => {
    return <></>;
  };

  render() {
    return (
      <div className={styles["panel-with-child"]}>
        <div ref={this.headerRef}>{this.renderHeader()}</div>
        <div
          className={styles["panel-with-child_content"]}
          style={{ height: `calc(100% - ${this.headerRef.current?.clientHeight}px` }}
        >
          {this.renderContent()}
        </div>
      </div>
    );
  }
}
type EC = typeof PanelWithChild & { styles: React.CSSProperties }
const PanelWithChild_Styles: EC = Object.assign(PanelWithChild, { styles })

export default PanelWithChild_Styles