import { get, reverse, concat, cloneDeep } from 'lodash';
export type TPoint = { x: number; y: number, value?: any, sort?: any, gestationalWeek?: any };
/**
 * 判断点是否在多边形内部（射线法/交点法）
 * @param point - 待判断的点
 * @param polygon - 多边形的顶点数组
 * @returns boolean - true表示点在多边形内，false表示点在多边形外
 */
export function judgeAreas(point: TPoint, polygon: TPoint[]): boolean {
  // 射线法计数器，统计射线与多边形边的交点个数
  let intersectCount = false;
  const polygonLength = polygon.length;

  // 遍历多边形的每条边
  for (let i = 0; i < polygonLength; i++) {
    // j是当前边的起点，i是终点
    const j = (i + polygonLength - 1) % polygonLength;
    const vertex1 = polygon[i];
    const vertex2 = polygon[j];

    // 判断点的y坐标是否在当前边的y坐标范围内
    const isYInRange = (vertex1.y <= point.y && point.y <= vertex2.y) ||
      (vertex2.y <= point.y && point.y < vertex1.y);

    if (isYInRange) {
      // 计算交点的x坐标
      const intersectX = ((vertex2.x - vertex1.x) * (point.y - vertex1.y)) /
        (vertex2.y - vertex1.y) + vertex1.x;

      // 如果交点在点的左侧，则改变计数器状态
      if (point.x <= intersectX) {
        intersectCount = !intersectCount;
      }
    }
  }

  return intersectCount;
}

/*
 *绘制水平坐标轴标尺
 * @param  ctx         canvas上下文
 * @param  origin      坐标系原点
 * @param  Len         坐标轴长度
 * @param  color       坐标轴颜色
 * @param  lineWidth   坐标轴粗度
 * @param  step        坐标轴数目
 * @param  int         坐标轴刻度线长度
 */
export function setVerRules(
  ctx: any,
  origin: any[],
  Len: number,
  color: string,
  lineWidth: number,
  step: number,
  int: number,
) {
  // 创建水平坐标轴路径
  ctx.moveTo(origin[0], origin[1]);
  ctx.lineTo(origin[0] + Len, origin[1]);

  // 创建坐标轴的刻度线路径
  for (let i = origin[0] + step; i <= Len + origin[0]; i += step) {
    ctx.moveTo(i, origin[1]);
    ctx.lineTo(i, origin[1] + int);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.beginPath();
}

/*
 *绘制垂直坐标轴标尺
 * @param  ctx         canvas上下文
 * @param  origin      坐标系原点
 * @param  Len         坐标轴长度
 * @param  color       坐标轴颜色
 * @param  lineWidth   坐标轴粗度
 * @param  step        坐标轴数目
 * @param  int         坐标轴刻度线长度
 */
export function setHorRules(
  ctx: any,
  origin: [number, number],
  Len: number,
  color: string,
  lineWidth: number,
  step: number,
  int: number,
) {
  // 创建水平坐标轴路径
  ctx.moveTo(origin[0], origin[1]);
  ctx.lineTo(origin[0], origin[1] - Len);

  // 创建坐标轴的刻度线路径
  for (let i = origin[1] - step; i >= origin[1] - Len; i -= step) {
    ctx.moveTo(origin[0] - int, i);
    ctx.lineTo(origin[0], i);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.beginPath();
}

/*
 *打印canvas图片
 */
export function printCanvas(id: string) {
  const canvas = document.getElementById(id) as HTMLCanvasElement;
  const image = new Image();
  image.src = canvas.toDataURL('image/png');
  return image;
}

/*
 *返回两条直线所围成的区域
 */
export function getLineArea(line1: any[], line2: any[]) {
  const firstPoint = [get(line1, 0)];
  const reverseLine = reverse(cloneDeep(line2));
  return concat(line1, reverseLine, firstPoint);
}

