/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */

const IndexRoute: any = {
  path: '/',
  component: () => import('../views/index.vue'),
  children: []
}

const routerContext: any = require.context('./modules', true, /\.ts$/)
routerContext.keys().forEach((route: string) => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  IndexRoute.children = [...IndexRoute.children, ...(routerModule.default || routerModule)]
})

export default [
  IndexRoute,
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: {
      icon: '',
      keepAlive: true,
      title: '用户登录'
    }
  }
]
