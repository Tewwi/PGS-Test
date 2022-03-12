import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { replace } from 'connected-react-router';
import { convertToHTML } from 'draft-convert';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { Brand, Catagory, Condition, IShipping, ProductCreateParam, Vendor } from '../../../models/product';
import { AppState } from '../../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import Loading from '../../common/components/Loading';
import { fetchThunk } from '../../common/redux/thunk';
import AddProduct from '../components/AddProductPage/AddProduct';
import Marketing from '../components/AddProductPage/Marketing';
import Price from '../components/AddProductPage/Price';
import Shipping from '../components/AddProductPage/Shipping';

export interface fieldData {
  vendor?: Vendor[];
  catagory?: Catagory[];
  brand?: Brand[];
  condition?: Condition[];
  shipping?: IShipping[];
}

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
          zone_name: 'Continental U.S.',
          price: '0.00',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({ name: 'shipping_to_zones', control });
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<fieldData>();

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
  };

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

    setData(data);
  }, [dispatch]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

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
          <AddProduct data={data} control={control} error={errors} />
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
