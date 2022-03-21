import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { Toast } from '../../../models/layout';
import { fieldData } from '../../../models/product';

export interface ToastState {
  toast: Toast;
  data?: fieldData;
}

export const setToastInfo = createCustomAction('layout/setToastInfo', (data: Toast) => ({
  data,
}));

export const setFieldData = createCustomAction('layout/setFieldData', (data: fieldData) => ({
  data,
}));

const actions = { setToastInfo, setFieldData };

type Action = ActionType<typeof actions>;

export default function reducer(
  state: ToastState = { toast: { open: false, message: '', isSuccess: false } },
  action: Action,
) {
  switch (action.type) {
    case getType(setToastInfo):
      return { ...state, toast: action.data };
    case getType(setFieldData):
      return { ...state, data: action.data };
    default:
      return state;
  }
}
