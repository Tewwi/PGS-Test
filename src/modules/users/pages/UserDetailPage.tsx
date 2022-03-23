import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Button, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/api';
import { newUser } from '../../../models/userList';
import { AppState } from '../../../redux/reducer';
import { getErrorMessageResponse } from '../../../utils';
import { fetchThunk } from '../../common/redux/thunk';
import Loading from '../../layout/components/Loading';
import { setToastInfo } from '../../layout/redux/layoutReducer';
import AccessInfo from '../components/CreateUserPage/AccessInfo';
import MainInfo from '../components/CreateUserPage/MainInfo';
import Tax from '../components/CreateUserPage/Tax';
import InfoVendor from '../components/UserDetailPage/InfoVendor';

const UserDetailPage = () => {
  const { id } = useParams() as {
    id: string;
  };
  const [dataDetail, setDataDetail] = React.useState<newUser>();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<newUser>({ mode: 'onChange', defaultValues: dataDetail });
  const history = useHistory();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = React.useState(false);

  const fetchUserDetail = React.useCallback(async () => {
    setLoading(true);
    const resp = await dispatch(fetchThunk(API_PATHS.getUserDetail, 'post', { id: id }));

    setLoading(false);
    if (resp.success) {
      const data = resp.data.info;
      setDataDetail(data);
      return;
    }
    console.log('error');
    return;
  }, [dispatch, id]);

  const onSubmit = async (data: newUser) => {
    const body = { params: [data] };
    const resp = await dispatch(fetchThunk(API_PATHS.updateUser, 'post', body));

    console.log(resp);
    if (resp.success) {
      dispatch(setToastInfo({ open: true, message: 'Update user success', isSuccess: true }));
      return;
    }

    dispatch(setToastInfo({ open: true, message: getErrorMessageResponse(resp), isSuccess: false }));
    return;
  };

  React.useEffect(() => {
    fetchUserDetail();
  }, [fetchUserDetail]);

  React.useEffect(() => {
    if (dataDetail) {
      reset(dataDetail);
    }
  }, [dataDetail, reset]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        height: '100%',
        backgroundColor: '#323259',
      }}
    >
      <div style={{ padding: '16px', width: '100%', marginBottom: '30px' }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <div
            style={{
              width: '100%',
              backgroundColor: '#1b1b38',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ marginTop: '10px', marginLeft: '15px' }} onClick={() => history.goBack()}>
              <ArrowCircleLeftIcon fontSize="large" htmlColor="white" />
            </div>
            <Typography variant="h5" sx={{ color: 'white', margin: '8px 0px 10px 18px' }}>
              {`${dataDetail?.email} (${dataDetail?.companyName || ''})`}
            </Typography>
          </div>
          {dataDetail && <InfoVendor data={dataDetail} />}
          <MainInfo control={control} error={errors} watch={watch} isDetail={true} />
          <AccessInfo control={control} error={errors} watch={watch} isDetail={true} />
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
                Update
              </Typography>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailPage;
