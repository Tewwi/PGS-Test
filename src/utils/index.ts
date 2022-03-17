export const validEmailRegex =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getErrorMessageResponse = (response: any) => {
  if (typeof response?.errors === 'string') {
    return response?.errors;
  }

  if (response?.errors?.params) {
    return response?.errors?.params;
  }

  return '';
};
