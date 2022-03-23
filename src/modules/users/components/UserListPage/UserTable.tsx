import { Table, TableBody, TableContainer } from '@mui/material';
import React, { memo } from 'react';
import { UserTableInfo } from '../../../../models/userList';
import UserListItem from './UserListItem';
import TableHeader from './UserTableHeader';

interface Props {
  tableData: UserTableInfo[];
  handleCheckAll(check: boolean): void;
  handleCheckBox(id: string): void;
  handleSort(name: string): void;
  sortInfo: {
    sort: string;
    order_by: 'asc' | 'desc';
  };
}

const UserTable = (props: Props) => {
  const { tableData, sortInfo, handleCheckAll, handleCheckBox, handleSort } = props;
  return (
    <TableContainer sx={{ marginTop: '20px', backgroundColor: '#323259' }}>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
        <TableHeader
          order_by={sortInfo.order_by}
          sort={sortInfo.sort}
          handleSort={handleSort}
          handleCheckAll={handleCheckAll}
        />
        <TableBody>
          {tableData?.map((item) => (
            <UserListItem key={item.profile_id} data={item} onCheckBox={handleCheckBox} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(UserTable);
