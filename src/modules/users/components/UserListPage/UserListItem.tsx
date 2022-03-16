import { Checkbox, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { UserTableInfo } from '../../../../models/userList';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../configs/routes';

interface Props {
  data: UserTableInfo;
  onCheckBox(id: string): void;
}

const UserListItem = (props: Props) => {
  const { data, onCheckBox } = props;
  const [isSelect, setIsSelect] = React.useState(data.checked);

  React.useEffect(() => {
    setIsSelect(data.checked);
  }, [data]);

  return (
    <TableRow selected={isSelect} className={`table_row ${isSelect ? 'row_select' : ''}`}>
      <TableCell padding="checkbox">
        <Checkbox
          sx={{ color: 'white' }}
          size="small"
          checked={data.checked}
          onChange={() => {
            onCheckBox(data.profile_id);
          }}
        />
      </TableCell>
      <TableCell align="left" padding="normal" sx={{ color: 'white' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p className="link-text">
            <Link to={`${ROUTES.userDetail}/${data.profile_id}`}>{data.vendor}</Link>
          </p>
          <p>{data.storeName}</p>
        </div>
      </TableCell>
      <TableCell align="left" padding="normal" sx={{ color: 'white' }}>
        {`${data.fistName || ''} ${data.lastName || ''}`}
      </TableCell>
      <TableCell align="left" padding="normal" sx={{ color: 'white' }}>
        {data.access_level}
      </TableCell>
      <TableCell align="left" padding="normal" sx={{ color: 'white' }}>
        {data.product}
      </TableCell>
      <TableCell align="left" padding="normal" sx={{ color: 'white' }}>
        {data.order.order_as_buyer}
      </TableCell>
      <TableCell align="left" padding="normal" sx={{ color: 'white' }}>
        {data.wishlist}
      </TableCell>
      <TableCell align="left" padding="normal" sx={{ color: 'white' }}>
        {dayjs(new Date(+data.created * 1000)).format('MMM DD,YYYY, hh:mmA')}
      </TableCell>
      <TableCell align="left" padding="normal" sx={{ color: 'white' }}>
        {dayjs(new Date(+data.last_login * 1000)).format('MMM DD,YYYY, hh:mmA')}
      </TableCell>
      <TableCell align="left" style={{ minWidth: 70, maxWidth: 70, color: 'white' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ margin: 'auto', borderRight: '1px dashed white', marginRight: '8px', minHeight: '30px' }}></div>
          <div
            onClick={() => {
              onCheckBox(data.profile_id);
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

export default UserListItem;
