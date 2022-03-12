import { UserStatus } from '../../models/userList';
import { Memberships } from '../products/utils';

export const userStatus: UserStatus[] = [
  {
    label: 'Any status',
    value: '',
  },
  {
    label: 'Enable',
    value: 'E',
  },
  {
    label: 'Disable',
    value: 'D',
  },
  {
    label: 'Unapproved vendor',
    value: 'U',
  },
];

export const memberships = {
  Memberships: [
    {
      label: 'General',
      value: 'M_4',
    },
  ],
  Pending_Memberships: [
    {
      label: 'General',
      value: 'P_4',
    },
  ],
};
export const data_type = [
  { label: 'Register', value: 'R' },
  { label: 'Last logged in', value: 'L' },
];

export const tableHeaderLabel = [
  {
    name: 'Login/Email',
    canSort: true,
  },
  {
    name: 'Name',
    canSort: true,
  },
  {
    name: 'Access level',
    canSort: false,
  },
  {
    name: 'Products',
    canSort: false,
  },
  {
    name: 'Orders',
    canSort: false,
  },
  {
    name: 'Wishlist',
    canSort: false,
  },
  {
    name: 'Created',
    canSort: false,
  },
  {
    name: 'Last Login',
    canSort: false,
  },
];

export const accessLevel = [
  {
    label: 'Vendor',
    value: '10',
  },
  {
    label: 'Admin',
    value: '100',
  },
];
export const paymentRailsType = ['individual', 'business'];
export const membershipsUser: Memberships[] = [
  {
    label: 'Ignore Membership',
    value: '',
  },
  {
    label: 'General',
    value: '4',
  },
];
