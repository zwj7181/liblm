import { get_echarat, MyIcon } from '@lm_fe/components';
import React, { createRef, useEffect } from 'react';
import { chartOption } from './chart';
import './index.less';
interface Iprops {
  [key: string]: any;
}
/**接诊类型分布图 */
export default function ChartType({ ...props }: Iprops) {
  const chartRef: any = createRef();
  const chartInit: any = createRef();
  useEffect(() => {
    get_echarat().then(ee => {
      chartInit.current = ee.init(chartRef.current);
      chartSetOption(chartOption);
    })


  }, []);

  function chartSetOption(options: any) {
    chartInit.current.setOption(options);
  }
  return (
    <div className="chart-type-container">
      <div className="title-content">
        <div className="title">接诊类型分布</div>
        <MyIcon value='InfoCircleOutlined' title="接诊效率指在产科专科病历人均平均接诊时间" />
      </div>
      <div ref={chartRef} style={{ height: '220px' }}></div>
    </div>
  );
}
