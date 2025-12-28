import { mchcEnv } from '@lm_fe/env';
import { use_provoke } from '@lm_fe/provoke';
import { MyIcon } from '@noah-libjs/components';
import { Button, Space } from 'antd';
import React, { useEffect, useRef } from 'react';
import { CaseTempleteEditEmr } from 'src/CaseTempleteEditEmr';
import { defaultToolbars } from './config';
import './index.less';
import { ICaseEditProps, IFuck_Xsde } from './types';
import { load_sde } from './utils';


export default function CaseTempleteEdit(props: ICaseEditProps) {
    const { config } = use_provoke('config')
    if (config.模板编辑器 === 'XEMR') return <CaseTempleteEditEmr {...props} />
    const { toolbars, hiddenButton, onChange, value, mode, containerProps = {}, hidentoolbars } = props;
    const editRef = useRef<HTMLDivElement>(null)
    const fuck_editor = useRef<IFuck_Xsde>()

    const value_cache = useRef(value)
    value_cache.current = value


    useEffect(() => {
        //@ts-ignore
        window.apiToken = mchcEnv.token;
        load_sde().then(init_sde)
        return () => {

        }
    }, [])

    useEffect(() => {


        fuck_editor.current?.html(value);

        return () => {

        }
    }, [value])





    function init_sde() {

        // console.log('mode', { mode, hidentoolbars }); //模式
        // console.log(' editRef,', editRef,);
        //@ts-ignore
        fuck_editor.current = new window.SDE({
            el: editRef.current,
            mode,
            iframe_css_src: '/lib/sde/index.css', //扩展CSS
            page_start_num: 1, //页面起始页，默认为1
            //这里可以处理url，对url进行再加工。如果此时执行 isLoadAsyncData(true)，则表示代替sde自带的异步请求方法，
            ctrl_remote_handle: function (data: any) { },
            default_open_toolbar: 'sde-toolbar-tools', //默认打开的toolbar的集合，如果不填，默认使用第一个集合
            toolbars: toolbars || defaultToolbars,
        })
        console.log('gg gg', fuck_editor, containerProps)
        // console.log("sde",sde.addListener('ready'));
        //编辑器初始化完成后触发
        fuck_editor.current?.addListener('ready', function () {



            fuck_editor.current?.html(value_cache.current);
        });

        const editorElement = document.getElementsByClassName('sde-editor')[0] as HTMLDivElement;
        const { height = 0, width = 0 } = containerProps

        // editorElement.style.height = `${height - 143}px`;

        if (mode === 'STRICT') {
            const toolbarElement = document.getElementsByClassName('sde-toolbars')[0] as HTMLDivElement;
            toolbarElement.style.display = 'none';
            editorElement.style.height = `${height}px`;
        }
        if (hidentoolbars) {
            setTimeout(() => {
                const toolbarElement = document.getElementsByClassName('sde-toolbars')[0] as HTMLDivElement;
                toolbarElement.style.display = 'none';
            }, 0);
        }
    };

    function save() {


        const str = fuck_editor.current?.html();

        onChange?.(str);
    };

    function handlePrint() {
        fuck_editor.current?.execCommand('print');
    };



    return (
        <div className="case-templete-container" style={{ overflow: 'hidden auto', height: '100%', ...containerProps }}>
            <div
                className="sde-container"
                key={props.sdeKey || Math.random()}
                ref={editRef}

            ></div>
            {/* <div className="case-templete-container_actions"> */}
            {!hiddenButton && (
                <Space.Compact style={{ position: 'fixed', right: 36, bottom: 36 }}>

                    <Button
                        onClick={handlePrint}
                        icon={<MyIcon value='PrinterOutlined' />}
                    >
                        打印
                    </Button>
                    <Button
                        type="primary"
                        onClick={save}
                        icon={<MyIcon value='SaveOutlined' />}
                    >
                        保存
                    </Button>
                </Space.Compact>

            )}
        </div>
    );
}
