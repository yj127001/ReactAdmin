import React, { Component } from 'react'
import { message,Card,Button,Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import {reqCategorys} from '../../api/index'
export default class Category extends Component {
    state = {
        categories:[]
    } 
    componentDidMount(){
        this.getCategories()
    }  
    getCategories = async()=>{
        const result = await reqCategorys('0')
        // console.log(result.data)
        if(result.length!=0){ 
            const categories = result.data;
            this.setState({
                categories
            })
        }else{
            message.error('获取分类列表数据失败了')
        }
    }
    render() {
        const {categories} = this.state
        const title = '一级分类列表';
        const extra = (
            <Button type="primary">
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
              render: () => (
              <span>
                    <LinkButton>修改分类</LinkButton>
                    <LinkButton>查看子分类</LinkButton>
              </span>
              )
            }
          ];
        return (
            <Card title={title} extra={extra} className='add-category'>
                <Table dataSource={categories} columns={columns} bordered pagination={{defaultPageSize:6,showQuickJumper:true}}/>
            </Card>
        )
    }
}
  