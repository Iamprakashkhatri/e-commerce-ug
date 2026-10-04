import axios from "axios";
import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_COMPLETED_SUCCESS,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_FAIL,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAIL,
  USER_ORDER_DETAILS_REQUEST,
  USER_ORDER_DETAILS_SUCCESS,
  USER_ORDER_DETAILS_FAIL,
} from "../constants/orderConstants";
import { API } from "../config";

// for order list table admin
const listOrders = () => async (dispatch, getState) => {
  // for auth jwt
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const { data } = await axios.get(`${API}/product/order-list-admin/`, {
      headers: { Authorization: "JWT " + userInfo.token },
    });
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.message,
    });
  }
};

// for list order table user

const listUserOrders = () => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({
      type: MY_ORDER_LIST_REQUEST,
    });
    const { data } = await axios.get(`${API}/product/order-list-user/`, {
      headers: { Authorization: "JWT " + userInfo.token },
    });
    dispatch({
      type: MY_ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDER_LIST_FAIL,
      payload: error.message,
    });
  }
};

const userOrderDetailsAction = (id) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({
      type: USER_ORDER_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`${API}/product/order-list-user/${id}`, {
      headers: { Authorization: "JWT " + userInfo.token },
    });
    dispatch({
      type: USER_ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ORDER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

// for solo order details
const orderDetails = (id) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`${API}/product/order-list-admin/${id}`, {
      headers: { Authorization: "JWT " + userInfo.token },
    });
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

const updateAdminOrder = (id) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });
    const { data } = await axios.post(
      `${API}/product/mark-order-as-completed/${id}/`,
      {},
      {
        headers: { Authorization: "JWT " + userInfo.token },
      }
    );
    dispatch({
      type: ORDER_COMPLETED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // dispatch({
    // })
  }
};

// Checkout
const checkoutAction = (checkoutData) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({
      type: CHECKOUT_REQUEST,
    });
    const { data } = await axios.post(
      `${API}/product/checkout/`,
      checkoutData,
      {
        headers: { Authorization: "JWT " + userInfo.token },
      }
    );
    dispatch({
      type: CHECKOUT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHECKOUT_FAIL,
      payload: error.message,
    });
  }
};

export {
  listOrders,
  orderDetails,
  updateAdminOrder,
  listUserOrders,
  userOrderDetailsAction,
  checkoutAction,
};
