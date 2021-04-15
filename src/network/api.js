/**   
 * api接口统一管理
 */

 import { get, post } from './request'

 let baseUrl = "http://api.yntnsw.com:83/api/v1.0/";
   
 export const token = data => post(baseUrl + 'auth/token', data);//登录
 
 export const authmenus = data => post(baseUrl + 'privilege/authmenus', data);//获取菜单
 
 export const ModifyPassword = data => post(baseUrl + 'user/ModifyPassword',data);//修改密码
 export const avatar = data => post(baseUrl + 'user/avatar', data);//头像
 export const list = data => post(baseUrl + 'user/list', data);//获取用户列表
 export const getQuery = data => post(baseUrl + 'user/getQuery', data);//获取用户列表分页
 