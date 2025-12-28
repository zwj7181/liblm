import React, { Component, useEffect, useRef, useState } from 'react';
import { Upload } from 'antd';
import store from 'store';
import { get } from 'lodash';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module';
import 'react-quill/dist/quill.snow.css';
import './index.less';
import { APP_CONFIG, getMacroValue, mchcEnv, mchcLogger } from '@lm_fe/env';
mchcLogger.log('quill !!!!')


Quill.register('modules/ImageResize', ImageResize);
const modules = {
  toolbar: [
    [{ size: [] }],
    // [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }, { align: [] }],
    // [{ list: 'ordered' }, { indent: '-1' }, { indent: '+1' }],
    [{ list: 'ordered' }],
    ['link', 'image', 'video'],
    // ['clean'],
  ],
  ImageResize: {},
};
const formats = [
  'size',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'align',
  'list',
  'indent',
  'link',
  'image',
  'video',
  'clean',
];
interface IProps {
  value?: any
  onChange?(v: any): void
}
export default function MobileEditorInner({ value, onChange }: IProps) {
  const [data, setData] = useState<string>()
  const uploadRef = useRef<HTMLSpanElement>(null)
  const quillRef = useRef<ReactQuill>(null)


  useEffect(() => {

    setData(value)
    return () => {

    }
  }, [value])

  console.log('data 223', { data })
  useEffect(() => {

    const quillEditor = quillRef.current?.getEditor();
    const quillEditorToolbar = quillEditor?.getModule('toolbar');
    quillEditorToolbar?.addHandler('image', () => {
      uploadRef.current?.click();
    });
    return () => {

    }
  }, [])



  function handleUploadImage(data: any) {
    if (get(data, 'file.status') === 'done') {
      const imageUrl = get(data, 'file.response.url');
      const quillEditor = quillRef.current?.getEditor();
      let range = quillEditor?.selection?.savedRange.index;
      if (range || range == 0) {
        quillEditor?.insertEmbed(range, 'image', imageUrl);
      }
      quillEditor?.setSelection(quillEditor?.getSelection?.()?.index! + 1, 1);
    }
  };

  return (
    <div className="mobile-editor">
      <ReactQuill
        ref={quillRef}
        className="mobile-editor_quill"
        theme="snow"
        modules={modules}
        // defaultValue={data}
        value={data || ''}
        onChange={onChange}
        formats={formats}
      />
      <div style={{ display: 'none' }}>
        <Upload
          action="/api/uploadImage"
          listType="text"
          accept=".png,.jpg,.jpeg,gif,.svg"
          onChange={handleUploadImage}
          headers={{
            Authorization: mchcEnv.token!,
          }}
        >
          <span ref={uploadRef} ></span>
        </Upload>
      </div>
    </div>
  );
}

