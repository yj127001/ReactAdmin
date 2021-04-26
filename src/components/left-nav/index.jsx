import React, { Component } from 'react'
import { Menu } from 'antd'
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
        const path = this.props.location.pathname;
        return menprList.reduce((pre,item)=>{
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key} icon={<PieChartOutlined />}>
                        <Link to={item.to}>{item.title}</Link>
                    </Menu.Item>
                ))
            }else{
                const cItem = item.children.find(cItem => cItem.key===path)
                if(cItem){
                    this.openKey= item.key  //注意区分
                }
                pre.push((
                    <SubMenu key={item.key} icon={<AppstoreOutlined />} title={item.title}>
                        {this.getMenuList_reduce(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        },[])
    }
    /*在第一次render()之前执行一次
    为第一次render()之前做数据准备（必须同步）
    */
    UNSAFE_componentWillMount(){
        this.menuNodes = this.getMenuList_reduce(menuList)
    }
    render() {
        const path = this.props.location.pathname
        const openKey = this.openKey     //注意区分
        return (
            <div>
                 <header className='left-nav-header'>
                    <img src={logo} alt="logo" className='logo'/>
                    <h1>后台管理</h1>
                </header>
                
                 <div>
                    <Menu
                        mode="inline"
                        theme="dark"                       
                        selectedKeys={[path]}
                        defaultOpenKeys={[openKey]}
                        >
                         {/* {this.getMenuList(menuList)}   */}
                         { this.menuNodes}
                    </Menu>
                </div>
            </div>
        )
    }
}
export default withRouter(LeftNav)
