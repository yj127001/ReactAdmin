import React, { Component } from 'react'
import { message,Card,Button,Table,Modal} from 'antd';
import { PlusOutlined,DoubleRightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import {reqCategorys} from '../../api/index'
import AddForm  from './add-form'
import UpdateForm  from './update-form'

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
        // console.log(result)
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
            parentId : category._id,
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
    showAddForm = ()=>{
        this.setState({
            isModalVisible:0
        })
    }
    showUpdateForm = ()=>{
        this.setState({
            isModalVisible:0
        })
    }
    addCategories = ()=>{
        this.setState({
            isModalVisible:1
        })
    }
    showUpdate = (category)=>{
        /*保存分类对象*/
        this.category = category
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
    }
    render() {
        const {categories,parentId,subCategories,parentName,isModalVisible} = this.state
        const category = this.category || {}
        console.log('获取',category)
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
                <Modal title="添加分类" visible={isModalVisible===1} onOk={this.showAddForm} onCancel={this.handleCancel}>
                    <AddForm/>
                </Modal>
                <Modal title="修改分类" visible={isModalVisible===2} onOk={this.showUpdateForm} onCancel={this.handleCancel}>
                    <UpdateForm categoryName={category.name}/>
                </Modal>
            </Card>
        )
    }
}
  