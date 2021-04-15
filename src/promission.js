import router from './router'
const _import = require('./router/_import_' + process.env.NODE_ENV) //获取组件的方法
import Layout from '@/views/layout' //Layout 是架构组件，不在后台返回，在文件里单独引入


var getRouter //用来获取后台拿到的路由

import { authmenus } from "@/request/api"; // 导入我们的api接口   
//获取当前用户拥有的菜单权限     
if (localStorage.getItem("token")) {
    router.beforeEach((to, from, next) => {

        let fakeRouter = {
            "router": []
        }
        if (!getRouter) { //不加这个判断，路由会陷入死循环
            if (!getObjArr('router')) {
                authmenus().then((res) => {
                    if (res.status == 200) {
                        res.data.forEach(element => {
                            element.children.forEach(item => {
                                let path = item.href.split('/');
                                path = "/" + path[1] + "/" + path[2]
                                //需要判断当前子集是否还有子集
                                if (item.children == null) {
                                    fakeRouter.router.push({
                                        "path": path,//路径
                                        "component": "Layout",//主框架的组件模板
                                        "parent": item.href.split('/')[1],//当前页面所属的父级
                                        "children": [{
                                            "path": item.href.split('/')[3],//组件的路径
                                            "name": item.href.split('/')[2] + item.id,//组件的名字，+id是为了不重复
                                            "component": item.href.substr(1),//对应的组件
                                            "meta": {
                                                "title": item.title,//标题
                                                "icon": item.icon,//图标
                                            }
                                        }]
                                    });
                                }
                                else {
                                    let child = [];
                                    item.children.forEach(element => {
                                        child.push({
                                            "path": element.href.split('/')[2],
                                            "name": element.href.split('/')[2],
                                            "component": element.href.substr(1),
                                            "parent": element.href.split('/')[1],
                                            "meta": {
                                                "title": element.title,
                                                "icon": element.icon
                                            }
                                        });
                                    });
                                    fakeRouter.router.push({
                                        "path": "/Platform",
                                        "component": "Layout",
                                        "redirect": "/Platform/User",
                                        "parent": "Platform",
                                        "name": "Platform",
                                        "meta": {
                                            "title": item.title,
                                            "icon": item.icon
                                        },
                                        "children": child
                                    });
                                }
                            })
                        });
                        getRouter = fakeRouter.router;
                        saveObjArr('router', getRouter) //存储路由到localStorage
                        routerGo(to, next) //执行路由跳转方法
                    }
                    else {
                        this.$message.error(res.msg);
                    }
                })
            } else { //从localStorage拿到了路由
                getRouter = getObjArr('router') //拿到路由
                routerGo(to, next)
            }
        } else {
            next()
        }
    })
}




function routerGo(to, next) {
    getRouter = filterAsyncRouter(getRouter) //过滤路由
    router.addRoutes(getRouter) //动态添加路由
    global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
    next({ ...to, replace: true })
}

function saveObjArr(name, data) { //localStorage 存储数组对象的方法
    localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { //localStorage 获取数组对象的方法
    return JSON.parse(window.localStorage.getItem(name));

}

function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
    const accessedRouters = asyncRouterMap.filter(route => {
        if (route.component) {
            if (route.component === 'Layout') { //Layout组件特殊处理
                route.component = Layout
            } else {
                route.component = _import(route.component)
            }
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })

    return accessedRouters
}
