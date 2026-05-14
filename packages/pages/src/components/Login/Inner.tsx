import { MyIcon } from "@lm_fe/components";
import { mchcEnv } from "@lm_fe/env";
import { use_provoke } from "@lm_fe/provoke";
import { Button, Checkbox, Form, Input } from "antd";
import classNames from "classnames";
import React, { useEffect, useState, useRef } from "react";
import styles from './index.module.less';

interface IProps {
    logo?: string
    onFinish(values: any): Promise<void>
}

export default function LoginInner(props: IProps) {
    const { logo, onFinish } = props
    const { config, sys_theme } = use_provoke('config', 'sys_theme')
    const containerRef = useRef<HTMLDivElement>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            setMousePos({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div ref={containerRef} className={styles.wrapper}>
            <div
                className={styles.background}
                style={{
                    background: `linear-gradient(135deg, ${sys_theme.colorPrimary} 0%, ${sys_theme.colorPrimary}dd 50%, ${sys_theme.colorPrimary}bb 100%)`
                }}
            >
                <div
                    className={styles.gradientOrb1}
                    style={{
                        background: `radial-gradient(circle, ${sys_theme.colorPrimary}40 0%, transparent 70%)`,
                        transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`
                    }}
                />
                <div
                    className={styles.gradientOrb2}
                    style={{
                        background: `radial-gradient(circle, ${sys_theme.colorPrimary}30 0%, transparent 70%)`,
                        transform: `translate(${-mousePos.x * 20}px, ${-mousePos.y * 20}px)`
                    }}
                />
                <div className={styles.gridOverlay} />
            </div>

            <div className={styles.content}>
                <div className={styles.brandSection}>
                    <div className={styles.logoContainer}>
                        {logo && <img src={logo} alt="logo" className={styles.logoImage} />}
                        <div className={styles.brandText}>
                            <h1 style={{}}>{config?.systemName}</h1>
                            <p>智慧医疗 · 数字未来</p>
                        </div>
                    </div>

                    <div className={styles.decorativeElements}>
                        <svg className={styles.dnaStrand} viewBox="0 0 100 300">
                            <path
                                d="M20,0 Q30,75 20,150 Q10,225 20,300"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                opacity="0.3"
                            />
                            <path
                                d="M80,0 Q70,75 80,150 Q90,225 80,300"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="none"
                                opacity="0.3"
                            />
                            {[...Array(10)].map((_, i) => (
                                <line
                                    key={i}
                                    x1="20"
                                    y1={i * 30}
                                    x2="80"
                                    y2={i * 30}
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    opacity="0.2"
                                />
                            ))}
                        </svg>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formCard}>
                        <div className={styles.formHeader}>
                            <h2>欢迎回来</h2>
                            <p>请登录您的账户</p>
                        </div>

                        <LoginForm onFinish={onFinish} primaryColor={sys_theme.colorPrimary} />

                        <div className={styles.formFooter}>
                            <div className={styles.divider}>
                                <span>安全登录</span>
                            </div>
                        </div>
                    </div>

                    <footer className={styles.copyright}>
                        <p>
                            备案号：
                            <a type="link" size="small" href="https://beian.miit.gov.cn">
                                粤ICP备17048892号-1
                            </a>
                        </p>
                        <p>
                            Copyright © 2020{' '}
                            <a type="link" size="small" href="http://www.lian-med.com/">
                                广州莲印医疗科技有限公司
                            </a>
                            , 版权所有
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    )
}

function LoginForm(props: { onFinish(values: any): Promise<void>, primaryColor: string }) {
    const { onFinish, primaryColor } = props
    const [loading, setLoading] = useState(false)

    return (
        <Form
            initialValues={mchcEnv.loginRemember}
            className={styles.form}
            onFinish={values => {
                if (values.remember) {
                    mchcEnv.loginRemember = values
                }
                setLoading(true)
                onFinish(values).finally(() => setLoading(false))
            }}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名' }]}
            >
                <Input
                    autoFocus
                    size="large"
                    prefix={<MyIcon value="UserOutlined" />}
                    placeholder="用户名"
                    className={styles.input}
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input.Password
                    size="large"
                    prefix={<MyIcon value="SafetyOutlined" />}
                    placeholder="密码"
                    className={styles.input}
                />
            </Form.Item>

            {__LOCAL__ && (
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox
                        onChange={e => {
                            if (!e.target.checked) {
                                mchcEnv.loginRemember = undefined
                            }
                        }}
                    >
                        记住密码
                    </Checkbox>
                </Form.Item>
            )}

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    block
                    className={styles.submitButton}
                    style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
                >
                    登录
                </Button>
            </Form.Item>
        </Form>
    )
}
