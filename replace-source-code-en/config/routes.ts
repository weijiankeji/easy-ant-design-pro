export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: 'login', path: '/user/login', component: './User/Login' }],
  },
  { name: 'users', icon: 'user', path: '/userManage', component: './UserManage' },
  { path: '/', redirect: '/userManage' },
  { path: '*', layout: false, component: './UserManage' },
];
