import { users } from "./features/library/mockData";

const roles = {
  GUEST: 'guest',   
  USER: 'user',    
  ADMIN: 'admin',   
};

export const canRead = (role: any) => {
  return role === roles.ADMIN || role === roles.USER || role === roles.GUEST;
};

export const canWrite = (role: string) => {
  return role === roles.ADMIN || role === roles.USER;
};

export const canEdit = (role: string) => {
  return role === roles.ADMIN;
};

export const validateUser = (email: string, password: string, role: string) => {
  const foundUser = users.find(
    (user) => user.email === email && (user.password === password || user.uid === password) && user.role === role
  );
  return foundUser ? { id: foundUser.id, role: foundUser.role, name: foundUser.name } : null;
}