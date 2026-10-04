import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_COMPLETED_SUCCESS,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAIL,
  USER_ORDER_DETAILS_REQUEST,
  USER_ORDER_DETAILS_SUCCESS,
  USER_ORDER_DETAILS_FAIL,
} from "../constants/orderConstants";

// for solo order details
const orderDetailsReducer = (state = { orderDetailsObj: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true, ...state };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, orderDetailsObj: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// for order list table admin
const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true, orders: [] };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload, ...state };
    default:
      return state;
  }
};

// for order list table user
const myOrderListReducer = (state = { userOrders: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_LIST_REQUEST:
      return { loading: true, userOrders: [] };
    case MY_ORDER_LIST_SUCCESS:
      return { loading: false, userOrders: action.payload };
    case MY_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload, ...state };
    default:
      return state;
  }
};

// for order completed
const orderCompleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case ORDER_COMPLETED_SUCCESS:
      return {
        loading: false,
        orderCompleted: action.payload,
        Completed: true,
      };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Checkout Reducer
function checkoutReducer(state = {}, action) {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return { ...state, loading: true };
    case CHECKOUT_SUCCESS:
      return { ...state, loading: false, checkout: action.payload };
    case CHECKOUT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// User Order Details Reducer

const userOrderDetailsReducer = (state = { userOrderDetails: {} }, action) => {
  switch (action.type) {
    case USER_ORDER_DETAILS_REQUEST:
      return { loading: true, ...state };
    case USER_ORDER_DETAILS_SUCCESS:
      return { loading: false, userOrderDetails: action.payload };
    case USER_ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export {
  orderDetailsReducer,
  orderListReducer,
  orderCompleteReducer,
  myOrderListReducer,
  checkoutReducer,
  userOrderDetailsReducer,
};
