'use client';
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, CircularProgress, Snackbar, Alert, Paper, Box } from '@mui/material';
import Cookies from 'js-cookie';
import { profil, serv, updates } from '@/utils/api';
import ServiceDialog from './ServiceDialog';
import ServiceGrid from './ServiceGrid';
import { useRouter } from 'next/navigation'
export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  speciality: string;
}

export interface Service {
  id: number;
  user_id: User[];
  name: string;
  address: string;
  description: string;
  troubleshoot: string;
  portainer: string;
}

interface UserFromAPI {
  email: string;
  id: string;
}

const EditingTable = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [user, setUser] = useState<UserFromAPI | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get('auth_token');
  const router = useRouter();

  const fetchUserData = async (token: string) => {
    try {
      const response = await profil(token);
      if (response) {
        setUser(response);
      } else {
        setError('Нет доступных пользовательских данных.');
      }
    } catch (err) {
      setError('Ошибка при получении пользовательских данных.');
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    } else {
      setError('Токен аутентификации не найден.');
    }
  }, [token]); 

  useEffect(() => {
    const handleBeforeUnload = (event: { preventDefault: () => void; returnValue: string; }) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.history.pushState(null, '', window.location.href); 
    window.addEventListener('popstate', () => {
      router.push('/login'); 
    });

    return () => {
      window.removeEventListener('popstate', () => {
        router.push('/login');
      });
    };
  }, [router]);


  useEffect(() => {
    const fetchServices = async () => {
      if (user) {
        try {
          const response = await serv( user.id );
          setServices(response);
        } catch (err) {
          setError('Службы выборки ошибок.');
        }
      }
    };

    fetchServices();
  }, [user]);

  const handleEditClick = (service: Service) => {
    setSelectedService(service);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedService(null);
    setError(null);
  };

  const handleSave = async (service: Service, token: string) => {
    setLoading(true);
    try {
      const response = await updates( service, token );
      setServices((prevServices) => 
        prevServices.map((s) => (s.id === service.id ? service : s))
      );
      handleClose();
    } catch (err) {
      setError('Ошибка при сохранении данных');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="800px">
      <Paper elevation={16} style={{ width: '90%', maxHeight: '700px', overflow: 'auto' }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : (
          <ServiceGrid services={services} onEditClick={handleEditClick} />
        )}
        <ServiceDialog 
          open={open} 
          onClose={handleClose} 
          selectedService={selectedService} 
          onSave={handleSave} 
        />
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default EditingTable;
