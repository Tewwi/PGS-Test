import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { Toast } from '../../../models/layout';

export interface ToastState {
  toast: Toast;
}

export const setToastInfo = createCustomAction('layout/setToastInfo', (data: Toast) => ({
  data,
}));

const actions = { setToastInfo };

type Action = ActionType<typeof actions>;

export default function reducer(
  state: ToastState = { toast: { open: false, message: '', isSuccess: false } },
  action: Action,
) {
  switch (action.type) {
    case getType(setToastInfo):
      return { ...state, toast: action.data };
    default:
      return state;
  }
}
