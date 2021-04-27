import React, { Component } from 'react'
import {Form,Select,Input} from 'antd'

const { Option } = Select;

const AddForm = (px) => {
        return (
            <Form>
                <Form.Item>
                    <Select defaultValue="other">
                        <Option value="male" name="remember">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                    </Select>
                </Form.Item>
                <Form.Item rules={[{ required: true, message: '请输入分类名称' }]}>
                    <Input/>
                </Form.Item>
            </Form>
        )
    }
export default AddForm
