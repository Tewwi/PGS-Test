import { Button, Container, CssBaseline, Typography } from '@mui/material';
import queryString from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { Product, ProductFilter, ProductItem } from '../../../models/product';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import ProductPageFooter from '../components/ProductListPage/ProductPageFooter';
import ProductPagination from '../components/ProductListPage/ProductPagination';
import ProductsFilter from '../components/ProductListPage/ProductsFilter';
import TableProduct from '../components/ProductListPage/TableProduct';
import TableSkeleton from '../components/ProductListPage/TableSkeleton';
import { resetProductFilter, setProductFilter } from '../redux/productReducer';

export type Order = 'asc' | 'desc';

interface sortInfo {
  order_by: string;
  sort: Order;
}

const ProductsListPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const history = useHistory();
  const location = useLocation();
  const filterDefault = useSelector((state: AppState) => state.product.dataFilter);
  const [tableData, setTableData] = useState<Product[]>();
  const [filterValue, setFilterValue] = useState<ProductFilter>({
    search: '',
    category: '0',
    stock_status: 'all',
    availability: 'all',
    vendor: '',
    search_type: [],
  });
  const [totalItem, setTotalItem] = useState(1000);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    itemPerPage: 25,
  });
  const [loading, setLoading] = useState(false);
  const [sortInfo, setSortInfo] = useState<sortInfo>({
    order_by: filterDefault?.sort ? filterDefault?.sort : 'name',
    sort: filterDefault?.order_by ? (filterDefault?.order_by as Order) : 'asc',
  });
  const [itemChange, setItemChange] = useState<ProductItem[]>([]);
  const [deleItem, setDeleItem] = useState<object[]>([]);
  const [selectItem, setSelectItem] = useState<Product[]>();
  const [btnInfo, setBtnInfo] = useState({
    disable: true,
    isDele: false,
    text: 'Save Change',
  });

  const handleFilter = useCallback(
    (data: ProductFilter) => {
      const newData = {
        ...data,
        page: 1,
        count: 25,
        sort: sortInfo.order_by.toLowerCase(),
        order_by: sortInfo.sort.toUpperCase(),
      };

      const newQuery = (Object.keys(newData) as Array<keyof typeof newData>).map((item) => {
        return `${item}=${newData[item] || ''}`;
      });
      history.push(`${location.pathname}?${newQuery.join('&')}`);
      dispatch(setProductFilter(newData));
      setFilterValue(data);
    },
    [dispatch, history, location.pathname, sortInfo],
  );

  const handleSort = (name: string) => {
    const isAsc = sortInfo.order_by === name && sortInfo.sort === 'desc';
    const newData = {
      ...filterDefault,
      order_by: isAsc ? 'ASC' : 'DESC',
      sort: name.toLowerCase(),
    };
    const newQuery = (Object.keys(newData) as Array<keyof typeof newData>).map((item) => {
      return `${item}=${newData[item] || ''}`;
    });
    history.push(`${location.pathname}?${newQuery.join('&')}`);
    dispatch(setProductFilter(newData as ProductFilter));
    setSortInfo({ sort: isAsc ? 'asc' : 'desc', order_by: name });
  };

  const fetchProductData = useCallback(async () => {
    setLoading(true);
    let resp;
    if (location.search.length > 1 && filterDefault) {
      resp = await dispatch(fetchThunk(API_PATHS.getProduct, 'post', filterDefault));
    } else {
      if (location.search.length > 1) return;
      resp = await dispatch(
        fetchThunk(API_PATHS.getProduct, 'post', {
          ...filterValue,
          vendor: filterValue.vendor || '',
          search_type: filterValue.search_type ? filterValue.search_type?.join(',') : '',
          page: pageInfo.page,
          count: pageInfo.itemPerPage,
          sort: sortInfo.order_by.toLowerCase(),
          order_by: sortInfo.sort.toUpperCase(),
        }),
      );
    }

    setLoading(false);
    if (resp.data) {
      setTableData(
        resp.data.map((item: Product) => {
          return { ...item, checked: false, isDele: false };
        }),
      );
      setTotalItem(resp.recordsFiltered);
      return;
    }

    setTableData([]);
    setTotalItem(0);
    console.log('error');
    return;
  }, [location.search, dispatch, filterValue, pageInfo, sortInfo, filterDefault]);

  const handleChangePage = useCallback(
    (e: React.ChangeEvent<unknown>, num: number) => {
      const newData = {
        ...filterDefault,
        page: num,
        count: pageInfo.itemPerPage,
      };
      const newQuery = (Object.keys(newData) as Array<keyof typeof newData>).map((item) => {
        return `${item}=${newData[item] || ''}`;
      });
      history.push(`${location.pathname}?${newQuery.join('&')}`);
      dispatch(setProductFilter(newData as ProductFilter));
      setPageInfo({ ...pageInfo, page: num });
    },
    [dispatch, filterDefault, history, location.pathname, pageInfo],
  );

  const handleChangItemPerPage = useCallback(
    (num: number) => {
      const newData = {
        ...filterDefault,
        count: num,
        page: 1,
      };
      const newQuery = (Object.keys(newData) as Array<keyof typeof newData>).map((item) => {
        return `${item}=${newData[item] || ''}`;
      });
      history.push(`${location.pathname}?${newQuery.join('&')}`);
      dispatch(setProductFilter(newData as ProductFilter));
      setPageInfo({ ...pageInfo, itemPerPage: num, page: 1 });
    },
    [dispatch, filterDefault, history, location.pathname, pageInfo],
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

  const handleClickPowerBtn = useCallback(
    async (id: string, enabled: boolean) => {
      setLoading(true);
      const isEnabled = enabled ? 1 : 0;
      const resp = await dispatch(
        fetchThunk(API_PATHS.updateItemTable, 'post', {
          params: [{ id: id, enable: isEnabled }],
        }),
      );
      setLoading(false);
      if (resp.success) {
        fetchProductData();
      }

      return;
    },
    [dispatch, fetchProductData],
  );

  const handleChangeValueItem = useCallback(
    (data: ProductItem, index: number) => {
      if (tableData) {
        const newData = [...tableData];
        const cloneItem = { ...newData[index], price: data.price, amount: data.stock };
        if (JSON.stringify(newData[index]) === JSON.stringify(cloneItem)) return;
        newData[index] = cloneItem;
        setItemChange((prev) => [...prev, data]);
        setTableData(newData);
        return;
      }
      return;
    },
    [tableData],
  );

  const handleSaveBtn = useCallback(async () => {
    setLoading(true);
    const resp = await dispatch(
      fetchThunk(API_PATHS.updateItemTable, 'post', {
        params: itemChange,
      }),
    );
    setLoading(false);
    console.log(resp);
    setBtnInfo((prev) => {
      return { ...prev, disable: true };
    });
    return;
  }, [dispatch, itemChange]);

  const handleRemovebtn = useCallback(async () => {
    setLoading(true);
    const resp = await dispatch(
      fetchThunk(API_PATHS.updateItemTable, 'post', {
        params: deleItem,
      }),
    );
    setTableData((prev) => {
      return prev?.filter((item) => item.isDele === false);
    });
    fetchProductData();
    console.log(resp);
    return;
  }, [dispatch, deleItem, fetchProductData]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  useEffect(() => {
    if (!tableData) return;
    const temp: object[] = [];
    tableData?.forEach((item) => {
      if (item.isDele) {
        temp.push({ id: item.id, delete: 1 });
      }
    });
    if (temp && temp.length > 0) {
      setDeleItem(temp);
    } else setDeleItem([]);
  }, [tableData]);

  useEffect(() => {
    if (!tableData) return;
    const temp = tableData?.filter((item) => item.checked);

    if (temp && temp.length > 0) {
      setSelectItem(temp);
    } else setSelectItem([]);
  }, [tableData]);

  useEffect(() => {
    if (deleItem.length > 0) {
      setBtnInfo({ disable: false, text: 'Remove selected', isDele: true });
    } else if (itemChange.length > 0) {
      setBtnInfo({ disable: false, text: 'Save Change', isDele: false });
    } else {
      setBtnInfo({ disable: true, text: 'Save Change', isDele: false });
    }
  }, [itemChange, deleItem]);

  useEffect(() => {
    if (location.search.length > 1) {
      const query = queryString.parse(location.search);
      const newData = {
        ...query,
        page: query.page ? +query.page : 2,
        count: query.count ? +query.count : 25,
      };
      setPageInfo({ page: query.page ? +query.page : 1, itemPerPage: query.count ? +query.count : 25 });
      dispatch(setProductFilter(newData as ProductFilter));
    }
  }, [location.search, dispatch]);

  useEffect(() => {
    const unlisten = history.listen((location) => {
      if (location.search == '') {
        dispatch(resetProductFilter());
      }
    });

    return () => {
      unlisten();
    };
  }, [dispatch, history]);

  return (
    <>
      <CssBaseline />
      <div style={{ position: 'relative' }}>
        <div style={{ width: '100%', backgroundColor: '#1b1b38', minHeight: '100vh' }}>
          <Container maxWidth="lg" sx={{ padding: '16px' }}>
            <Typography variant="h4" sx={{ color: 'white' }}>
              Products
            </Typography>
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
                  textTransform: 'none',
                }}
              >
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to={ROUTES.addProduct}>
                  Add Product
                </Link>
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
                handleChangeValueItem={handleChangeValueItem}
                handleClickPowerBtn={handleClickPowerBtn}
              />
            ) : (
              <TableSkeleton />
            )}
            <ProductPagination
              currPage={pageInfo.page}
              itemPerPage={pageInfo.itemPerPage}
              totalItem={totalItem}
              handleChangePage={handleChangePage}
              handleChangItemPerPage={handleChangItemPerPage}
              valueDefault={filterDefault}
            />
          </Container>
        </div>
        <ProductPageFooter
          data={selectItem && selectItem.length > 0 ? selectItem : tableData}
          btnInfo={btnInfo}
          handleSaveBtn={handleSaveBtn}
          handleRemovebtn={handleRemovebtn}
          isSelected={!!(selectItem && selectItem.length > 0)}
        />
      </div>
    </>
  );
};

export default ProductsListPage;
