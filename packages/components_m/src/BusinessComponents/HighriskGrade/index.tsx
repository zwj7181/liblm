import { use_provoke } from '@lm_fe/provoke';
import React, { useEffect } from 'react';
function HighriskGradeDisplay(props: { data?: string, type: 'contagion' | 'highriskGrade' }) {

  const { 可选传染病, 可选高危等级, } = use_provoke('可选传染病', '可选高危等级',)

  const { data, type = 'highriskGrade', } = props;
  if (!data || ['无', '未查'].includes(data)) return <span>{data}</span>
  useEffect(() => {

    return () => {

    }
  }, [])

  function getGradeColor(grade: any) {
    return 可选高危等级?.find(_ => _.levelText === grade);
  };



  let bgcColor = type === 'contagion' ? 可选传染病?.color : getGradeColor(data)?.color;



  return <p style={{ color: '#fff', backgroundColor: bgcColor, textAlign: 'center', marginBottom: '3px' }}>
    {type === 'highriskGrade' ? getGradeColor(data)?.colorText : data}
  </p>;
}
export { HighriskGradeDisplay }
