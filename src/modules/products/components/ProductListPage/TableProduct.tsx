import React from 'react';
import { Table, TableBody, TableContainer } from '@mui/material';
import { Product } from '../../../../models/product';
import { Order } from '../../pages/ProductsListPage';
import TableHeader from './TableHeader';
import TableItem from './TableItem';

interface Props {
  tableData: Product[];
  handleCheckAll(check: boolean): void;
  handleCheckBox(id: string): void;
  handleSort(name: string): void;
  handleTrashIcon(id: string): void;
  sortInfo: {
    order_by: string;
    sort: Order;
  };
}

const TableProduct = (props: Props) => {
  const { tableData, handleCheckAll, handleCheckBox, sortInfo, handleSort, handleTrashIcon } = props;

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
            <TableItem key={item.id} data={item} onCheckBox={handleCheckBox} handleTrashIcon={handleTrashIcon} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableProduct;
