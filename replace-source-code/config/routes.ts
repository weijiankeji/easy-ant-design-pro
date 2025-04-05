export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { name: '用户管理', icon: 'user', path: '/userManage', component: './UserManage' },
  { path: '/', redirect: '/userManage' },
  { path: '*', layout: false, component: './UserManage' },
];
