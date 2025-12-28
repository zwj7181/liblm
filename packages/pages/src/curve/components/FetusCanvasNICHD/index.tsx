


import { MyIcon } from '@lm_fe/components';
import { Button, Modal, Radio, Space } from 'antd';
import { forEach, get, set } from 'lodash';
import React, { useEffect, useState } from 'react';
import ReactToPrint from 'react-to-print';
import { draw_info, get_abnormal_color, get_canvas_el, get_fetus_color } from 'src/curve/utils';
import { judgeAreas, printCanvas, setHorRules, setVerRules } from '../../func';
import { FetuGrowsEdit } from '../FetusCanvas/FetuGrowsEdit';
import { IProps, use_fetus } from '../FetusCanvas/use_fetus';
import { acData, bpdData, efwData, flData, hcData, hlData } from './data';
import './index.less';

const curveOptions = [
  { label: 'BPD,FL,AC', value: 'bpd' },
  { label: 'HC,HL', value: 'hc' },
  { label: 'EFW', value: 'efw' },
];

export default function FetusCanvasNICHD(props: IProps) {
  const { headerInfo, id, isAllPregnancies } = props;



  const [currentCurve, set_currentCurve] = useState<'bpd' | 'hc' | 'efw'>('bpd')


  const {
    sys_theme,
    line_color,
    font_color,
    imageRef,
    isShowPointModal,
    set_isShowPointModal,
    getFetusData,
    formData,
    pointData,
    set_pointData
  } = use_fetus(props)


  useEffect(() => {
    if (formData)
      drawFetusCanvas()

    return () => {

    }
  }, [formData, currentCurve])


  //绘制曲线
  function drawScaleLine(
    canvas: HTMLCanvasElement | null,
    ctx: CanvasRenderingContext2D,
    oringin: any[],
    steps: any[],
    data: any,
    point: [false] | [true, string, string],
    color: string,
    shape: number[],
    lineWidth: number,
  ) {
    for (let i = 0; i < data.length; i++) {
      //绘制曲线
      ctx.beginPath();
      ctx.setLineDash(shape);
      ctx.lineWidth = lineWidth;
      if (i < data.length - 1) {
        ctx.moveTo(oringin[0] + steps[0] * data[i].x, oringin[1] - steps[1] * data[i].y);
        ctx.lineTo(oringin[0] + steps[0] * data[i + 1].x, oringin[1] - steps[1] * data[i + 1].y);
      }
      ctx.strokeStyle = color;
      ctx.stroke();
      //绘制红点
      if (point[0]) {
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.arc(oringin[0] + steps[0] * data[i].x, oringin[1] - steps[1] * data[i].y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = point[1];
        ctx.fill();
        canvas &&
          canvas.addEventListener(
            'click',
            (e: any) => {
              const X = oringin[0] + steps[0] * data[i].x;
              const Y = oringin[1] - steps[1] * data[i].y;
              const obj = { x: X, y: Y, r: 5 };

              let x = e.pageX - canvas.getBoundingClientRect().left;
              let y = e.pageY - canvas.getBoundingClientRect().top;
              if (x > obj.x - obj.r && x < obj.x + obj.r && y > obj.y - obj.r && y < obj.y + obj.r) {
                const obj = {
                  x: data[i].gestationalWeek,
                  y: data[i].value,
                  line: point[2],
                  fetus: data[i].sort,
                  style: {
                    position: 'fixed' as const,
                    top: e.pageY,
                    left: e.pageX,
                  },
                };
                set_pointData(obj)
                set_isShowPointModal(true)

              }
            },
            false,
          );
      }
    }
  }

  //绘制x轴线
  function setVertical(
    context: any,
    xCount: number,
    yCount: number,
    xStep: number,
    yStep: number,
    baseLeft: number,
    baseTop: number,
  ) {
    context.strokeStyle = line_color;
    for (let i = 0; i < xCount; i++) {
      context.beginPath();
      context.lineWidth = 1;
      context.moveTo(baseLeft, baseTop + xStep * i);
      context.lineTo(baseLeft + (yCount - 1) * yStep, baseTop + xStep * i);
      context.textBaseline = 'middle';
      context.fillStyle = font_color;
      context.font = 'bold 12px normal';
      if ((i * 2) % 10 === 0) {
        context.lineWidth = 1;
        if (currentCurve === 'efw') {
          context.fillText(i * 100, baseLeft - 20, (xCount - 1) * xStep + baseTop - i * xStep);
        } else {
          context.fillText(i * 2, baseLeft - 20, (xCount - 1) * xStep + baseTop - i * xStep);
        }
      }
      context.stroke();
    }
  };

  //绘制y轴线
  function setHorizontal(
    context: any,
    xCount: number,
    yCount: number,
    xStep: number,
    yStep: number,
    baseLeft: number,
    baseTop: number,
  ) {
    for (let i = 0; i < yCount; i++) {
      context.beginPath();
      context.lineWidth = 1;
      context.moveTo(yStep * i + baseLeft, baseTop);
      context.lineTo(yStep * i + baseLeft, baseTop + xStep * (xCount - 1));
      context.textAlign = 'center';
      context.fillStyle = font_color;
      context.font = 'bold 12px normal';
      if (i % 5 === 0) {
        context.lineWidth = 1;
        context.fillText(i + 10, baseLeft + i * yStep, xStep * xCount + baseTop + 5);
      }
      context.stroke();
    }
  };

  function drawFetusCanvas() {
    const mlUltrasounds = get(formData, 'mlUltrasounds') || [];

    let allBpdArr: any = [];
    let allFlArr: any = [];
    let allAcArr: any = [];
    let allHlArr: any = [];
    let allHcArr: any = [];
    let allEfwArr: any = [];

    if (mlUltrasounds.length > 0) {
      forEach(mlUltrasounds, (item) => {
        let yunWeek = item.gestationalWeek;
        if (yunWeek && yunWeek.indexOf('+') !== -1) {
          const arr = yunWeek.split('+');
          yunWeek = Number(arr[0]) + Number(arr[1]) / 7;
        }

        const setData = (param: string, arr: any) => {
          const obj: any = {};
          const sort = +item.fetal - 1;
          obj.x = yunWeek - 10;
          if (param === 'ac' || param === 'hc') {
            obj.y = Number(item[param]) / 10;
          } else if (param === 'efw') {
            obj.y = Number(item[param]) / 50;
          } else {
            obj.y = Number(item[param]);
          }
          obj.value = Number(item[param]);
          obj.gestationalWeek = item.gestationalWeek;
          obj.sort = item.fetal;
          if (yunWeek && item[param] && yunWeek >= 10 && yunWeek <= 40 && obj.y <= 110) {
            const arrItem = get(arr, sort) || [];
            arrItem.push(obj);
            set(arr, sort, arrItem);
          }
        };

        setData('bpd', allBpdArr);
        setData('fl', allFlArr);
        setData('ac', allAcArr);
        setData('hl', allHlArr);
        setData('hc', allHcArr);
        setData('efw', allEfwArr);
      });
    }

    const canvas = get_canvas_el('fetus-canvas', sys_theme);
    const context = canvas.getContext('2d');
    if (!context) return
    canvas.width = 660;
    canvas.height = 710;

    const baseLeft = 50;
    let baseTop = 120;
    let xStep = 10;
    let xCount = 56;
    const yStep = 17;
    const yCount = 31;
    if (currentCurve === 'bpd') {
      xStep = 10;
      xCount = 56;
    } else if (currentCurve === 'hc') {
      xStep = 15.56;
      xCount = 36;
    } else {
      xStep = 12.17;
      xCount = 46;
    }

    context.fillStyle = font_color;
    context.font = 'bold 16px normal';
    context.textAlign = 'center';
    context.fillText(`${draw_info(headerInfo,)}`, canvas.width / 2, baseTop - 60);

    context.fillText('胎儿生长曲线', canvas.width / 2, baseTop - 25);

    setVertical(context, xCount, yCount, xStep, yStep, baseLeft, baseTop);
    setHorizontal(context, xCount, yCount, xStep, yStep, baseLeft, baseTop);
    setVerRules(context, [baseLeft, baseTop + (xCount - 1) * xStep], (yCount - 1) * yStep, line_color, 1, yStep, 5);
    setHorRules(context, [baseLeft, baseTop + (xCount - 1) * xStep], (xCount - 1) * xStep, line_color, 1, xStep, 5);

    if (currentCurve === 'bpd') {
      //手动绘制标尺最右端点
      //BPD
      context.fillText('90th', baseLeft + yCount * yStep, baseTop + 6 * xStep);
      context.fillText('50th', baseLeft + yCount * yStep, baseTop + 8.5 * xStep);
      context.fillText('10th', baseLeft + yCount * yStep, baseTop + 11.5 * xStep);
      //FL
      context.fillText('90th', baseLeft + yCount * yStep, baseTop + 16.5 * xStep);
      context.fillText('50th', baseLeft + yCount * yStep, baseTop + 19 * xStep);
      context.fillText('10th', baseLeft + yCount * yStep, baseTop + 21.5 * xStep);
      //AC
      context.fillText('90th', baseLeft + yCount * yStep, baseTop + 36 * xStep);
      context.fillText('50th', baseLeft + yCount * yStep, baseTop + 37.5 * xStep);
      context.fillText('10th', baseLeft + yCount * yStep, baseTop + 39 * xStep);
      context.font = 'bold 18px normal';
      context.textAlign = 'center';
      context.fillText('BPD', baseLeft + (yCount - 6) * yStep, baseTop + 6 * xStep);
      context.fillText('FL', baseLeft + (yCount - 6) * yStep, baseTop + 28 * xStep);
      context.fillText('AC', baseLeft + (yCount - 6) * yStep, baseTop + 44 * xStep);
    } else if (currentCurve === 'hc') {
      //HL
      context.fillText('90th', baseLeft + yCount * yStep, baseTop + 1.5 * xStep);
      context.fillText('50th', baseLeft + yCount * yStep, baseTop + 3.5 * xStep);
      context.fillText('10th', baseLeft + yCount * yStep, baseTop + 6 * xStep);
      //HC
      context.fillText('90th', baseLeft + yCount * yStep, baseTop + 17.5 * xStep);
      context.fillText('50th', baseLeft + yCount * yStep, baseTop + 18.5 * xStep);
      context.fillText('10th', baseLeft + yCount * yStep, baseTop + 19.5 * xStep);
      context.font = 'bold 18px normal';
      context.textAlign = 'center';
      context.fillText('HL', baseLeft + (yCount - 6) * yStep, baseTop + 2 * xStep);
      context.fillText('HC', baseLeft + (yCount - 6) * yStep, baseTop + 22 * xStep);
    } else {
      //EFW
      context.fillText('90th', baseLeft + yCount * yStep, baseTop + 4.5 * xStep);
      context.fillText('50th', baseLeft + yCount * yStep, baseTop + 10.5 * xStep);
      context.fillText('10th', baseLeft + yCount * yStep, baseTop + 16.5 * xStep);
      context.font = 'bold 18px normal';
      context.textAlign = 'center';
      context.fillText('EFW', baseLeft + (yCount - 6) * yStep, baseTop + 6 * xStep);
    }

    let middleLineArr: any[] = [];
    let endLineArr: any[] = [];
    const drawItemLine = (itemArr: any, itemData: any, itemName: string) => {
      itemArr.forEach((item: any, index: any) => {
        if (item.length > 0) {
          const color = judgeAreas(item[item.length - 1], get(itemData, 'lineArea'))
            ? get_fetus_color(sys_theme, index)
            : get_abnormal_color(sys_theme);
          drawScaleLine(
            canvas,
            context,
            [baseLeft, baseTop + (xCount - 1) * xStep],
            [yStep, xStep / 2],
            item,
            [true, color, itemName],
            color,
            [],
            2,
          );
        }
      });
    };

    if (currentCurve === 'bpd') {
      middleLineArr = [get(bpdData, 'middleLine'), get(flData, 'middleLine'), get(acData, 'middleLine')];
      endLineArr = [
        get(bpdData, 'bottomLine'),
        get(bpdData, 'topLine'),
        get(flData, 'bottomLine'),
        get(flData, 'topLine'),
        get(acData, 'bottomLine'),
        get(acData, 'topLine'),
      ];
      forEach(middleLineArr, (line) => {
        drawScaleLine(
          null,
          context,
          [baseLeft, baseTop + (xCount - 1) * xStep],
          [yStep, xStep / 2],
          line,
          [false],
          '#787878',
          [],
          2,
        );
      });

      forEach(endLineArr, (line) => {
        drawScaleLine(
          null,
          context,
          [baseLeft, baseTop + (xCount - 1) * xStep],
          [yStep, xStep / 2],
          line,
          [false],
          '#787878',
          [8],
          2,
        );
      });
      drawItemLine(allBpdArr, bpdData, 'BPD');
      drawItemLine(allFlArr, flData, 'FL');
      drawItemLine(allAcArr, acData, 'AC');
    } else if (currentCurve === 'hc') {
      middleLineArr = [get(hcData, 'middleLine'), get(hlData, 'middleLine')];
      endLineArr = [
        get(hcData, 'bottomLine'),
        get(hcData, 'topLine'),
        get(hlData, 'bottomLine'),
        get(hlData, 'topLine'),
      ];
      forEach(middleLineArr, (line) => {
        drawScaleLine(
          null,
          context,
          [baseLeft, baseTop + (xCount - 1) * xStep],
          [yStep, xStep / 2],
          line,
          [false],
          '#787878',
          [],
          2,
        );
      });

      forEach(endLineArr, (line) => {
        drawScaleLine(
          null,
          context,
          [baseLeft, baseTop + (xCount - 1) * xStep],
          [yStep, xStep / 2],
          line,
          [false],
          '#787878',
          [8],
          2,
        );
      });
      drawItemLine(allHlArr, hlData, 'HL');
      drawItemLine(allHcArr, hcData, 'HC');
    } else {
      middleLineArr = [get(efwData, 'middleLine')];
      endLineArr = [get(efwData, 'bottomLine'), get(efwData, 'topLine')];
      forEach(middleLineArr, (line) => {
        drawScaleLine(
          null,
          context,
          [baseLeft, baseTop + (xCount - 1) * xStep],
          [yStep, xStep / 2],
          line,
          [false],
          '#787878',
          [],
          2,
        );
      });

      forEach(endLineArr, (line) => {
        drawScaleLine(
          null,
          context,
          [baseLeft, baseTop + (xCount - 1) * xStep],
          [yStep, xStep / 2],
          line,
          [false],
          '#787878',
          [8],
          2,
        );
      });
      drawItemLine(allEfwArr, efwData, 'EFW');
    }

    imageRef.current = canvas?.toDataURL('image/jpg');
    props.onLoad && props.onLoad();
  };


  function handleIndexBtn(e: any) {
    set_currentCurve(e.target.value)
  };

  function renderPointModal() {

    const handleCancel = () => {
      set_isShowPointModal(false)
    };

    return (isShowPointModal && pointData) ? (
      <Modal
        style={pointData.style}
        className="point-modal"
        visible={isShowPointModal}
        footer={null}
        onCancel={handleCancel}
      >
        <span className="info-item">孕周：{pointData.x}</span>
        <span className="info-item">
          {pointData.line}：{pointData.y}
        </span>
        <span>胎儿信息：胎儿{pointData.fetus}</span>
      </Modal>
    ) : null;
  }



  return (
    <div className="fetus-wrapper">
      <p style={{ position: 'absolute', top: 8, left: 40, margin: 0 }}>
        指标：
        <Radio.Group
          className="bmi-radio"
          value={currentCurve}
          options={curveOptions}
          onChange={handleIndexBtn}
        />
      </p>
      {!get(props, 'hidePrintBtn') && (
        <Space style={{ position: 'absolute', top: 8, right: 50 }}>
          <ReactToPrint
            trigger={() => (
              <Button type="primary" size="small">
                <MyIcon value='PrinterOutlined' />
                打印
              </Button>
            )}
            content={() => printCanvas('fetus-canvas')}
          />
          {!isAllPregnancies && (
            // <Button size="small" onClick={() => handleEditBtn()}>
            //   <EditOutlined />
            //   编辑
            // </Button>
            <FetuGrowsEdit value={formData} onSubmit={getFetusData} />

          )}
        </Space>
      )}

      <canvas id="fetus-canvas" className="fetus-canvas">
        您的浏览器不支持canvas，请更换浏览器.
      </canvas>
      {renderPointModal()}
      <span className="fetus-wrapper-note">依据：NICHD亚裔胎儿生长曲线</span>
    </div>
  );
}


// export default connect(null, mapDisPathchToProps)(Index);
