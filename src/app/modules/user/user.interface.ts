/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TUser {
  post: any;
  pre: any;
  name: string;
  email: string;
  profileImg: string;
  password: string;
  role: 'admin' | 'user';
}

export interface TLoginUser {
  email: string;
  password: string;
}

export interface TChangePassword {
  email: string;
  prePassword: string;
  newPassword: string;
}
