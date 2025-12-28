import React from 'react';
import { AutoComplete } from 'antd';
import { MyAutoComplete } from 'src/FU_components/MyAutoComplete';
// export default function SelectWithOptionsOrInput(props: any) {
//   const { onChange, inputProps, value, getPopupContainer = () => document.body, ...rest } = props;
//   console.log({ props });
//   const handleChange = (data: string) => {
//     onChange && onChange(data);
//   };
//   return (
//     <AutoComplete
//       {...rest}
//       getPopupContainer={getPopupContainer}
//       popupMatchSelectWidth={inputProps?.popupMatchSelectWidth || 120}
//       options={inputProps?.options || props?.options || []}
//       onChange={handleChange}
//       value={value}
//     />
//   );
// }
export default MyAutoComplete