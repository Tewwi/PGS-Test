import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { replace } from 'connected-react-router';
import { convertToHTML } from 'draft-convert';
import Cookies from 'js-cookie';
import React, { useCallback, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { IShipping, ProductCreateParam } from '../../../models/product';
import { AppState } from '../../../redux/reducer';
import { getErrorMessageResponse } from '../../../utils';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import Loading from '../../layout/components/Loading';
import { setToastInfo } from '../../layout/redux/layoutReducer';
import AddProduct from '../components/AddProductPage/AddProduct';
import Marketing from '../components/AddProductPage/Marketing';
import Price from '../components/AddProductPage/Price';
import Shipping from '../components/AddProductPage/Shipping';

const AddProductPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProductCreateParam>({
    mode: 'onChange',
    defaultValues: {
      shipping_to_zones: [
        {
          id: '1',
          name: 'Continental U.S.',
          price: '0.00',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({ name: 'shipping_to_zones', control });
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const data = useSelector((state: AppState) => state.toast.data);

  const handleAddShipping = useCallback(
    (obj: IShipping) => {
      append(obj);
      return;
    },
    [append],
  );

  const handleRemoveShipping = useCallback(
    (index: number) => {
      remove(index);
      return;
    },
    [remove],
  );

  const onSubmit = async (data: ProductCreateParam) => {
    setLoading(true);
    console.log(data);
    const body = {
      ...data,
      description: convertToHTML(data.description.getCurrentContent()),
      vendor_id: data.vendor_id.id,
      imagesOrder: data?.imgUpload?.map((item: any) => item[0].name),
    };
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
      },
    };

    const formData = new FormData();
    formData.append('productDetail', JSON.stringify(body));

    const json = await axios.post(API_PATHS.createProduct, formData, config);

    console.log(json);
    if (json) {
      if (body.imgUpload.length > 0) {
        const temp = body.imgUpload.map((item: any, index: number) => {
          const formData = new FormData();
          formData.append('productId', json.data.data);
          formData.append('order', JSON.stringify(index));
          formData.append('images[]', item[0]);
          return formData;
        });

        const tempResult = await Promise.all(temp.map((item: any) => axios.post(API_PATHS.uploadImg, item, config)));

        console.log(tempResult);
      }

      setLoading(false);
      dispatch(setToastInfo({ open: true, message: 'Create product success', isSuccess: true }));
      dispatch(replace(`${ROUTES.productDetail}/${json.data.data}`));
      return;
    }

    setLoading(false);
    dispatch(setToastInfo({ open: true, message: getErrorMessageResponse(json), isSuccess: false }));
    return;
  };

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
          <AddProduct rest={{ control: control, data: data, error: errors }} />
          <Price data={data} control={control} error={errors} />
          <Shipping
            rest={{ control: control, data: data, error: errors }}
            fields={fields}
            handleAddShipping={handleAddShipping}
            handleRemoveShipping={handleRemoveShipping}
          />
          <Marketing data={data} control={control} error={errors} />
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
                Add Product
              </Typography>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
