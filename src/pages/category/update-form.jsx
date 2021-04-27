import React, { Component } from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'


export default class UpdateForm extends Component {
    static propTypes = {
        categoryName:PropTypes.string.isRequired
    }
    render() {
        const {categoryName} = this.props
        console.log('查看传递过来的this.props值',this.props)
        console.log('验证',categoryName)
        

        return (
            <Form initialValues={{categoryName}}>
                <Input placeholder='修改分类名称' defaultValue={categoryName}/>
            </Form>
        )
    }
}
