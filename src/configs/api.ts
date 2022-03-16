import { APIHost } from '../utils/constants';

enum APIService {
  auth,
  public,
  vendor,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/apiAdmin`;
  } else if (service === APIService.public) {
    return `${APIHost}/api`;
  } else if (service === APIService.vendor) {
    return `${APIHost}/apiVendor`;
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
  updateItemTable: `${getBaseUrl(APIService.auth)}/products/edit`,
  getRole: `${getBaseUrl(APIService.auth)}/commons/role`,
  getCountry: `${getBaseUrl(APIService.auth)}/commons/country`,
  getState: `${getBaseUrl(APIService.auth)}/commons/state`,
  getUserList: `${getBaseUrl(APIService.auth)}/users/list`,
  editUser: `${getBaseUrl(APIService.auth)}/users/edit`,
  createUser: `${getBaseUrl(APIService.auth)}/users/create`,
  uploadImg: `${getBaseUrl(APIService.public)}/products/upload-image`,
  getUserDetail: `${getBaseUrl(APIService.vendor)}/profile/detail`,
};
