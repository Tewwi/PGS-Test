import { FilterParam } from './../../../models/userList';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface UserListState {
  dataFilter?: FilterParam;
}

export const setUserFilter = createCustomAction('product/setUserFilter', (data: FilterParam) => ({
  data,
}));

export const resetUserFilter = createCustomAction('product/resetUserFilter', () => ({}));

const actions = { setUserFilter, resetUserFilter };

type Action = ActionType<typeof actions>;

export default function reducer(state: UserListState = {}, action: Action) {
  switch (action.type) {
    case getType(setUserFilter):
      return { ...state, dataFilter: action.data };
    case getType(resetUserFilter):
      return {};
    default:
      return state;
  }
}
