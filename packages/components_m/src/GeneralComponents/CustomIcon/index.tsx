import { MyIcon } from '@lm_fe/components';
import React from 'react';
let CustomIconCache: typeof defaultC
function defaultC(porps: { className?: string, type: string }) {

  return <MyIcon value={porps.type} />
}
export const CustomIcon = defaultC
// export function configCustomIcon(scriptUrl: any) {
//   if (!scriptUrl) return
//   if (isFunction(scriptUrl)) {
//     scriptUrl().then((u: any) => {
//       CustomIconCache = createFromIconfontCN({
//         scriptUrl: u,
//       }) as any;
//     })
//   }
//   CustomIconCache = createFromIconfontCN({
//     scriptUrl,
//   }) as any;
// }
