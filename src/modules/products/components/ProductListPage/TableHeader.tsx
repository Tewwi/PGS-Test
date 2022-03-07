import React from 'react';
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import { tableHeaderLabel } from '../../utils';

interface Props {
  handleCheckAll(check: boolean): void;
  handleSort(name: string): void;
  sort: 'asc' | 'desc';
  order_by: string;
}

const TableHeader = (props: Props) => {
  const { handleCheckAll, handleSort, sort, order_by } = props;
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
              sortDirection={order_by === item.name ? sort : false}
              sx={{ color: 'white' }}
            >
              <TableSortLabel
                active={order_by === item.name}
                direction={order_by === item.name ? sort : 'asc'}
                onClick={() => handleSort(item.name)}
                sx={{ color: 'white' }}
              >
                <Typography sx={{ fontSize: '13px' }} noWrap>
                  {item.name}
                </Typography>
                {order_by === item.name ? (
                  <Box component="span" sx={visuallyHidden}>
                    {sort === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
