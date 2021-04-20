// import React, { Component } from 'react'
import React from 'react'
import {Link,withRouter} from 'react-router-dom'
// import axios from 'axios'
import { message,Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import {reqLogin} from '../../api'

    const Login = () => {
        const onFinish = async(values) => {
          console.log('Received values of form: ', values);
           const {username,password} = values;
           const response = await reqLogin(username,password)

           const result = response.data;
           if(result.length===0){
            message.error('用户名或密码不正确');
           }else{
            message.success('登录成功成功',1);
           }              
        };
        
        return (
            <div className='login'>
                <header className='login-header'>
                    {/* <img src={logo} alt=""/> */}
                </header>
                <section className='login-content'>
                    <h2>欢迎来到登录界面</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                    <Form.Item
                        name="username"
                        //声明式验证：直接使用别人定义好的验证规则进行验证
                        rules={[
                            { required: true, message: '用户名不能为空!' },
                            { min: 4, message: '用户名最少4位!' },
                            { max: 8, message: '用户名最多8位!' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '必须英文数字下划线组成!' },
                            {whitespace:true,message:'不要包含空格！'}
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        //自定义验证：不一定好用，但是代表一种能力
                        rules={[
                            {
                                validator(_, value) {
                                    if (!value) {
                                        return Promise.reject('请输入密码');   
                                    }else if(!/^[a-zA-Z0-9]{3,11}$/.test(value)){
                                        return Promise.reject('由字母数字下划线组成，长度4-12位');
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                        </Button>
                        Or <Link className='reg-link' to="/reg">register now!</Link>
                    </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
// }
export default withRouter(Login)

