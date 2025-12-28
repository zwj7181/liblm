import React, { useEffect, useState } from 'react';
import { getTemplates, transferTemplates, rootTemplate } from '../methods';
import { LazyAntd } from '@lm_fe/components';

const { Tree, TreeSelect, Select, Table, Dropdown, Pagination } = LazyAntd
export default function TemplateSelect(props) {
  const { onChange, templateType, userid } = props;
  const [value, setValue] = useState(props.value || 0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getTemplates({ templateType, userid }).then((res) => {
      setOptions([
        {
          ...rootTemplate,
          children: transferTemplates(res),
        },
      ]);
    });
  }, []);

  const handleChange = (data) => {
    setValue(data);
    onChange && onChange(data);
  };

  return <TreeSelect treeDefaultExpandAll value={value} treeData={options} onChange={handleChange} />;
}
