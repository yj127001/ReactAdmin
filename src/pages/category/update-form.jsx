import React from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'

const UpdateForm = (props) => {
    const categoryName = props.name

    UpdateForm.propTypes = {
        categoryName:PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired
    }
    /*抄袭官网的一句话*/
    const [form] = Form.useForm();
    /*抄袭官网的一句话*/
    console.log('传递px过来的值', props)
    props.setForm(form)
    return (
        <Form form={form}>
            <Form.Item name="updateCa">
                <Input defaultValue={categoryName}/>
            </Form.Item>        
        </Form>
    )
}

export default UpdateForm


