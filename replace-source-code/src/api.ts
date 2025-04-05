export type CurrentUser = {
  userId: string;
  avatar: string;
  name: string;
};

let currentUser: CurrentUser | undefined;
const localStorageUser = localStorage.getItem('currentUser');

if (localStorageUser) {
  try {
    currentUser = JSON.parse(localStorageUser);
  } catch (e) {}
}
export const login = async (params: any) => {
  if (!(params.username === '{{username}}' && params.password === '{{password}}')) {
    return {
      status: 'error',
      message: '用户名或密码错误',
    };
  }

  currentUser = {
    userId: '1',
    avatar: '',
    name: '{{username}}',
  };

  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  return {
    status: 'ok',
    data: currentUser,
  };
};

export const logout = () => {
  currentUser = undefined;

  localStorage.removeItem('currentUser');
};

export const getUserInfo = async () => {
  return { data: currentUser };
};
