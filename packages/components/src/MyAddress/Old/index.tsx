import { lazy } from 'react';
import { get_old_address_options } from './options';

const MyAddressOld = lazy(() => import('./InnerOld'))

export { MyAddressOld, get_old_address_options };
