import { Button, Container, CssBaseline, Typography } from '@mui/material';
import { replace } from 'connected-react-router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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

export type Order = 'asc' | 'desc';

interface sortInfo {
  order_by: string;
  sort: Order;
}

let count = 0;

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
  const [loading, setLoading] = useState(false);
  const [sortInfo, setSortInfo] = useState<sortInfo>({
    order_by: 'name',
    sort: 'asc',
  });
  const [totalItem, setTotalItem] = useState(1000);
  const [itemChange, setItemChange] = useState<ProductItem[]>([]);
  const [deleItem, setDeleItem] = useState<object[]>([]);
  const [selectItem, setSelectItem] = useState<Product[]>();
  const [btnInfo, setBtnInfo] = useState({
    disable: true,
    isDele: false,
    text: 'Save Change',
  });
  console.log(count++);

  const handleFilter = useCallback((data: ProductFilter) => {
    setFilterValue(data);
  }, []);

  const handleSort = (name: string) => {
    const isAsc = sortInfo.order_by === name && sortInfo.sort === 'desc';
    setSortInfo({ sort: isAsc ? 'asc' : 'desc', order_by: name });
  };

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
        console.log(resp);
        setTableData((prev) => {
          if (prev) {
            const index = prev?.findIndex((item) => item.id == id);
            const newData = [...prev];
            newData[index] = { ...newData[index], enabled: isEnabled.toString() };
            return newData;
          }
        });
      }

      return;
    },
    [dispatch],
  );

  const handleChangeValueItem = useCallback(
    (data: ProductItem, index: number) => {
      if (tableData) {
        const newData = [...tableData];
        const cloneItem = { ...newData[index], price: data.price, amount: data.amount };
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
    setTotalItem((prev) => prev - deleItem.length);
    setLoading(false);
    setDeleItem([]);
    console.log(resp);
    return;
  }, [dispatch, deleItem]);

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
                handleChangeValueItem={handleChangeValueItem}
                handleClickPowerBtn={handleClickPowerBtn}
              />
            ) : (
              <TableSkeleton />
            )}
          </Container>
          <ProductPagination
            currPage={pageInfo.page}
            itemPerPage={pageInfo.itemPerPage}
            totalItem={totalItem}
            handleChangePage={handleChangePage}
            handleChangItemPerPage={handleChangItemPerPage}
          />
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
