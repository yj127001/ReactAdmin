import React, { Component } from 'react'
import { Menu, Button } from 'antd'
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined
} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './index.less'

const { SubMenu } = Menu;


export default class LeftNav extends Component {
    state = {
        collapsed: false,
      };

    render() {
        return (
            <div>
                 <header className='left-nav-header'>
                    <img src={logo} alt="logo" className='logo'/>
                    <h1>后台管理</h1>
                </header>
                
                 <div>
                    <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                    >
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to='/home'>首页</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        <Link to='/user'>用户管理</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ContainerOutlined />}>  
                        <Link to='/role'>角色管理</Link>
                    </Menu.Item>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="说说">
                        <Menu.Item key="9" icon={<AppstoreOutlined />}>   
                            <Link to='/category'>品类管理</Link>
                        </Menu.Item>
                        <Menu.Item key="10" icon={<AppstoreOutlined />}>                  
                            <Link to='/product'>说说管理</Link>
                        </Menu.Item>
                    </SubMenu>
                    </Menu>
                </div>
            </div>
        )
    }
}
