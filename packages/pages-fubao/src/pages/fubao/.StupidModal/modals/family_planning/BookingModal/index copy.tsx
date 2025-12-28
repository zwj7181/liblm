import {
  IModel_EarlyPregnancyCheckSurgeryType,
  SModel_EarlyPregnancyCheckSurgeryType,
  SModel_EarlyPregnancySurgicalTemplate,
  SModel_FamilyPlaningSchedulingDetails,
} from '../../../../.stupid_model';
import React, { useEffect, useState } from 'react';
import { IBaseProps } from '../../../types';
import Form0, { TCommonData } from './Form0';
import Form1 from './Form1';
import Form2 from './Form2';
import StepModal from './StepModal';
interface IProps {
  step: number;
  data: Partial<IModel_EarlyPregnancyCheckSurgeryType>;
}
export const BookingModal = (props: IBaseProps<IProps>) => {
  const { onOk, onCancel, visible, modalData } = props;
  const { step } = modalData;
  const [commonData, setCommonData] = useState<TCommonData>();

  useEffect(() => {
    const data = modalData?.data;

    Promise.all([SModel_EarlyPregnancyCheckSurgeryType.getOptionalDoctorAndNurse()]).then((arr) => {
      setCommonData({
        data,
        optionalDoctor: arr[0].DOCTOR,
        optionalNurse: arr[0].NURSE,
      });
    });

    return () => { };
  }, [modalData]);
  return (
    <StepModal<TCommonData, any>
      title="手术进度"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      initData={commonData}
      step={step}
      data={[
        { title: '手术预约', Component: Form0 },

        { title: '术前签到', Component: Form1 },

        // { title: '手术病历', Component: Form2 },
      ]}
    />
  );
};
export default BookingModal;
