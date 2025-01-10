'use client'; 
import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Card, Alert } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { login } from '@/utils/api';

export default function LoginComponent() {
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [callbackUrl, setCallbackUrl] = useState('/profile'); 

    useEffect(() => {
        if (typeof window !== 'undefined') { 
            const urlParams = new URLSearchParams(window.location.search);
            const urlCallback = urlParams.get("callbackUrl");
            if (urlCallback) {
                setCallbackUrl(urlCallback);
            }
        }
    }, []);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError('');
  
      try {
          const response = await login(formValues.email, formValues.password);
          const token = response.auth_token;
          Cookies.set('auth_token', token, { expires: 1, sameSite: 'Strict' });
          await router.push(callbackUrl || '/profile'); 
          window.location.reload(); 
      } catch (error) {
          setError('Неправильный логин или пароль');
      } finally {
          setLoading(false);
      }};
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <Card className="px-8 py-20" elevation={24}>
            <Typography variant="h5" align="center" gutterBottom>
                Авторизация
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={onSubmit}>
                <TextField
                    label="Почта"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                />
                
                <TextField
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                    required
                />
                
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{ marginTop: '16px' }}
                >
                    {loading ? "Загрузка..." : "Войти"}
                </Button>
            </form>
        </Card>
    );
}
