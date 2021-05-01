import React, { Component } from 'react'
import { message,Card,Button,Table,Modal} from 'antd';
import { PlusOutlined,DoubleRightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import {reqCategorys,reqUpdateCategory,reqAddCategory} from '../../api/index'
import AddForm  from './add-form'
import UpdateForm  from './update-form'
import {nanoid} from 'nanoid'

export default class Category extends Component {
    state = {
        categories:[],
        subCategories:[],
        parentId:'0',
        isModalVisible:0
    } 
    componentDidMount(){
        this.getCategories()
    }  
    getCategories = async()=>{
        const {parentId} = this.state

        const result = await reqCategorys(parentId)
        console.log('好奇怪',result)
        if(result.length!==0){ 
            const categories = result.data;
            if(parentId==='0'){
                this.setState({  
                    categories
                })
            }else{
                this.setState({  
                    subCategories:categories
                })
            }            
        }else{
            message.error('获取分类列表数据失败了')
        }
    }
    showSubCategories=(category)=>{
        this.setState({
            parentId : category.id,
            parentName:category.name
        },()=>{    /*该回调函数在状态更新且重新render()后执行*/
            // console.log('改变后',this.state.parentId)
            this.getCategories()
        })
    }
    showFirstCate=()=>{
        this.setState({
            parentId:'0'
        },()=>{
            this.getCategories()
        })
    }
    addCategory = async()=>{
        this.setState({
            isModalVisible:0
        })
        const id = nanoid()
        const parentId = this.state.parentId
        const categoryName = this.form.getFieldValue('addCategoryName')
        console.log('神秘的',id,categoryName,parentId)
        const result = await reqAddCategory({id,categoryName,parentId})
        if(result.length!==0){
             /*第三步：重新显示列表*/
            console.log('这是嘛',result)
            this.getCategories()
        }
    }
    updateCategory = async()=>{
        /*第一步：隐藏确定框*/
        this.setState({
            isModalVisible:0
        })
        const categoryId = this.category.id
        const categoryName = this.form.getFieldValue('categoryName')
        console.log('我想要修改你',categoryId,categoryName)
        /*第二步：发请求更新分类*/
        const result = await reqUpdateCategory({categoryId,categoryName})
        if(result.length!==0){
             /*第三步：重新显示列表*/
            console.log('传回',result)
            this.getCategories()
        }
    }
    addCategories = ()=>{
        this.setState({
            isModalVisible:1
        })
    }
    showUpdate = (category)=>{
        /*保存分类对象*/
        this.category = category
        console.log('小乖乖',this.category)
        
        /*更新状态*/
        this.setState({
            isModalVisible:2,
        },()=>{
            console.log('修改',this.category.name)
        })
    }
    handleCancel = () =>{
        this.setState({
            isModalVisible:0
        })
        /*在取消按钮的函数里进行测试清空功能*/
        this.form.resetFields() 
    }
    render() {
        const {categories,parentId,subCategories,parentName,isModalVisible} = this.state
        const category = this.category || {}
        console.log('获取点点滴滴',category)
        const title = parentId==='0' ? '一级分类列表':(
            <span>
                <LinkButton onClick={this.showFirstCate}>一级分类列表</LinkButton>
                <DoubleRightOutlined style={{margin:'0 10px'}}/>
                <span>{parentName}</span>
            </span>
        );
        
        const extra = (
            <Button type="primary" onClick={this.addCategories}>
                <PlusOutlined />
                添加
            </Button>
        )              
          const columns = [
            {
              title: '分类名称',
              dataIndex: 'name'
            },
            {
              title: '操作',
              width:200,
              render: (category) => ( /*注意此处可以传递参数*/
              <span>
                    <LinkButton onClick={()=>{this.showUpdate(category)}}>修改分类</LinkButton>
                    {/* 如何向事件回调函数传递参数：先定义一个匿名函数，在函数体内调用处理的函数并传入数据 */}
                    {parentId==='0' ? <LinkButton onClick={()=>{this.showSubCategories(category)}}>查看子分类</LinkButton>: null}
              </span>
              )
            }
          ];
        return (
            <Card title={title} extra={extra} className='add-category'>
                <Table 
                dataSource={parentId==='0'? categories : subCategories} 
                columns={columns} 
                bordered 
                pagination={{defaultPageSize:6,showQuickJumper:true}}
                rowKey='_id'/>
                <Modal title="添加分类" getContainer={false} visible={isModalVisible===1} onOk={this.addCategory} onCancel={this.handleCancel}>
                    <AddForm parentId={parentId} setForm={(form)=>{this.form = form}}/>
                </Modal>
                <Modal title="修改分类" getContainer={false} visible={isModalVisible===2} onOk={this.updateCategory} onCancel={this.handleCancel}>
                    <UpdateForm {...category} setForm={(form)=>{this.form = form}}/>{/*父组件向子组件传递一个函数，子组件通过调用该函数，向父组件传递它（子组件）的form表单*/}
                </Modal>
            </Card>
        )
    }
}
  