import { Service } from '@/components/EditingTable/EditingTable';
import axios from 'axios';
import { DJANGO_API_ENDPOINT } from '@/config/defaults'


const api = axios.create({
  baseURL: `${DJANGO_API_ENDPOINT}`, 
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/token/login/', {
    email,
    password,
  });
  
  return response.data;
};

export const profil = async (token: string) => {
    const response = await api.get('/auth/users/me/', {
        headers: {
            'Authorization': `Token ${token}`,
          },
    });
    return response.data;
  };

export const logout = async (token: string) => {
    const response = await api.post('/auth/token/logout/', {
    }, {
        headers: {
            'Authorization': `Token ${token}`,
        },
    });
  };

export const serv = async (user_id: string) => {
    const response = await api.get('/Services/', { params: { user_id } });
    return response.data;
};

export const updates = async (service: Service, token: string) => {
  const response = await api.put(`/Service/${service.id}/`, {  
    id: service.id, 
    name: service.name,
    address: service.address,
    description: service.description,
    troubleshoot: service.troubleshoot,
    portainer: service.portainer }, { 
      headers: {
          'Authorization': `Token ${token}`,
      },
  });
};

export const hom = async () => {
  const response = await api.get('/Service/', {});
  return response.data;
};