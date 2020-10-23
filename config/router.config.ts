module.exports = {
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/',
            component: '@/layouts/index',
            routes: [
                { path: '/home', title: '首页', icon: 'iconshouye', component: '@/pages/home' },
                { path: '/courses', title: '课程', icon: 'iconkecheng', component: '@/pages/courses' },
                { path: '/found', title: '发现', icon: 'iconfaxian', component: '@/pages/found' },
                { path: '/mine', title: '我的', icon: 'icondibudaohanglan-', component: '@/pages/mine' },
            ]
        },
    ],
};