import { MyIcon } from '@lm_fe/components';
import { mchcEnv, mchcLogger } from '@lm_fe/env';
import { identity, isArray, isEmpty, isString, uuid } from '@lm_fe/utils';
import { Button, Upload, UploadFile } from 'antd';
import { UploadProps } from 'antd/lib';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';

interface IProps extends Omit<UploadProps, 'onChange'> {
  value?: string | string[],
  onChange?(v: string | string[] | null): void
  mode?: 'single' | 'multiple'
  linker?: string
}
export default (props: IProps) => {
  const { onChange, value, linker, mode = 'single', ...others } = props;
  const [list, set_list] = useState<UploadFile[]>([]);

  useEffect(() => {
    console.log(value);
    if (mode === 'single') {
      if (isString(value)) {
        set_list(
          [
            {
              uid: uuid(),
              url: value,
              name: value,
            },
          ]
        )
      } else {
        set_list([])
      }
    } else {
      const _arr = isArray(value)
        ? value
        : (
          (isString(value) && linker)
            ? value.split(linker)
            : []
        )

      let arr = _arr.map(v => {
        return {
          uid: uuid(),
          url: v,
          name: v,
        }
      })
      set_list(arr)
    }

  }, [value]);

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    mchcLogger.log('fileList change', fileList, fileList.map(_ => _.response))
    set_list(fileList);

    if (isEmpty(fileList)) {
      onChange?.(null);
      return
    }

    if (mode === 'single') {
      let url = get(fileList, '0.response.url')
      url && onChange?.(url);
    } else {
      let arr = fileList.map((_) => get(_, 'url') || get(_, 'response.url')).filter(identity)
      if (!isEmpty(arr)) {
        onChange?.(linker ? arr.join(linker) : arr);

      }

    }

  };

  return (
    <Upload
      action="/api/uploadVideo"
      listType="text"
      fileList={list}
      onChange={handleChange}
      headers={{
        Authorization: mchcEnv.token ?? '',
      }}
      {...others}
    >
      <Button disabled={mode === 'multiple' ? false : (list.length > 0)} icon={<MyIcon value='UploadOutlined' />}>
        选择文件
      </Button>
    </Upload>
  );
};
