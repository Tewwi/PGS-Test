import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { ProductFilter } from '../../../models/product';

export interface ProductState {
  dataFilter?: ProductFilter;
}

export const setProductFilter = createCustomAction('product/setProductFilter', (data: ProductFilter) => ({
  data,
}));

export const resetProductFilter = createCustomAction('product/resetProductFilter', () => ({}));

const actions = { setProductFilter, resetProductFilter };

type Action = ActionType<typeof actions>;

export default function reducer(state: ProductState = {}, action: Action) {
  switch (action.type) {
    case getType(setProductFilter):
      return { ...state, dataFilter: action.data };
    case getType(resetProductFilter):
      return {};
    default:
      return state;
  }
}
