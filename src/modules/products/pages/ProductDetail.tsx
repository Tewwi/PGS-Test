import { Button, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { convertFromHTML, convertToHTML } from 'draft-convert';
import { EditorState } from 'draft-js';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { IShipping, ProductCreateParam } from '../../../models/product';
import { AppState } from '../../../redux/reducer';
import { getErrorMessageResponse } from '../../../utils';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { fetchThunk } from '../../common/redux/thunk';
import Loading from '../../layout/components/Loading';
import { setToastInfo } from '../../layout/redux/layoutReducer';
import AddProduct from '../components/AddProductPage/AddProduct';
import Marketing from '../components/AddProductPage/Marketing';
import Price from '../components/AddProductPage/Price';
import Shipping from '../components/AddProductPage/Shipping';
import { concatImgOrder } from '../utils';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';

const ProductDetail = () => {
  const { id } = useParams() as {
    id: string;
  };
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [dataDetail, setDataDetail] = useState<ProductCreateParam>();
  const dataField = useSelector((state: AppState) => state.toast.data);
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
  const [deleItemIndex, setDeleItemIndex] = useState<number[]>([]);

  const fetchDataDetail = useCallback(async () => {
    setLoading(true);

    const resp = await dispatch(fetchThunk(API_PATHS.getProductDetail, 'post', { id: id }));

    setLoading(false);

    if (resp && resp.success && dataField) {
      const contentState = EditorState.createEmpty();
      const description = EditorState.push(
        contentState,
        convertFromHTML(resp.data.description) as any,
        'change-block-data',
      );
      const vendor = dataField.vendor?.filter((item) => {
        return item.id == resp.data.vendor_id;
      })[0];

      const time = dayjs(resp.data.arrival_date * 1000).format('YYYY-MM-DD');
      const newData = {
        ...resp.data,
        description: description,
        vendor_id: vendor,
        arrival_date: time,
        shipping_to_zones: resp.data.shipping,
        categories: resp.data.categories.map((item: any) => item.category_id),
      };
      setDataDetail(newData);
      reset(newData);
      return;
    }

    console.log('error');
    return;
  }, [dispatch, id, dataField, reset]);

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

  const handleDeleImg = useCallback((id: number) => {
    setDeleItemIndex((prev) => [...prev, id]);
  }, []);

  const onSubmit = useCallback(
    async (data: ProductCreateParam) => {
      setLoading(true);

      const body = {
        ...data,
        description: convertToHTML(data.description.getCurrentContent()),
        vendor_id: data.vendor_id.id,
        imagesOrder: concatImgOrder(dataDetail?.images, deleItemIndex, data.imgUpload),
        deleted_images: deleItemIndex,
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
        if (body?.imgUpload.length > 0) {
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
        dispatch(setToastInfo({ open: true, message: 'Update product success', isSuccess: true }));
        fetchDataDetail();
        dispatch(replace(`${ROUTES.productDetail}/${json.data.data}`));
        return;
      }

      setLoading(false);

      dispatch(setToastInfo({ open: true, message: getErrorMessageResponse(json), isSuccess: false }));
      return;
    },
    [dataDetail?.images, deleItemIndex, dispatch, fetchDataDetail],
  );

  useEffect(() => {
    if (dataField) {
      fetchDataDetail();
    }
  }, [fetchDataDetail, dataField]);

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
          <AddProduct
            rest={{ control: control, data: dataField, error: errors, defaultValue: dataDetail }}
            handleDeleImg={handleDeleImg}
          />
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
                Update Product
              </Typography>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
