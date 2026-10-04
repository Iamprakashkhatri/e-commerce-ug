import {
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_FAIL,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,
  GET_USER_VERIFIED,
  SET_USER_VERIFIED,
  UPDATE_USERDETAILS_REQUEST,
  UPDATE_USERDETAILS_SUCCESS,
  UPDATE_USERDETAILS_FAIL,
  GET_SHIPPING_REQUEST,
  GET_SHIPPING_SUCCESS,
  GET_SHIPPING_FAIL,
  ADD_NEWSLETTER_SUBSCRIPTION_REQUEST,
  ADD_NEWSLETTER_SUBSCRIPTION_SUCCESS,
  ADD_NEWSLETTER_SUBSCRIPTION_FAIL,
  UPDATE_SHIPPING_REQUEST,
  UPDATE_SHIPPING_SUCCESS,
  UPDATE_SHIPPING_FAIL,
  GET_ROLE_REQUEST,
  GET_ROLE_SUCCESS,
  GET_ROLE_FAIL,
  ADD_ROLE_REQUEST,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAIL,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAIL,
  UPDATE_ROLE_REQUEST,
  UPDATE_BILLING_REQUEST,
  GET_BILLING_REQUEST,
  GET_BILLING_SUCCESS,
  GET_BILLING_FAIL,
  UPDATE_BILLING_SUCCESS,
  UPDATE_BILLING_FAIL,
} from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGN_IN_REQUEST:
      return { loading: true };
    case USER_SIGN_IN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGN_IN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGN_OUT:
      return {};
    case GET_USER_INFO_REQUEST:
      return { ...state, loading: true };
    case GET_USER_INFO_SUCCESS:
      return {
        loading: false,
        userInfo: {
          ...state.userInfo,
          userInfo: action.payload,
        },
      };
    case GET_USER_INFO_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function userVerifiedReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER_VERIFIED:
      return action.payload;
    case GET_USER_VERIFIED:
      return action.payload;
    default:
      return state;
  }
}
const updateUserDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USERDETAILS_REQUEST:
      return { ...state, loading: true };
    case UPDATE_USERDETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case UPDATE_USERDETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const getShippingDetailsReducer = (state = { shippingDetail: {} }, action) => {
  switch (action.type) {
    case GET_SHIPPING_REQUEST:
      return { ...state, loading: true };
    case GET_SHIPPING_SUCCESS:
      return { ...state, loading: false, shippingDetail: action.payload };
    case GET_SHIPPING_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const addNewsletterSubscriptionReducer = (
  state = { subscribe: {} },
  action
) => {
  switch (action.type) {
    case ADD_NEWSLETTER_SUBSCRIPTION_REQUEST:
      return { ...state, loading: true };
    case ADD_NEWSLETTER_SUBSCRIPTION_SUCCESS:
      return { ...state, loading: false, subscribe: action.payload };
    case ADD_NEWSLETTER_SUBSCRIPTION_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const updateShippingDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SHIPPING_REQUEST:
      return { ...state, loading: true };
    case UPDATE_SHIPPING_SUCCESS:
      return { ...state, loading: false, updateShippingDetail: action.payload };
    case UPDATE_SHIPPING_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const getRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ROLE_REQUEST:
      return { ...state, loading: true };
    case GET_ROLE_SUCCESS:
      return { ...state, loading: false, roles: action.payload };
    case GET_ROLE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const addRoleReducer = (state = { roles: {} }, action) => {
  switch (action.type) {
    case ADD_ROLE_REQUEST:
      return { ...state, loading: true };
    case ADD_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: action.payload,
      };
    case ADD_ROLE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const updateRoleReducer = (state = { roles: {} }, action) => {
  switch (action.type) {
    case UPDATE_ROLE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: action.payload,
      };
    case UPDATE_ROLE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const getBillingDetailsReducer = (state = { billingDetails: {} }, action) => {
  switch (action.type) {
    case GET_BILLING_REQUEST:
      return { ...state, loading: true };
    case GET_BILLING_SUCCESS:
      return { ...state, loading: false, billingDetails: action.payload };
    case GET_BILLING_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const updateBillingDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BILLING_REQUEST:
      return { ...state, loading: true };
    case UPDATE_BILLING_SUCCESS:
      return { ...state, loading: false, updateBilling: action.payload };
    case UPDATE_BILLING_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export {
  userSigninReducer,
  userVerifiedReducer,
  updateUserDetailsReducer,
  getShippingDetailsReducer,
  addNewsletterSubscriptionReducer,
  updateShippingDetailsReducer,
  getRoleReducer,
  addRoleReducer,
  updateRoleReducer,
  getBillingDetailsReducer,
  updateBillingDetailsReducer,
};
