export interface ProductFilter {
  search?: string;
  category?: string;
  stock_status?: string;
  search_type: string[];
  availability?: string;
  vendor?: string;
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
  vendorID: string;
  enabled?: string;
  checked?: boolean;
  isDele?: boolean;
}

export interface ProductItem {
  id: string;
  price: string;
  amount: string;
}

export interface Vendor {
  id: string | number;
  login: string;
  companyName: string;
  name: string;
}

export interface Catagory {
  id: string;
  parentId: string;
  name: string;
  path: string;
  pos: string;
}

export interface Brand {
  id: string | null;
  name: string;
}

export interface Condition {
  id: string | null;
  name: string;
}

export interface Images {
  id: string;
  file: string;
  thumbs: string[];
}

export interface IShipping {
  id: string;
  name?: string;
  price: string;
  zone_name?: string;
}

export interface fieldData {
  vendor?: Vendor[];
  catagory?: Catagory[];
  brand?: Brand[];
  condition?: Condition[];
  shipping?: IShipping[];
}

export interface ProductCreateParam {
  vendor_id: Vendor;
  name: string;
  brand_id: string;
  condition_id: string | null;
  sku?: string;
  imagesOrder: string[];
  categories: number[];
  description: any;
  enabled?: number;
  memberships?: number[] | null;
  tax_exempt?: number;
  price: string;
  sale_price_type?: string;
  sale_price?: string;
  arrival_date?: string;
  quantity: string;
  shipping_to_zones: IShipping[];
  og_tags_type?: string;
  og_tags?: string;
  meta_description?: string;
  meta_desc_type?: string;
  meta_keywords?: string;
  product_page_title?: string;
  facebook_marketing_enabled?: number;
  google_feed_enabled?: number;
  images: Images[];
  imgUpload: File[];
  deleted_images?: number[];
}
