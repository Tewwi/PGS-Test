import { FormControl, Pagination, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useMemo } from 'react';
import { optionItemPerPage } from '../../utils';

interface Props {
  currPage: number;
  itemPerPage: number;
  totalItem: number;
  handleChangePage(event: React.ChangeEvent<unknown>, page: number): void;
  handleChangItemPerPage(num: number): void;
}

const useStyles = makeStyles(() => ({
  ul: {
    '& .MuiPaginationItem-root': {
      color: '#fff',
    },
  },
}));

const ProductPagination = (props: Props) => {
  const { currPage, itemPerPage, totalItem, handleChangePage, handleChangItemPerPage } = props;
  const classes = useStyles();
  const lastPage = useMemo(() => {
    return Math.ceil(totalItem / itemPerPage);
  }, [totalItem, itemPerPage]);

  return (
    <div style={{ display: 'flex', width: '70vw', justifyContent: 'space-between', paddingBottom: '60px' }}>
      <Pagination
        color="secondary"
        classes={{ ul: classes.ul }}
        count={lastPage}
        page={currPage}
        variant="outlined"
        shape="rounded"
        sx={{ margin: 'auto' }}
        onChange={handleChangePage}
      />
      <div style={{ color: 'white', margin: 'auto', display: 'flex' }}>
        <Typography sx={{ margin: 'auto' }}>{totalItem} items</Typography>
        <FormControl sx={{ m: 1, minWidth: 150, display: 'flex', flexDirection: 'row' }}>
          <select
            style={{ width: '50%' }}
            value={itemPerPage}
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

export default ProductPagination;
