import { Button, Container, CssBaseline, Typography } from '@mui/material';
import dayjs from 'dayjs';
import queryString from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { FilterParam, UserTableInfo } from '../../../models/userList';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import ProductPagination from '../../products/components/ProductListPage/ProductPagination';
import TableSkeleton from '../../products/components/ProductListPage/TableSkeleton';
import UserFilter from '../components/UserListPage/UserFilter';
import UserListPageFooter from '../components/UserListPage/UserListPageFooter';
import UserTable from '../components/UserListPage/UserTable';
import { resetUserFilter, setUserFilter } from '../redux/userReducer';

interface sortInfo {
  sort: string;
  order_by: 'asc' | 'desc';
}

const UserListPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const filterDefault = useSelector((state: AppState) => state.userList.dataFilter);
  const history = useHistory();
  const location = useLocation();
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

    const temp = filterParams?.date_range
      ? filterParams?.date_range?.map((item) => dayjs(item).format('YYYY-MM-DD'))
      : [];
    const newData = {
      ...filterParams,
      status: filterParams?.status ? [filterParams?.status] : [],
      date_range: temp ? temp : [],
    };
    let resp;

    if (location.search.length > 1 && filterDefault) {
      resp = await dispatch(
        fetchThunk(API_PATHS.getUserList, 'post', {
          ...filterDefault,
          status: filterDefault?.status ? [filterDefault?.status] : [],
          date_range: temp ? temp : [],
          memberships: filterDefault.memberships?.toString().split(','),
          types: filterDefault.types?.toString().split(','),
        }),
      );
    } else {
      if (location.search.length > 1) return;
      resp = await dispatch(
        fetchThunk(API_PATHS.getUserList, 'post', {
          ...pageInfo,
          ...newData,
          sort: sortInfo.sort == 'Name' ? 'fistName' : 'vendor',
          order_by: sortInfo.order_by.toUpperCase(),
        }),
      );
    }

    setLoading(false);

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
  }, [location, filterParams, filterDefault, dispatch, pageInfo, sortInfo]);

  const handleFilter = useCallback(
    (data: FilterParam) => {
      const newData = {
        ...data,
        country: data.country ?? '',
        state: data.state ?? '',
        page: 1,
        count: 25,
        sort: sortInfo.sort == 'Name' ? 'fistName' : 'vendor',
        order_by: sortInfo.order_by.toUpperCase(),
      };
      const newQuery = (Object.keys(newData) as Array<keyof typeof newData>).map((item) => {
        return `${item}=${newData[item] || ''}`;
      });
      history.push(`${location.pathname}?${newQuery.join('&')}`);
      dispatch(setUserFilter(newData));

      setFilterParams(newData);
    },
    [dispatch, history, location.pathname, sortInfo],
  );

  const handleSort = useCallback(
    (name: string) => {
      const isAsc = sortInfo.sort === name && sortInfo.order_by === 'desc';
      const newData = { ...filterDefault, order_by: isAsc ? 'asc' : 'desc', sort: name };

      const newQuery = (Object.keys(newData) as Array<keyof typeof newData>).map((item) => {
        return `${item}=${newData[item]}`;
      });
      history.push(`${location.pathname}?${newQuery.join('&')}`);
      dispatch(setUserFilter(newData as FilterParam));
      setSortInfo({ order_by: isAsc ? 'asc' : 'desc', sort: name });
    },
    [dispatch, filterDefault, history, location.pathname, sortInfo.order_by, sortInfo.sort],
  );

  const handleChangePage = useCallback(
    (e: React.ChangeEvent<unknown>, num: number) => {
      const newData = {
        ...filterDefault,
        page: num,
        count: pageInfo.count,
      };
      const newQuery = (Object.keys(newData) as Array<keyof typeof newData>).map((item) => {
        return `${item}=${newData[item] || ''}`;
      });
      history.push(`${location.pathname}?${newQuery.join('&')}`);
      dispatch(setUserFilter(newData as FilterParam));
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
      dispatch(setUserFilter(newData as FilterParam));
      setPageInfo({ ...pageInfo, count: num, page: 1 });
    },
    [dispatch, filterDefault, history, location.pathname, pageInfo],
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

    setLoading(false);

    const resp = await dispatch(fetchThunk(API_PATHS.editUser, 'post', { params: body }));
    if (resp.success) {
      console.log('success');
      fetchUsersData();
      return;
    }

    console.log('error');
    return;
  }, [dispatch, selectItem, fetchUsersData]);

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
  }, [fetchUsersData, filterDefault]);

  useEffect(() => {
    if (location.search.length > 1) {
      const query = queryString.parse(location.search);
      const newData = {
        ...query,
        page: query.page ? +query.page : 1,
        count: query.count ? +query.count : 25,
      };
      setPageInfo({ page: query.page ? +query.page : 1, count: query.count ? +query.count : 25 });
      dispatch(setUserFilter(newData as FilterParam));
    }
  }, [location, dispatch]);

  useEffect(() => {
    const unlisten = history.listen((location) => {
      if (location.search == '') {
        dispatch(resetUserFilter());
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
              >
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to={ROUTES.createUser}>
                  Add User
                </Link>
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
            <ProductPagination
              currPage={pageInfo.page}
              itemPerPage={pageInfo.count}
              totalItem={totalItem}
              handleChangePage={handleChangePage}
              handleChangItemPerPage={handleChangItemPerPage}
              valueDefault={filterDefault}
            />
          </Container>
          <UserListPageFooter btnDisable={isBtnDisable} handleRemovebtn={handleRemoveItem} />
        </div>
      </div>
    </>
  );
};

export default UserListPage;
