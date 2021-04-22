import React, { Component } from 'react'
import './index.less'
import {formDate} from '../../utils/dateUtils'
export default class Header extends Component {
    state = {
        currentTime:formDate(Date.now())
    }
    render() {
        // const {currentTime} = this.state
        console.log('ggggggggg',this)
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，admin</span>
                    <a href="javascript:;">退出</a>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>首页</div>
                    <div className='header-bottom-right'>
                        <span>2021-4-21 16:22:27</span>
                        <img src="" alt="图片"/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}
