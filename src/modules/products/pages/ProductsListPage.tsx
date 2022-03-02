import { Button, Container, CssBaseline, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { Product, ProductFilter } from '../../../models/product';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import ProductFooter from '../components/ProductFooter';
import ProductsFilter from '../components/ProductsFilter';
import TableProduct from '../components/TableProduct';
import TableSkeleton from '../components/TableSkeleton';

const ProductsListPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [tableData, setTableData] = useState<Product[]>();
  const [filterValue, setFilterValue] = useState<ProductFilter>();
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    itemPerPage: 25,
  });
  const [totalItem, setTotalItem] = useState(1000);

  const handleFilter = (data: ProductFilter) => {
    setFilterValue(data);
  };

  const fetchProductData = useCallback(async () => {
    const resp = await dispatch(
      fetchThunk(API_PATHS.getProduct, 'post', { ...filterValue, page: pageInfo.page, count: pageInfo.itemPerPage }),
    );

    if (resp.data && resp.success) {
      setTableData(
        resp.data.map((item: Product) => {
          return { ...item, checked: false };
        }),
      );
      setTotalItem(resp.recordsFiltered);
      return;
    }

    console.log('error');

    return;
  }, [dispatch, pageInfo.itemPerPage, pageInfo.page, filterValue]);

  const handleChangePage = useCallback(
    (e: React.ChangeEvent<unknown>, num: number) => {
      setPageInfo({ ...pageInfo, page: num });
    },
    [pageInfo],
  );

  const handleChangItemPerPage = useCallback(
    (num: number) => {
      setPageInfo({ ...pageInfo, itemPerPage: num });
    },
    [pageInfo],
  );

  const handleCheckAll = useCallback((check: boolean) => {
    setTableData((prev) => {
      return prev?.map((item) => {
        return { ...item, checked: check };
      });
    });
  }, []);

  const handleCheckBox = useCallback((id: string) => {
    setTableData((prev) => {
      return prev?.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
    });
  }, []);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  return (
    <>
      <CssBaseline />
      <div style={{ width: '100vw', backgroundColor: '#1b1b38' }}>
        <Container maxWidth="lg" sx={{ padding: '16px' }}>
          <Typography sx={{ color: 'white' }}>Products</Typography>
          <ProductsFilter handleFilter={handleFilter} />
          <div style={{ height: '40px', margin: '20px 0px' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#b18aff',
                '&: hover': {
                  backgroundColor: '#b18aff',
                  color: 'black',
                },
              }}
            >
              Add Product
            </Button>
          </div>
          {tableData ? (
            <TableProduct tableData={tableData} handleCheckBox={handleCheckBox} handleCheckAll={handleCheckAll} />
          ) : (
            <TableSkeleton />
          )}
        </Container>
        <ProductFooter
          currPage={pageInfo.page}
          itemPerPage={pageInfo.itemPerPage}
          totalItem={totalItem}
          handleChangePage={handleChangePage}
          handleChangItemPerPage={handleChangItemPerPage}
        />
      </div>
    </>
  );
};

export default ProductsListPage;
