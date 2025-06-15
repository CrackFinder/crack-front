export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

export type UserInfo = Pick<User, "id" | "username" | "email" | "createdAt">;
export type UserRegisterParams = Omit<User, "id" | "createdAt">;
