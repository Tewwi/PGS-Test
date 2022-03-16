export interface RoleInfo {
  id: string;
  enabled?: string;
  name: string;
}

export interface UserRole {
  Administrator: RoleInfo[];
  Customer: RoleInfo[];
}

export interface UserStatus {
  label: string;
  value: string | null;
}

export interface Country {
  code: string;
  currency_id: string;
  id: string;
  code3: string;
  enabled: string;
  active_currency: string | null;
  is_fraudlent: string;
  country: string;
}

export interface State {
  state_id: string;
  country_code: string;
  region_code: string | null;
  state: string;
  code: string;
}

export interface FilterParam {
  page: number;
  count: number;
  search: string;
  memberships: string[];
  types: string[];
  status: string;
  country: string;
  state: string;
  address: string;
  phone: string;
  date_type: string;
  date_range: Date[];
  sort: string;
  order_by: string;
  tz?: number;
}

export interface UserTableInfo {
  profile_id: string;
  vendor: string;
  fistName: string | null;
  lastName: string | null;
  created: string;
  last_login: string;
  access_level: string;
  vendor_id: string;
  storeName: string | null;
  product: number;
  order: {
    order_as_buyer: number;
    order_as_buyer_total: string | number;
  };
  wishlist: string;
  checked?: boolean;
}

export interface newUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm_password: string;
  membership_id: string;
  forceChangePassword: number;
  taxExempt: number;
  paymentRailsType?: string;
  access_level: string;
  companyName?: string;
  income?: string;
  expense?: string;
  earning?: number;
  order_as_buyer?: number;
  order_as_buyer_total?: number;
  products_total?: string;
  default_card_id?: string;
  language?: string;
  joined?: string;
  last_login?: string;
  referer?: string;
}
