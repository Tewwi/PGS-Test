import { Vendor, Catagory } from './../../../models/product';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface ProductState {
  vendor?: Vendor[];
  catagory?: Catagory[];
}

export const setVendorRedux = createCustomAction('product/setVendor', (data: Vendor[]) => ({
  data,
}));

export const setCatagoryRedux = createCustomAction('product/setCatagory', (data: Catagory[]) => ({
  data,
}));

const actions = { setVendorRedux, setCatagoryRedux };

type Action = ActionType<typeof actions>;

export default function reducer(state: ProductState = {}, action: Action) {
  switch (action.type) {
    case getType(setVendorRedux):
      return { ...state, vendor: action.data };
    case getType(setCatagoryRedux):
      return { ...state, catagory: action.data };
    default:
      return state;
  }
}
