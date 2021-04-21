const menuList = [
    {
        title:'首页',
        to:'/home',
        // icon:'PieChartOutlined'
        key:'/home'
    },
    {
        title:'用户管理',
        to:'/user',
        // icon:<PieChartOutlined />
        key:'/user'
    },
    {
        title:'角色管理',
        to:'/role',
        // icon:<PieChartOutlined />
        key:'/role'
    },
    {
        title:'说说',
        // icon:'PieChartOutlined',
        key:'/message',
        children:[{
            title:'品类管理',
            to:'/category',
            // icon:'PieChartOutlined'
            key:'/category'
        },
        {
            title:'说说管理',
            to:'/product',
            // icon:'PieChartOutlined'
            key:'/product'
        }
    ]}
]

export default menuList