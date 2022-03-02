export const checkBoxValue = ['Name', 'SKU', 'Full Description'];

interface TabelHeader {
  name: string;
  canSort: boolean;
}

export const optionItemPerPage = [10, 25, 50, 75, 100];

export const tableHeaderLabel: TabelHeader[] = [
  {
    name: 'SKU',
    canSort: true,
  },
  {
    name: 'Name',
    canSort: true,
  },
  {
    name: 'Category',
    canSort: false,
  },
  {
    name: 'Price',
    canSort: true,
  },
  {
    name: 'In stock',
    canSort: true,
  },
  {
    name: 'Vendor',
    canSort: true,
  },
  {
    name: 'Arrival Date',
    canSort: true,
  },
];
