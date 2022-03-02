import React from 'react';
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import { tableHeaderLabel } from '../utils';

interface Props {
  handleCheckAll(check: boolean): void;
  handleSort(name: string): void;
  orderSort: 'asc' | 'desc';
  fieldSort: string;
}

const TableHeader = (props: Props) => {
  const { handleCheckAll, handleSort, orderSort, fieldSort } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            onChange={(e, check) => handleCheckAll(check)}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
            size="small"
            sx={{ color: 'white' }}
          />
        </TableCell>
        {tableHeaderLabel.map((item) => {
          if (!item.canSort)
            return (
              <TableCell key={item.name} align={'left'} padding={'normal'} sx={{ color: 'white' }}>
                <Typography sx={{ fontSize: '13px' }} noWrap>
                  {item.name}
                </Typography>
              </TableCell>
            );
          return (
            <TableCell
              key={item.name}
              align={'left'}
              padding={'normal'}
              sortDirection={fieldSort === item.name ? orderSort : false}
              sx={{ color: 'white' }}
            >
              <TableSortLabel
                active={fieldSort === item.name}
                direction={fieldSort === item.name ? orderSort : 'asc'}
                onClick={() => handleSort(item.name)}
                sx={{ color: 'white' }}
              >
                <Typography sx={{ fontSize: '13px' }} noWrap>
                  {item.name}
                </Typography>
                {fieldSort === item.name ? (
                  <Box component="span" sx={visuallyHidden}>
                    {orderSort === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
        <TableCell padding="none"></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
