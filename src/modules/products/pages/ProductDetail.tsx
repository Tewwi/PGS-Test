import axios from 'axios';
import dayjs from 'dayjs';
import { convertFromHTML, convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { IShipping, ProductCreateParam } from '../../../models/product';
import { AppState } from '../../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import Loading from '../../common/components/Loading';
import { fetchThunk } from '../../common/redux/thunk';
import AddProduct from '../components/AddProductPage/AddProduct';
import Marketing from '../components/AddProductPage/Marketing';
import Price from '../components/AddProductPage/Price';
import Shipping from '../components/AddProductPage/Shipping';
import { fieldData } from './AddProductPage';
import { Button, Typography } from '@mui/material';
import { replace } from 'connected-react-router';

const ProductDetail = () => {
  const { id } = useParams() as {
    id: string;
  };

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [dataDetail, setDataDetail] = useState<ProductCreateParam>();
  const [dataField, setDataField] = useState<fieldData>();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ProductCreateParam>({
    mode: 'onChange',
    defaultValues: dataDetail,
  });
  const { fields, append, remove } = useFieldArray({ name: 'shipping_to_zones', control });

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    const dataInfo: { [key: string]: { url: string } } = {
      vendor: {
        url: API_PATHS.getVendor,
      },
      catagory: {
        url: API_PATHS.getCategories,
      },
      brand: {
        url: API_PATHS.getBrand,
      },
      condition: {
        url: API_PATHS.getConditions,
      },
      shipping: {
        url: API_PATHS.getShipping,
      },
    };

    const promise = await Promise.all(
      Object.keys(dataInfo)?.map((item) => {
        return dispatch(fetchThunk(dataInfo[item].url, 'get'));
      }),
    );

    setLoading(false);
    const data = promise.reduce((result, cur, index) => {
      result[Object.keys(dataInfo)[index]] = cur.data?.map((item: any) => ({
        ...item,
      }));
      return result;
    }, {} as any);

    setDataField(data);
  }, [dispatch]);

  const fetchDataDetail = useCallback(async () => {
    setLoading(true);

    const resp = await dispatch(fetchThunk(API_PATHS.getProductDetail, 'post', { id: id }));

    setLoading(false);

    console.log(resp);

    if (resp && resp.success && dataField) {
      const contentState = EditorState.createEmpty();
      const description = EditorState.push(
        contentState,
        convertFromHTML(resp.data.description) as any,
        'change-block-data',
      );
      const vendor = dataField.vendor?.filter((item) => item.id == resp.data.vendor_id)[0];
      const time = dayjs(resp.data.arrival_date * 1000).format('YYYY-MM-DD');
      setDataDetail({
        ...resp.data,
        description: description,
        vendor_id: vendor,
        arrival_date: time,
        shipping_to_zones: resp.data.shipping,
      });
      return;
    }

    console.log('error');
    return;
  }, [dispatch, id, dataField]);

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

  const onSubmit = useCallback(
    async (data: ProductCreateParam) => {
      console.log({ ...data, description: convertToHTML(data.description.getCurrentContent()) });
      const body = { ...data, description: convertToHTML(data.description.getCurrentContent()) };
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
        },
      };
      const json = await axios.put(API_PATHS.createProduct, body, config);
      console.log(json);
      if (json) {
        console.log('success');
        dispatch(replace(ROUTES.productList));
        return;
      }

      return;
    },
    [dispatch],
  );

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    if (dataField) {
      fetchDataDetail();
    }
  }, [fetchDataDetail, dataField]);

  useEffect(() => {
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
        width: '100vw',
        minHeight: '100vh',
        height: '100%',
        backgroundColor: '#323259',
      }}
    >
      <div style={{ padding: '16px', width: '100%' }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ margin: '5px', width: '100%' }}>
          <AddProduct data={dataField} control={control} error={errors} />
          <Price data={dataField} control={control} error={errors} />
          <Shipping
            rest={{ control: control, data: dataField, error: errors }}
            fields={fields}
            handleAddShipping={handleAddShipping}
            handleRemoveShipping={handleRemoveShipping}
          />
          <Marketing data={dataField} control={control} error={errors} />
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
              zIndex: '10000',
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
                Upadte Product
              </Typography>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
