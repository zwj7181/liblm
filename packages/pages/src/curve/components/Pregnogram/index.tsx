import { MyIcon } from '@lm_fe/components';
import { use_provoke } from '@lm_fe/provoke';
import { Button } from 'antd';
import { cloneDeep, forEach, get } from 'lodash';
import React, { useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { draw_info, get_abnormal_color, get_canvas_el, get_fetus_color, get_line_color, get_text_color } from 'src/curve/utils';
import { fundalHeightData } from '../../data';
import { judgeAreas, printCanvas, setHorRules, setVerRules } from '../../func';
import { curve_api } from '../api';
import './index.less';

interface IProps { hidePrintBtn?: boolean, isAllPregnancies?: boolean, onLoad?(): void, headerInfo?: any, id?: any }

export default function Pregnogram(props: IProps) {
  const sys_theme = use_provoke(s => s.sys_theme)
  const { headerInfo, id, isAllPregnancies } = props;
  const pregnancyId = get(headerInfo, 'id') || id;

  const line_color = get_line_color(sys_theme)
  const font_color = get_text_color(sys_theme)

  const fundalHeightList = useRef<{ fundalHeight: "18", week: "20", x: number, y: number }[]>([])
  const imageRef = useRef<any>()

  useEffect(() => {

    // drawPregnogramCanvas();

    curve_api.curve.getFundalHeight(pregnancyId).then(res => {
      fundalHeightList.current = get(res, 'items')
      drawPregnogramCanvas();

    });

    return () => {

    }
  }, [])

  function drawPregnogramCanvas() {
    let cloneList = cloneDeep(fundalHeightList.current);
    cloneList.map((item: any) => {
      if (!item.fundalHeight || !item.week) {
        item.fundalHeight = 0;
        item.week = -1;
      } else {
        item.fundalHeight = Number(item.fundalHeight) - 12;
        if (item.week.indexOf('+') !== -1) {
          const arr = item.week.split('+');
          item.week = Number(arr[0]) + Number(arr[1]) / 7;
        }
        item.week = item.week - 15;
      }
    });
    cloneList = cloneList.filter(
      (i: any) => i.week >= 0 && i.week <= 27 && i.fundalHeight >= 0 && i.fundalHeight <= 30,
    );
    // 统一曲线 x,y 表示
    cloneList.length > 0 &&
      cloneList.map((item: any) => {
        item.x = item.week;
        item.y = item.fundalHeight;
      });
    const unusualColor =
      cloneList.length > 0 && judgeAreas(cloneList[cloneList.length - 1], get(fundalHeightData, 'lineArea'))
        ? get_fetus_color(sys_theme, 0)
        : get_abnormal_color(sys_theme);

    const canvas = get_canvas_el('pregnogram-canvas', sys_theme);
    const context = canvas.getContext('2d');
    if (!context) return
    canvas.width = 700;
    canvas.height = 710;

    const baseLeft = 60;
    const baseTop = 190;
    const xStep = 16;
    const yStep = 20;
    const xCount = 31;
    const yCount = 28;

    context.fillStyle = font_color;
    context.font = 'bold 16px normal';
    context.textAlign = 'center';
    context.fillText(`${draw_info(headerInfo,)}`, canvas.width / 2, baseTop - 120);
    context.fillText('妊娠图', canvas.width / 2, baseTop - 80);

    setVertical(context, xCount, yCount, xStep, yStep, baseLeft, baseTop);
    setHorizontal(context, xCount, yCount, xStep, yStep, baseLeft, baseTop);
    setVerRules(context, [baseLeft, baseTop + (xCount - 1) * xStep], (yCount - 1) * yStep, line_color, 1, yStep, 5);
    setHorRules(context, [baseLeft, baseTop + (xCount - 1) * xStep], (xCount - 1) * xStep, line_color, 1, xStep, 5);

    drawScaleLine(
      canvas,
      context,
      [baseLeft, baseTop + (xCount - 1) * xStep],
      [yStep, xStep],
      cloneList,
      [true, unusualColor],
      unusualColor,
      [],
      2,
    );

    const solidLineArr = [get(fundalHeightData, 'topSolidLine'), get(fundalHeightData, 'bottomSolidLine')];
    forEach(solidLineArr, (line) => {
      drawScaleLine(
        canvas,
        context,
        [baseLeft, baseTop + (xCount - 1) * xStep],
        [yStep, xStep],
        line,
        [true, '#787878'],
        '#787878',
        [],
        2,
      );
    });

    const dashLineArr = [get(fundalHeightData, 'topDashLine'), get(fundalHeightData, 'bottomDashLine')];
    forEach(dashLineArr, (line) => {
      drawScaleLine(
        canvas,
        context,
        [baseLeft, baseTop + (xCount - 1) * xStep],
        [yStep, xStep],
        line,
        [true, '#787878'],
        '#787878',
        [8],
        2,
      );
    });
    imageRef.current = canvas?.toDataURL('image/jpg');
    props.onLoad && props.onLoad();
  }

  //绘制曲线
  function drawScaleLine(
    canvas: any,
    ctx: CanvasRenderingContext2D,
    oringin: any[],
    steps: any[],
    data: any,
    point: [false] | [true, string],
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
      context.font = 'bold 12px consolas';
      if (i % 2 !== 0) {
        context.fillText(i + 12, baseLeft - 20, (xCount - 1) * xStep + baseTop - i * xStep);
      }
      context.stroke();
    }
    context.font = 'bold 12px normal';
    context.fillText('宫高(cm)', baseLeft - 20, baseTop - 20);
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
      context.font = 'bold 12px consolas';
      if (i % 2 !== 0) {
        context.fillText(i + 15, baseLeft + i * yStep, xStep * xCount + baseTop);
      }
      context.stroke();
    }
    context.font = 'bold 12px normal';
    context.fillText('孕周(周)', yStep * yCount + baseLeft + 15, (xCount - 1) * xStep + baseTop);
  };


  return (
    <div className="pregnogram-wrapper">
      {!get(props, 'hidePrintBtn') && (
        <ReactToPrint
          trigger={() => (
            <Button size="small" type="primary" className="print-btn">
              <MyIcon value='PrinterOutlined' />
              打印
            </Button>
          )}
          content={() => printCanvas('pregnogram-canvas')}
        />
      )}

      <canvas id="pregnogram-canvas" className="pregnogram-canvas">
        您的浏览器不支持canvas，请更换浏览器.
      </canvas>
    </div>
  );
}
