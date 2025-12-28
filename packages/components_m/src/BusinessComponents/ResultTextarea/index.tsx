import React from 'react';
interface IProps {
  label?: string;
  name?: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  patientId?: string | number;
  placeholder?: string;
  form?: any; // 暂时未用到
}
export default function Result({
  label = '',
  name,
  value,
  onChange = () => { },
  disabled,
  patientId,
  placeholder,
  form,
  ...rest
}: IProps) {

  return (
    <div >
      old
    </div>
  );
}
