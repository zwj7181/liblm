import { ArraySingle, IArraySingleProps, TCommonComponent } from '@noah-libjs/components';
import React from 'react';
import { pack_components } from '../pack_components';


const ArraySingle_Inner: TCommonComponent<IArraySingleProps, string> = (props) => {
    return <ArraySingle {...props} component_map={pack_components} />
}
export default ArraySingle_Inner
