import { constants } from "@/settings";

const prefixAuth: string = "/core";
const prefixBase: string = "/api/v1";
const prefixOther: string = "/api/core";

const prefixApiAuth: string = `/api/core`;

const prefixUser: string = "/api";
const endpointAuth = {
  SIGN_IN: `${prefixBase}/auth/login/`,
  VERIFY_TOKEN: `token/verify/`,
};

const endpointUsersManagement = {
  GET_ALL_USERS: `${prefixBase}/user-managements/`,
};

const endpointEventsManagement = {
  GET_ALL_EVENTS: `${prefixBase}/event/`,
  ADMIN_GET_ALL_EVENTS: `${prefixBase}/event/admin`,
  MANAGER_GET_ALL_EVENTS: `${prefixBase}/event/`,
  GET_EVENT_DETAIL: `${prefixBase}/event/{id}`,
  CREATE_EVENT: `${prefixBase}/event/`,
  DELETE_EVENT: `${prefixBase}/event/{id}`,
  UPDATE_EVENT: `${prefixBase}/event/{id}`,
  REGISTER_EVENT: `${prefixBase}/event/{id}/register`,
  EVENT_REGISTRATIONS: `${prefixBase}/event/{id}/registrations`,
  TAKE_ATTENDANCE: `${prefixBase}/event/attendance`,
};

const endpointCart = {
  GET_CART_BY_ID: `${prefixUser}/Cart/{id}`,
  GET_CURRENT_CART: `${prefixUser}/Cart/{id}`,
  ADD_NEW_CART: `${prefixUser}/Cart/{id}`,
  DELETE_CART: `${prefixUser}/Cart/delete/{id}`,
  ADD_CART: `${prefixUser}/Cart/add-to-cart`,
};

const endpointProduct = {
  GET_ALL_PRODUCT: `${prefixUser}/TemplateCanvas/get-basic`,
  GET_PRODUCT: `${prefixUser}/TemplateCanvas/{id}`,
  ADD_NEW_PRODUCT: `${prefixUser}/TemplateCanvas`,
  GET_ALL_SUBPRODUCT: `${constants.API_SERVER}${prefixUser}/TemplateCanvas/products/{id}`,
};

const endpointScheduleManagement = {};

const endpointOther = {};

export {
  endpointAuth,
  endpointUsersManagement,
  endpointScheduleManagement,
  endpointEventsManagement,
  endpointCart,
  endpointProduct,
  endpointOther,
};
