import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { registration } from 'redux/slices/auth';

export default function RegistrationPage() {
  const isAuth = useSelector(state => state.auth.isAuth);
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async values => {
    try {
      const data = await dispatch(registration(values));
      if ('token' in data.payload) {
        localStorage.setItem('token', data.payload.token);
      }
    } catch (error) {
      alert('Не удалось зарегистрироваться');
    }
  };

  if (localStorage.getItem('token') && isAuth) {
    return <Navigate to="/posts" />;
  }

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '84px' }}>
      <Box sx={styles.registerWrapper}>
        <Paper elevation={12} sx={{ width: '40%', padding: 5 }}>
          <Typography component={'h2'} variant={'h5'} textAlign="center">
            Создание аккаунта
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={styles.registerForm}>
            <TextField
              label="Имя"
              variant="outlined"
              {...register('fullName', {
                required: 'Укажите полное имя',
              })}
              error={Boolean(formState.errors.fullName?.message)}
              helperText={formState.errors.fullName?.message}
              fullWidth
              sx={{ width: '70%', marginBottom: 5 }}
            />
            <TextField
              label="Email"
              variant="outlined"
              {...register('email', {
                required: 'Укажите почту',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Неверный формат почты',
                },
              })}
              error={Boolean(formState.errors.email?.message)}
              helperText={formState.errors.email?.message}
              fullWidth
              sx={{ width: '70%', marginBottom: 5 }}
            />
            <TextField
              label="Пароль"
              variant="outlined"
              {...register('password', {
                required: 'Введите пароль',
                minLength: {
                  value: 5,
                  message: 'Введите не менее 5 символов',
                },
              })}
              error={Boolean(formState.errors.password?.message)}
              helperText={formState.errors.password?.message}
              fullWidth
              sx={{ width: '70%', marginBottom: 5 }}
            />
            <Button
              type="submit"
              size="large"
              variant="contained"
              disabled={!formState.isValid}
              sx={{ width: '50%' }}
            >
              Войти
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

const styles = {
  registerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 3,
    marginBottom: 3,
  },
  registerForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '40px',
  },
};
