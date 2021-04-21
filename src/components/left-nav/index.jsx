import React, { Component } from 'react'
import { Menu, Button } from 'antd'
import {
  AppstoreOutlined,
  PieChartOutlined
} from '@ant-design/icons'
import {Link,withRouter} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './index.less'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;
class LeftNav extends Component {
    /*根据数据数组生成标签数组*/
    /**map()  +  递归调用*
    getMenuList = (menuList) =>{
        return menuList.map(item=>{
            if(!item.children){
                return(
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to={item.to}>{item.title}</Link>
                    </Menu.Item>
                )
            }else{
                return(
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title={item.title}>
                        {this.getMenuList(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    */

     /*根据数据数组生成标签数组*/
    /*reduce()  +  递归调用*/
    getMenuList_reduce = (menprList) =>{
        return menprList.reduce((pre,item)=>{
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key} icon={<PieChartOutlined />}>
                        <Link to={item.to}>{item.title}</Link>
                    </Menu.Item>
                ))
            }else{
                pre.push((
                    <SubMenu key={item.key} icon={<AppstoreOutlined />} title={item.title}>
                        {this.getMenuList_reduce(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        },[])
    }
    render() {
        const path = this.props.location.pathname

        return (
            <div>
                 <header className='left-nav-header'>
                    <img src={logo} alt="logo" className='logo'/>
                    <h1>后台管理</h1>
                </header>
                
                 <div>
                    <Menu
                        defaultOpenKeys={['/message']}
                        mode="inline"
                        theme="dark"
                        selectedKeys={[path]}
                        >
                         {/* {this.getMenuList(menuList)}   */}
                         {this.getMenuList_reduce(menuList)}
                    </Menu>
                </div>
            </div>
        )
    }
}
export default withRouter(LeftNav)
