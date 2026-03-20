import React, { useState, useEffect, useRef } from 'react'
import { Transfer, Button, Flex, Input, Popconfirm, message } from 'antd'
import type { InputRef } from 'antd'
import { MyIcon } from '@lm_fe/components'
import { request } from '@lm_fe/utils'
import { mchcModal__ } from 'src/modals'
import map from 'lodash/map'
import styles from './index.module.less'

// 获取门诊病历头部个人信息栏标签
async function getTagLabels(key?: string) {
    // const ret = await request.get<boolean>('/api/doctor/getOutpatientHeaderLabels', { params: { visitId: id || null } })
    const ret = await request.get('/api/label/findLabels', { params: { 'keyword.contains': key } })
    return ret.data
}

type CustomTagProps = {
    id: string // 孕册id
    dataSource: any[] // 标签数据
}

function CustomTag({ id, dataSource, ...props }: CustomTagProps) {
    const [tagLib, setTagLib] = useState([])

    useEffect(() => {
        getTagLib()

        return () => {}
    }, [])

    // 获取标签库所有标签
    async function getTagLib(key?: string) {
        const d = (await getTagLabels(key)) || []
        setTagLib(d)
    }

    function open标签库管理() {
        mchcModal__.open('test', {
            title: '标签库管理',
            width: 420,
            modal_data: {
                content: <CustomTagLib dataSource={tagLib} />,
            },
        })
    }

    return (
        <Flex gap="middle" vertical>
            <p>点击下方标签内容标记患者标签</p>
            <Transfer status="warning" dataSource={tagLib} render={(item) => item.name} />
            <div>
                <Button icon={<MyIcon value="EditOutlined" />} onClick={open标签库管理}>
                    标签库维护
                </Button>
            </div>
        </Flex>
    )
}

function CustomTagLib({ dataSource }) {
    const [flag, setFlag] = useState('')

    async function addTagLabel(value: string) {
        await request
            .post('/api/label/saveLabel', {
                name: value,
                type: 0,
            })
            .then((res) => {
                message.success('添加成功')
            })
    }

    function handleSearch(value: string) {}

    function handleAddTag(value: string) {
        if (value) {
            addTagLabel(value)
        }
    }

    function handleEdit(key: string, value: string) {}

    function handleChange(key: string, value: string) {}

    function handleDelete(id: string) {
        request
            .post('/api/label/deleteLabel', {
                id: id,
            })
            .then((res) => {
                message.success('删除成功')
            })
    }

    function handleSubmit(value) {
        console.log('----onPress', value)
    }

    return (
        <div>
            <Input.Search
                placeholder="输入关键字查询标签"
                enterButton={
                    <>
                        <MyIcon value="SearchOutlined" /> 查询
                    </>
                }
                onSearch={handleSearch}
            />
            <ul className={styles['custom-tag-lib']}>
                {map(dataSource, (item) => {
                    return (
                        <li key={item.id}>
                            <CustomTagLibItem item={item} onPressEnter={handleSubmit} />
                        </li>
                    )
                })}
            </ul>
            <Input.Search
                placeholder="输入新增的标签后回车或者点击添加按钮"
                enterButton={
                    <>
                        <MyIcon value="PlusOutlined" /> 添加
                    </>
                }
                onSearch={handleAddTag}
            />
        </div>
    )
}

function CustomTagLibItem({ item, onDelete, onPressEnter, onChange, onEdit }: any) {
    const inputRef = useRef<InputRef>(null)
    const [editable, setEditable] = useState(false)

    return (
        <div className={styles['custom-tag-lib-item']}>
            <Input
                ref={inputRef}
                variant="borderless"
                disabled={!editable}
                style={{ flex: 1 }}
                defaultValue={item.name}
                onChange={(e) => onChange?.(item.id, e.target.value)}
                onPressEnter={onPressEnter}
            ></Input>
            <Button
                size="small"
                type="link"
                icon={<MyIcon value="EditOutlined" />}
                onClick={() => {
                    setEditable(true)
                    setTimeout(() => {
                        inputRef.current!.focus({
                            cursor: 'end',
                        })
                    }, 200)
                }}
            ></Button>
            <Popconfirm
                title="提示"
                description="确定删除该标签?"
                onConfirm={() => onDelete?.(item.id)}
                okText="是"
                cancelText="否"
            >
                <Button size="small" type="text" icon={<MyIcon value="DeleteOutlined" />}></Button>
            </Popconfirm>
        </div>
    )
}

export { CustomTag, CustomTagLib }
