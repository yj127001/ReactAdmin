import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import Login from './pages/login/login'
import Reg from './pages/regist/reg'
import Admin from './pages/admin/admin'

export default class App extends Component{
    render(){
        return(
            <div> 
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/reg' component={Reg}/>
                    <Route path='/' component={Admin}/> 
                </Switch>                    
            </div>
        )
    }
}