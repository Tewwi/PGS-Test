import { Button, Typography } from '@mui/material';
import { replace } from 'connected-react-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { newUser } from '../../../models/userList';
import { AppState } from '../../../redux/reducer';
import { getErrorMessageResponse } from '../../../utils';
import { fetchThunk } from '../../common/redux/thunk';
import { setToastInfo } from '../../layout/redux/layoutReducer';
import AccessInfo from '../components/CreateUserPage/AccessInfo';
import MainInfo from '../components/CreateUserPage/MainInfo';
import Tax from '../components/CreateUserPage/Tax';

const CreateUserPage = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<newUser>({ mode: 'onChange' });
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const onSubmit = async (data: newUser) => {
    const resp = await dispatch(fetchThunk(API_PATHS.createUser, 'post', { ...data }));

    console.log(resp);
    if (resp.success) {
      dispatch(setToastInfo({ open: true, message: 'Create user success', isSuccess: true }));
      dispatch(replace(ROUTES.userList));
      return;
    }

    dispatch(setToastInfo({ open: true, message: getErrorMessageResponse(resp), isSuccess: false }));
    return;
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        height: '100%',
        backgroundColor: '#323259',
      }}
    >
      <div style={{ padding: '16px', width: '100%' }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ margin: '5px', width: '100%' }}>
          <MainInfo control={control} error={errors} watch={watch} />
          <AccessInfo control={control} error={errors} watch={watch} />
          <Tax control={control} error={errors} watch={watch} />
          <div
            style={{
              display: 'flex',
              position: 'fixed',
              width: '60vw',
              height: '50px',
              backgroundColor: '#323259',
              bottom: 0,
              left: 0,
              right: 0,
              margin: '0 auto',
              boxShadow: '1px 1px 10px 10px #b18aff',
              borderRadius: '3px',
              zIndex: '1',
            }}
          >
            <Button
              variant="contained"
              disabled={!isValid}
              type="submit"
              style={{ maxWidth: '120px', maxHeight: '35px', minWidth: '120px', minHeight: '35px' }}
              sx={{
                padding: '10px',
                backgroundColor: '#efa945',
                '&: hover': {
                  backgroundColor: '#efa945',
                  color: 'black',
                },
                alignSelf: 'center',
                marginLeft: '20px',
                textTransform: 'none',
              }}
            >
              <Typography sx={{ fontSize: '13px' }} noWrap>
                Create User
              </Typography>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserPage;
