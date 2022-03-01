import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ILoginParams } from '../../../models/auth';

const schema = yup
  .object({
    email: yup.string().required('Please Enter your Email'),
    password: yup.string().required('Please Enter Your Password').min(6, 'Min 6 characters'),
  })
  .required();

interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}

const LoginForm = (props: Props) => {
  const { onLogin, loading, errorMessage } = props;
  console.log(errorMessage);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginParams>({ resolver: yupResolver(schema) });

  const onSubmit = React.useCallback(
    (data: ILoginParams) => {
      onLogin(data);
      return;
    },
    [onLogin],
  );

  return (
    <Container component={'main'} maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && (
          <Box
            sx={{
              width: '100%',
              height: '38px',
              backgroundColor: '#f38585',
              display: 'flex',
              borderRadius: '3px',
              marginBottom: '8px',
            }}
          >
            <Typography color={'red'} sx={{ margin: 'auto', width: '90%', fontSize: '15px' }}>
              {errorMessage}
            </Typography>
          </Box>
        )}
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              fullWidth
              label="Email"
              error={!!errors.email?.message}
              helperText={errors.email?.message}
              variant="outlined"
              type="email"
              className="materialUIInput"
            />
          )}
          {...register('email', { required: true })}
          name="email"
          control={control}
          defaultValue=""
        />
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              fullWidth
              label="Password"
              error={!!errors.password?.message}
              helperText={errors.password?.message || ''}
              variant="outlined"
              type="password"
              className="materialUIInput"
            />
          )}
          rules={{ required: true }}
          name="password"
          control={control}
          defaultValue=""
        />
        <div>
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            )}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <Button type="submit" style={{ margin: 'auto', width: '30%' }} variant="contained">
            Login
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default LoginForm;
