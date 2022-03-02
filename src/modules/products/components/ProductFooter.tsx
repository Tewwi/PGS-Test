import { FormControl, InputLabel, MenuItem, Pagination, Select, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useMemo } from 'react';
import { optionItemPerPage } from '../utils';

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

const ProductFooter = (props: Props) => {
  const { currPage, itemPerPage, totalItem, handleChangePage, handleChangItemPerPage } = props;
  const classes = useStyles();
  const lastPage = useMemo(() => {
    return Math.ceil(totalItem / itemPerPage);
  }, [totalItem, itemPerPage]);

  return (
    <div style={{ display: 'flex', width: '70vw', justifyContent: 'space-between' }}>
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
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label" color="secondary">
            Item Per Page
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={itemPerPage}
            label="itemPerPage"
            color="secondary"
            sx={{ height: '80%' }}
            onChange={(e) => handleChangItemPerPage(+e.target.value)}
          >
            {optionItemPerPage.map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default ProductFooter;
