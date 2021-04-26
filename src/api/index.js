/*
------------掌握的能力要求：能根据接口文档定义接口请求函数------------
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
*/

import ajax from './ajax'

/*登录*/
/*
*export function reqLogin(username,password){
    return ajax('/login',{username,password},'POST')
}
*/
/*最好不要在ajax()前面加{}，不然加return
export const reqLogin = (username,password) =>{return ajax('/login',{username,password},'POST')}
*/
export const reqLogin = (username,password) =>ajax('/login',{username,password},'POST') 

export const reqRegest = (user) =>ajax('/register',user,'POST')

/*提前准备：添加用户*/
export const reqAddUser = (user) =>ajax('/manage/user/add',user,'POST')

/*获取一级二姐分类列表*/ 
export const reqCategorys = (parentId) =>ajax('/manage/category/list',{parentId})

/*添加分类*/
export const reqAddCategory = (categoryName,parentId) =>ajax('/manage/category/add',{categoryName,parentId},'POST')

/*更新分类*/
export const reqUpdateCategory = ({categoryId,categoryName}) =>ajax('/manage/category/list',{categoryId,categoryName},'POST')
