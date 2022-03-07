import { Button, Container, CssBaseline, Typography } from '@mui/material';
import { replace } from 'connected-react-router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { Product, ProductFilter } from '../../../models/product';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import ProductFooter from '../components/ProductListPage/ProductFooter';
import ProductsFilter from '../components/ProductListPage/ProductsFilter';
import TableProduct from '../components/ProductListPage/TableProduct';
import TableSkeleton from '../components/ProductListPage/TableSkeleton';

export type Order = 'asc' | 'desc';

interface sortInfo {
  order_by: string;
  sort: Order;
}

let count = 1;

const ProductsListPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [tableData, setTableData] = useState<Product[]>();
  const [filterValue, setFilterValue] = useState<ProductFilter>({
    search: '',
    category: '0',
    stock_status: 'all',
    availability: 'all',
    vendor: '',
    search_type: [],
  });
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    itemPerPage: 25,
  });
  console.log(count++);
  const [loading, setLoading] = useState(false);
  const [sortInfo, setSortInfo] = useState<sortInfo>({
    order_by: 'name',
    sort: 'asc',
  });
  const [totalItem, setTotalItem] = useState(1000);

  const handleFilter = useCallback((data: ProductFilter) => {
    setFilterValue(data);
  }, []);

  const fetchProductData = useCallback(async () => {
    setLoading(true);

    const resp = await dispatch(
      fetchThunk(API_PATHS.getProduct, 'post', {
        ...filterValue,
        vendor: filterValue.vendor || '',
        search_type: filterValue.search_type?.toString(),
        page: pageInfo.page,
        count: pageInfo.itemPerPage,
        sort: sortInfo.order_by.toLowerCase(),
        order_by: sortInfo.sort.toUpperCase(),
      }),
    );
    setLoading(false);

    if (resp.data) {
      console.log(resp);
      setTableData(
        resp.data.map((item: Product) => {
          return { ...item, checked: false, isDele: false };
        }),
      );
      setTotalItem(resp.recordsFiltered);
      return;
    }

    setTableData([]);
    console.log('error');

    return;
  }, [dispatch, pageInfo.itemPerPage, pageInfo.page, filterValue, sortInfo]);

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

  const handleTrashIcon = useCallback((id: string) => {
    setTableData((prev) => {
      return prev?.map((item) => {
        if (item.id === id) {
          return { ...item, isDele: !item.isDele };
        }
        return item;
      });
    });
  }, []);

  const handleSort = (name: string) => {
    const isAsc = sortInfo.order_by === name && sortInfo.sort === 'asc';
    setSortInfo({ sort: isAsc ? 'desc' : 'asc', order_by: name });
  };

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  return (
    <>
      <CssBaseline />
      <div style={{ position: 'relative' }}>
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
                onClick={() => {
                  dispatch(replace(ROUTES.addProduct));
                }}
              >
                Add Product
              </Button>
            </div>
            {tableData && !loading ? (
              <TableProduct
                sortInfo={sortInfo}
                tableData={tableData}
                handleSort={handleSort}
                handleCheckBox={handleCheckBox}
                handleCheckAll={handleCheckAll}
                handleTrashIcon={handleTrashIcon}
              />
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
            disabled
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
              Save Changes
            </Typography>
          </Button>
          <Button
            variant="contained"
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
              Export All:CSV
            </Typography>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductsListPage;
