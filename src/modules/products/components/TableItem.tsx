import React from 'react';
import dayjs from 'dayjs';

import { Checkbox, Divider, TableCell, TableRow, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Product } from '../../../models/product';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles(() => ({
  divider: {
    background: 'white',
    minHeight: '20px',
    margin: 'auto',
  },
}));

interface Props {
  data: Product;
  onCheckBox(id: string): void;
}
const TableItem = (props: Props) => {
  const { data, onCheckBox } = props;

  const classes = useStyles();
  return (
    <TableRow>
      <TableCell padding="checkbox">
        <div style={{ display: 'flex' }}>
          <Checkbox sx={{ color: 'white' }} size="small" checked={data.checked} onChange={() => onCheckBox(data.id)} />
          <Divider orientation="vertical" variant="middle" flexItem classes={{ root: classes.divider }} />
          <div style={{ margin: 'auto', borderRight: '1px dashed white' }}>
            <PowerSettingsNewOutlinedIcon htmlColor="#aaf285" sx={{ margin: '5px' }} />
          </div>
        </div>
      </TableCell>
      <TableCell align="left" padding="normal" sx={{ color: 'white' }}>
        {data.sku}
      </TableCell>
      <TableCell align="left" style={{ minWidth: 190, maxWidth: 190, color: 'white' }}>
        <Typography sx={{ fontSize: '13px', width: '100%' }} noWrap>
          {data.name}
        </Typography>
      </TableCell>
      <TableCell align="left" sx={{ color: 'white' }}>
        <Typography sx={{ fontSize: '13px' }} noWrap>
          {data.category}
        </Typography>
      </TableCell>
      <TableCell align="left" sx={{ color: 'white' }}>
        <Typography sx={{ fontSize: '13px' }} noWrap>
          ${Number(data.price).toFixed(2)}
        </Typography>
      </TableCell>
      <TableCell align="left" style={{ minWidth: 50, maxWidth: 50, color: 'white' }}>
        <Typography sx={{ fontSize: '13px' }} noWrap>
          {data.amount}
        </Typography>
      </TableCell>
      <TableCell align="left" style={{ minWidth: 110, maxWidth: 110, color: 'white' }}>
        <Typography sx={{ fontSize: '13px' }} noWrap>
          {data.vendor}
        </Typography>
      </TableCell>
      <TableCell align="left" style={{ minWidth: 20, maxWidth: 20, color: 'white' }}>
        <Typography sx={{ fontSize: '13px' }} noWrap>
          {dayjs(new Date(+data.arrivalDate * 1000)).format('MMM DD,YYYY')}
        </Typography>
      </TableCell>
      <TableCell align="left" style={{ minWidth: 70, maxWidth: 70, color: 'white' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ margin: 'auto', borderRight: '1px dashed white', marginRight: '8px', minHeight: '30px' }}></div>
          <div
            onClick={() => {
              onCheckBox(data.id);
            }}
            style={{ padding: '2px', backgroundColor: '#e993f9', borderRadius: '5px' }}
          >
            <DeleteIcon />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
