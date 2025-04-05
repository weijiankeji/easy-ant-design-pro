let userList = [
  {
    id: '1',
    name: 'admin',
  },
  {
    id: '2',
    name: 'admin2',
  },
];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getUserList = async (_values: any) => {
  return {
    success: true,
    data: userList,
  };
};

export const getUser = async (id: string) => {
  return {
    data: userList.find((item) => item.id === id),
  };
};

export const addUser = async (params: any) => {
  userList = [...userList, params];

  return { data: true, errorMessage: '' };
};

export const updateUser = async (params: any) => {
  const index = userList.findIndex((item) => item.id === params.id);
  userList[index] = params;

  return { data: true, errorMessage: '' };
};

export const deleteUser = async (id: string) => {
  userList = userList.filter((item) => item.id !== id);
  return { data: true, errorMessage: '' };
};
