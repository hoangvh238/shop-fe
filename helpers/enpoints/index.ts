const prefixAuth: string = "/core";
const prefixBase: string = "/api/v1";
const prefixOther: string = "/api/core";

const prefixApiAuth: string = `/api/core`;

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

const endpointScheduleManagement = {};

const endpointOther = {};

export {
  endpointAuth,
  endpointUsersManagement,
  endpointScheduleManagement,
  endpointEventsManagement,
  endpointOther,
};
