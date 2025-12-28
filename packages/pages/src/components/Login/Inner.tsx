import { MyIcon } from "@lm_fe/components";
import { mchcEnv } from "@lm_fe/env";
import { use_provoke } from "@lm_fe/provoke";
import { Button, Card, Checkbox, Form, Input } from "antd";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import styles from './index.module.less';

interface IProps {
    logo?: string
    onFinish(values: any): Promise<void>
}
export default function LoginInner(props: IProps) {

    const { logo, onFinish } = props
    const { config, sys_theme } = use_provoke('config', 'sys_theme',)


    useEffect(() => {


        return () => {

        }
    }, [])

    return <div className={classNames(styles["container"])}>
        <div style={{ background: sys_theme.colorPrimary }} className={classNames(styles["left-panel"])}>
            <div className={classNames(styles["decorations "])}>
                <div className={classNames(styles["dot"], styles["dot-1"])}></div>
                <div className={classNames(styles["dot"], styles["dot-2"])}></div>
                <div className={classNames(styles["dot"], styles["dot-3"])}></div>
            </div>
        </div>
        <div className={classNames(styles["right-panel"])} style={{ background: sys_theme.darkTheme ? '#222' : '#fff' }}>
            <div />
            <Card className={classNames(styles["login-form"], styles["animate-in"])}>

                <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 24, color: sys_theme.colorPrimary }}>
                    {logo ? <img alt="logo" src={logo} /> : null}
                    {config?.systemName}
                </h2>
                <LoginForm onFinish={onFinish} />
            </Card>
            <footer className={classNames(styles["footer"])}>
                {/* {APP_CONFIG.COPYRIGHT} */}
                <div>
                    备案号：
                    <Button type='link' href="https://beian.miit.gov.cn">
                        粤ICP备17048892号-1
                    </Button>
                </div>
                Copyright © 2020{' '}
                <Button size='small' type='link' href="http://www.lian-med.com/">
                    广州莲印医疗科技有限公司
                </Button>
                , 版权所有
            </footer>
        </div>
    </div>
}

function LoginForm(props: { onFinish(values: any): Promise<void> }) {
    const { onFinish } = props

    const [loading, setLoading] = useState(false)
    return <Form initialValues={mchcEnv.loginRemember!} className="login-main-center-form" onFinish={values => {
        if (values.remember) {
            mchcEnv.loginRemember = values
        }
        setLoading(true)
        onFinish(values).finally(() => setLoading(false))
    }}>
        <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!', },]}
        >
            <Input autoFocus allowClear size="large" prefix={<MyIcon value='UserOutlined' />} placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
                {
                    required: true,
                    message: '请输入密码！',
                },
                { type: 'string' },
                // { min: 5, message: '密码不能少于5位' },
                // { max: 16, message: '密码不能超过16位' },
            ]}
        >
            <Input.Password visibilityToggle={false} allowClear size="large" prefix={<MyIcon value='SafetyOutlined' />} placeholder="请输入密码" />
        </Form.Item>
        <Form.Item hidden={!__LOCAL__} valuePropName="checked" name="remember" label={`记住密码（${__LOCAL__}）`}>
            <Checkbox onChange={e => {
                const checked = e.target.checked
                if (!checked) {
                    mchcEnv.loginRemember = undefined
                }
            }} />
        </Form.Item>
        <Form.Item>
            <Button
                block
                size="large"
                className="login-main-center-button"
                type="primary"
                loading={loading}
                htmlType="submit"
            >
                登 录
            </Button>
        </Form.Item>
    </Form>
}