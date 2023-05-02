import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { login } from 'redux/slices/auth';

export default function LoginPage() {
  const isAuth = useSelector(state => state.auth.isAuth);
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async values => {
    try {
      const data = await dispatch(login(values));
      if ('token' in data.payload) {
        localStorage.setItem('token', data.payload.token);
      }
    } catch (error) {
      alert('Не удалось авторизоваться');
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Box sx={styles.loginWrapper}>
      <Paper elevation={12} sx={{ width: '40%', padding: 5 }}>
        <Typography component={'h2'} variant={'h5'} textAlign="center">
          Вход в аккаунт
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.loginForm}>
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
  );
}

const styles = {
  loginWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 3,
    marginBottom: 3,
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '40px',
  },
};
