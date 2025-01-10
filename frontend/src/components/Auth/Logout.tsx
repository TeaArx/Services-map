'use client'
import { logout } from '@/utils/api';
import axios from 'axios';
import Cookies from 'js-cookie';


 export const Logout = async () => {
   const token = Cookies.get('auth_token');
   if (token) {
     const response = await logout(token);
   }
   Cookies.remove('auth_token');
   window.location.href = '/login';
   window.location.reload(); 
 };
  

