import { APIHost } from '../utils/constants';

enum APIService {
  auth,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/apiAdmin`;
  } else if (service === APIService.public) {
    return `${APIHost}/api`;
  }
  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.public)}/authentication/login`,
  getProduct: `${getBaseUrl(APIService.public)}/products/list`,
  getProductDetail: `${getBaseUrl(APIService.auth)}/products/detail`,
  getCategories: `${getBaseUrl(APIService.public)}/categories/list`,
  getVendor: `${getBaseUrl(APIService.auth)}/vendors/list`,
  getBrand: `${getBaseUrl(APIService.auth)}/brands/list`,
  getConditions: `${getBaseUrl(APIService.auth)}/conditions/list`,
  getShipping: `${getBaseUrl(APIService.auth)}/shipping/list`,
  createProduct: `${getBaseUrl(APIService.auth)}/products/create`,
};
