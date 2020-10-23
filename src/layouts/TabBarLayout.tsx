import React from 'react'
import { TabBar } from 'antd-mobile';
import { history } from 'umi'

const TabBarLayout = (props: any) => {


    /**
     * 获取 路由配置中带有 NAME 属性的路由信息
     * @param routes
     */
    const getTabBarItems = (routes: Array<any>) => {
        if (routes && typeof routes === 'object') {
            return (routes || []).filter(item => item.title !== undefined);
        }
        return [];
    };


    const getChildrenContent = (children: any, pathname: string, routes: Array<any>) => {
        const tabBarItems = getTabBarItems(routes);
        let tabBarItem: Array<any> = [];
        if (tabBarItems && tabBarItems.length > 0) {
            if (tabBarItems.length > 5) {
                const items: Array<any> = [];
                const moreItems: Array<any> = [];
                tabBarItems.map((item, index) => {
                    if (index < 4) {
                        items.push({ ...item });
                    } else {
                        moreItems.push({ ...item });
                    }
                    return '';
                });

                tabBarItem = items.map((item: any) => (
                    <TabBar.Item
                        title={item.title}
                        key={`tab-bar-item-${item.path}`}
                        selected={pathname === item.path}
                        badge={0}
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                        }}
                        />}
                        onPress={() => history.push(item.path)}>
                        {children}
                    </TabBar.Item>
                ))
            } else {
                tabBarItem = tabBarItems.map((item) => {
                    return <TabBar.Item
                        title={item.title}
                        key={`tab-bar-item-${item.path}`}
                        selected={pathname === item.path}
                        badge={0}
                        icon={<div style={{ fontSize: '18px' }} className={`iconfont ${item.icon}`} />}
                        selectedIcon={<div style={{ color: '#00BED4', fontSize: '18px' }} className={`iconfont ${item.icon}`} />}
                        onPress={() => history.push(item.path)}>
                        {children}
                    </TabBar.Item>
                });
            }

            return (
                <TabBar
                    tintColor="#00BED4"
                    barTintColor="white"
                    tabBarPosition='bottom'
                    unselectedTintColor="#656565"
                >
                    {tabBarItem}
                </TabBar>
            );

        }

        history.push('/404');
        return (<></>);
    }


    return (
        <div className="layout_footer" style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
            {getChildrenContent(props.children, props.location.pathname, props.route.routes)}
        </div>
    )
}

export default TabBarLayout
