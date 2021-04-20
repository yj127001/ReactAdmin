// import React, { Component} from 'react'
import React from 'react'
import {Link} from 'react-router-dom'
// import axios from 'axios'
import {message,Form,Input,Button} from 'antd';
import './reg.less'
import {reqRegest} from '../../api'

    const Reg = () => {
        const onFinish = async(values) => {
          console.log('Received values of form: ', values);
        //   axios.post('http://localhost:3000/register',values)
        //     .then(function (response) {
        //         console.log(response.data);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
            const response = await reqRegest(values)
            const result = response.data;
            if(result.length===0){
                message.error('注册失败')
            }else{
                message.success('注册成功',1);
               console.log(this)
            }
            
        };
        return (
            <div className='regiter'>
                <header className='register-header'>
                    {/* <img src={logo} alt=""/> */}
                </header>
                <section className='register-content'>
                    <h2>欢迎来到注册界面</h2>
                    <Form
                        name="normal_register"
                        className="register-form"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            // label="E-mail"
                            rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                            ]}
                        >
                            <Input placeholder="Please input your E-mail!"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            // label="Password"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Please input your password!"/>
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            // label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                            ]}
                        >
                            <Input.Password placeholder="Please confirm your password!"/>
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label="Username"
                            tooltip="What do you want others to call you?"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                                whitespace: true,
                            },
                            ]}
                        >
                            <Input placeholder="Please input your username!"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="register-form-button">
                                Register
                            </Button>
                            Or <Link className='login-link' to="/login">welcome login!</Link>
                        </Form.Item>
                    </Form>    
                </section>
            </div>
        )
    }
export default Reg
