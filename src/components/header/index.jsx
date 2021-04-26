import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import './index.less'
import {formDate} from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import { Modal} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import LinkButton from '../link-button'
class Header extends Component {
    state = {
        currentTime:formDate(Date.now())
    }

    componentDidMount(){
        this.getTime()
    }

    componentWillUnmount(){
        clearInterval(this.intervalID)
    }
    getTime = ()=>{
        this.intervalID = setInterval(()=>{
            const currentTime = formDate(Date.now())
            this.setState({currentTime})
        },1000)
    }
    
    getTitle = ()=>{
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item=>{
            if(item.key===path){
                title = item.title;
            }else if(item.children) {
                const cItem = item.children.find(cItem=>cItem.key===path)
                if(cItem) {
                    title = cItem.title
                }
            }
        })
        return title;
    }
    
    logOut = ()=>{
        Modal.confirm({
            title: '确定要退出吗',
            icon: <ExclamationCircleOutlined />,
            content: '',
            onOk:()=> {
              this.props.history.replace('/login')
            },
            onCancel() {
              console.log('取消');
            },
          });
    }
    render() {
        const {currentTime} = this.state
        //得到当前需要显示的title
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，admin</span>
                    <LinkButton className='logout' onClick={this.logOut}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img src="" alt="图片"/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)