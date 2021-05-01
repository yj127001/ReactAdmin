import React, { Component } from 'react'
import {Form,Select,Input} from 'antd'
import PropTypes from 'prop-types'

// const { Option } = Select;

const AddForm = (props) => {
    const parentId = props.parentId

    console.log('kkkkkkk',parentId,props.setForm)

    AddForm.propTypes = {
        parentId:PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired
    }

    const [form] = Form.useForm();
    props.setForm(form)
        return (
            // <Form form={form}>{/*一定要写 form={form} ，不然无法获取表单数据*/}
            //     <Form.Item>
            //         <Select defaultValue="0">
            //             <Option value="0">一级分类</Option>
            //             {categories.map(item=><Option value={item.id} key={item.id}>{item.name}</Option>)}
            //         </Select>
            //     </Form.Item>
            //     <Form.Item name='categoryNamedd'>
            //         <Input/>
            //     </Form.Item>
            // </Form>
            <Form form={form}>
            <Form.Item name='addCategoryName'>
                <Input/>
            </Form.Item>        
        </Form>
        )
    }
export default AddForm
