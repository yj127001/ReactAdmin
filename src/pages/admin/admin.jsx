import React,{Component} from 'react'
import { Layout } from 'antd';
import {Route,Switch,Redirect} from 'react-router-dom'
import './admin.less'
import '../../components/header'
import '../../components/left-nav'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Category from '../category/category'
import Product from '../product/product'
import Home from '../home/home'
import Role from '../role/role'
import User from '../user/user'

const {Sider, Content } = Layout;

export default class Admin extends Component{
    render(){
        return(
            <>
            <Layout className='admin'>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout className='admin-right'> 
                    <Header/>
                    <Content style={{backgroundColor:'rgba(255, 255, 255)',margin:'30px'}}>
                        <Switch>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer/>
                </Layout>
            </Layout>
            </>
        )
    }
}