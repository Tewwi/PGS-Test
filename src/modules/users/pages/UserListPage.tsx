import { Button, Container, CssBaseline, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { AppState } from '../../../redux/reducer';
import { UserTableInfo, FilterParam } from '../../../models/userList';
import UserFilter from '../components/UserListPage/UserFilter';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import UserTable from '../components/UserListPage/UserTable';
import TableSkeleton from '../../products/components/ProductListPage/TableSkeleton';
import ProductPagination from '../../products/components/ProductListPage/ProductPagination';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import dayjs from 'dayjs';
import UserListPageFooter from '../components/UserListPage/UserListPageFooter';

interface sortInfo {
  sort: string;
  order_by: 'asc' | 'desc';
}

const UserListPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [usersData, setUsersData] = useState<UserTableInfo[]>();
  const [loading, setLoading] = useState(false);
  const [filterParams, setFilterParams] = useState<FilterParam>();
  const [totalItem, setTotalItem] = useState(1000);
  const [selectItem, setSelectItem] = useState<UserTableInfo[]>([]);
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    count: 25,
  });
  const [sortInfo, setSortInfo] = useState<sortInfo>({
    sort: 'vendor',
    order_by: 'asc',
  });

  const fetchUsersData = useCallback(async () => {
    setLoading(true);

    const temp = filterParams?.date_range?.map((item) => dayjs(item).format('YYYY-MM-DD'));
    const newData = {
      ...filterParams,
      status: filterParams?.status ? [filterParams?.status] : [],
      date_range: temp ? temp : [],
    };

    const resp = await dispatch(
      fetchThunk(API_PATHS.getUserList, 'post', {
        ...pageInfo,
        ...newData,
        sort: sortInfo.sort == 'Name' ? 'fistName' : 'vendor',
        order_by: sortInfo.order_by.toUpperCase(),
      }),
    );

    setLoading(false);

    console.log(resp);
    if (resp.success) {
      setTotalItem(+resp.recordsFiltered);
      setUsersData(
        resp.data.map((item: UserTableInfo) => {
          return { ...item, checked: false };
        }),
      );
      return;
    }

    console.log('error');
    return;
  }, [dispatch, pageInfo, filterParams, sortInfo]);

  const handleFilter = useCallback((data: FilterParam) => {
    const newData = { ...data, country: data.country ?? '', state: data.state ?? '' };
    setFilterParams(newData);
  }, []);

  const handleSort = (name: string) => {
    const isAsc = sortInfo.sort === name && sortInfo.order_by === 'desc';
    setSortInfo({ order_by: isAsc ? 'asc' : 'desc', sort: name });
  };

  const handleChangePage = useCallback(
    (e: React.ChangeEvent<unknown>, num: number) => {
      setPageInfo({ ...pageInfo, page: num });
    },
    [pageInfo],
  );

  const handleChangItemPerPage = useCallback(
    (num: number) => {
      setPageInfo({ ...pageInfo, count: num });
    },
    [pageInfo],
  );

  const handleCheckAll = useCallback((check: boolean) => {
    setUsersData((prev) => {
      return prev?.map((item) => {
        return { ...item, checked: check };
      });
    });
  }, []);

  const handleCheckBox = useCallback((id: string) => {
    setUsersData((prev) => {
      return prev?.map((item) => {
        if (item.profile_id === id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
    });
  }, []);

  const handleRemoveItem = useCallback(async () => {
    setLoading(true);

    const body = selectItem?.map((item) => {
      return { id: item.profile_id, delete: 1 };
    });
    const resp = await dispatch(fetchThunk(API_PATHS.editUser, 'post', { params: body }));
    if (resp.susuccess) {
      console.log('susuccess');
      return;
    }
    console.log('error');
    return;
  }, [dispatch, selectItem]);

  useEffect(() => {
    if (usersData && usersData.length > 0) {
      setSelectItem(usersData.filter((item) => item.checked === true));
      return;
    } else {
      return;
    }
  }, [usersData]);

  useEffect(() => {
    if (selectItem.length > 0) {
      setIsBtnDisable(false);
    } else {
      setIsBtnDisable(true);
    }
  }, [selectItem]);

  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  return (
    <>
      <CssBaseline />
      <div style={{ position: 'relative' }}>
        <div style={{ width: '100%', backgroundColor: '#1b1b38', minHeight: '100vh' }}>
          <Container maxWidth="lg" sx={{ padding: '16px' }}>
            <Typography variant="h4" sx={{ color: 'white', marginBottom: '10px' }}>
              Search for users
            </Typography>
            <UserFilter handleFilter={handleFilter} />
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
                  dispatch(replace(ROUTES.createUser));
                }}
              >
                Add User
              </Button>
            </div>
            {usersData && !loading ? (
              <UserTable
                tableData={usersData}
                handleCheckAll={handleCheckAll}
                handleCheckBox={handleCheckBox}
                handleSort={handleSort}
                sortInfo={sortInfo}
              />
            ) : (
              <TableSkeleton />
            )}
          </Container>
          <ProductPagination
            currPage={pageInfo.page}
            itemPerPage={pageInfo.count}
            totalItem={totalItem}
            handleChangePage={handleChangePage}
            handleChangItemPerPage={handleChangItemPerPage}
          />
          <UserListPageFooter btnDisable={isBtnDisable} handleRemovebtn={handleRemoveItem} />
        </div>
      </div>
    </>
  );
};

export default UserListPage;
