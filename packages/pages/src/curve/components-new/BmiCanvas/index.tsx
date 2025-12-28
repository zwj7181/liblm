import { PrinterOutlined } from '@/components/GeneralComponents/CustomIcon';
import { AS } from '@/lib/request';
import { peek_provoke } from '@lm_fe/provoke';
import { Button, Radio } from 'antd';
import { get } from 'lodash';
import { Component } from 'react';
import ReactToPrint from 'react-to-print';
import { curve_api } from 'src/curve/components/api';
import './index.less';
const recordOptions = [
  { label: '全部', value: 0 },
  { label: '产检记录', value: 1 },
  { label: '居家记录', value: 2 },
];
interface IndexState {
  bmiIntro: string;
  bmiBottomLine: any[];
  bmiTopLine: any[];
  bmiLinesPoints: any[];
  bmiNum: string;
  bmiTz: string;
  bmiList: any[];
  resdata: any;
}
export default class BmiCanvas extends Component<{}, IndexState> {
  constructor(props: any) {
    super(props);
    this.state = {
      bmiIntro: '',
      bmiBottomLine: [],
      bmiTopLine: [],
      bmiLinesPoints: [],
      bmiNum: '',
      bmiTz: '',
      bmiList: [],
      resdata: null,
    };
  }
  default_type = peek_provoke(s => s.config.医生端_BMI曲线类型) || 0

  async componentDidMount() {
    await this.getResData();
    this.getBmiData(this.default_type);
  }

  async getResData() {
    const { pregnancyData, headerInfo, id } = this.props;
    const pregnancyId = get(headerInfo, 'id') || id;
    const res0 = await curve_api.getBmi(pregnancyId, 0);
    const res1 = await curve_api.getBmi(pregnancyId, 1);
    const res2 = await curve_api.getBmi(pregnancyId, 2);
    this.setState({ resdata: { 0: res0, 1: res1, 2: res2 } });
  }

  getBmiData = async (type: number) => {
    const { resdata } = this.state;
    let res = get(resdata, `${type}`);

    this.drawBmiCanvas(res);
  };

  handleRadioChange = (e: any) => {
    this.getBmiData(e.target.value);
  };





  drawBmiCanvas(dd: any) {
    AS.post<{ data: { dataUrl: string } }>('/draw/bmi', dd)
      .then(res => {
        const dataUrl = res.data.data.dataUrl
        document.querySelector<HTMLImageElement>('#bmi-canvas')!.src = dataUrl
      })

  }

  render() {
    return (
      <div className="bmi-wrapper">
        <Radio.Group className="bmi-radio" options={recordOptions} defaultValue={this.default_type} onChange={this.handleRadioChange} />
        {!get(this.props, 'hidePrintBtn') && (
          <ReactToPrint
            trigger={() => (
              <Button type="primary" size="small" className="print-btn">
                <PrinterOutlined /> 打印
              </Button>
            )}
            content={() => document.querySelector<HTMLImageElement>('#bmi-canvas')}
          />
        )}

        <img id="bmi-canvas" className="bmi-canvas">
        </img>
      </div>
    );
  }
}
