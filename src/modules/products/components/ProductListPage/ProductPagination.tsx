import { FormControl, Pagination, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { memo, useMemo } from 'react';
import { ProductFilter } from '../../../../models/product';
import { FilterParam } from '../../../../models/userList';
import { optionItemPerPage } from '../../utils';

interface Props {
  currPage: number;
  itemPerPage: number;
  totalItem: number;
  handleChangePage(event: React.ChangeEvent<unknown>, page: number): void;
  handleChangItemPerPage(num: number): void;
  valueDefault?: ProductFilter | FilterParam;
}

const useStyles = makeStyles(() => ({
  ul: {
    '& .MuiPaginationItem-root': {
      color: '#fff',
    },
  },
}));

const ProductPagination = (props: Props) => {
  const { currPage, itemPerPage, totalItem, handleChangePage, handleChangItemPerPage, valueDefault } = props;
  const classes = useStyles();
  const lastPage = useMemo(() => {
    if (valueDefault !== undefined) {
      return Math.ceil(totalItem / (valueDefault.count || itemPerPage));
    }
    return Math.ceil(totalItem / itemPerPage);
  }, [totalItem, itemPerPage, valueDefault]);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: '#323259',
        marginBottom: '60px',
      }}
    >
      <Pagination
        color="secondary"
        classes={{ ul: classes.ul }}
        count={lastPage}
        page={valueDefault?.page || currPage}
        variant="outlined"
        shape="rounded"
        sx={{ alignSelf: 'center' }}
        onChange={handleChangePage}
      />
      <div style={{ color: 'white', margin: '10px 25px', display: 'flex' }}>
        <Typography sx={{ margin: 'auto' }}>{totalItem} items</Typography>
        <FormControl sx={{ m: 1, minWidth: 150, display: 'flex', flexDirection: 'row' }}>
          <select
            style={{ width: '50%' }}
            value={valueDefault?.count || itemPerPage}
            onChange={(e) => handleChangItemPerPage(+e.target.value)}
            className="field_input"
          >
            {optionItemPerPage?.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <Typography sx={{ margin: 'auto' }}>per page</Typography>
        </FormControl>
      </div>
    </div>
  );
};

export default memo(ProductPagination);
