import { getRequest, postRequest } from './index';

export const checkSession = async () => getRequest('/api/user/check-session');
export const myLogout = async () => getRequest('/api/user/logout');
export const myLogin = async (data) => postRequest('/api/user/login', data);
export const myRegister = async (data) => postRequest('/api/user/register', data);