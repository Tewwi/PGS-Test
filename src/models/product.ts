export interface ProductFilter {
  searchKey: string;
  catagory: string;
  stockStatus: string;
  searchIn: string[];
  availability: string;
  vendor: string;
}

export interface Product {
  id: string;
  sku: string;
  price: string;
  arrivalDate: string;
  name: string;
  category: string;
  vendor: string;
  amount: string;
  checked?: boolean;
}
