import Axios from "axios";
import { useState } from "react";
import { API } from "../config.js";
import {
  ADD_NEWSLETTER_SUBSCRIPTION_FAIL,
  ADD_NEWSLETTER_SUBSCRIPTION_REQUEST,
  ADD_NEWSLETTER_SUBSCRIPTION_SUCCESS,
  ADD_ROLE_FAIL,
  ADD_ROLE_REQUEST,
  ADD_ROLE_SUCCESS,
  GET_ROLE_FAIL,
  GET_ROLE_REQUEST,
  GET_ROLE_SUCCESS,
  GET_SHIPPING_FAIL,
  GET_SHIPPING_REQUEST,
  GET_SHIPPING_SUCCESS,
  GET_USER_INFO_FAIL,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  UPDATE_SHIPPING_FAIL,
  UPDATE_SHIPPING_REQUEST,
  UPDATE_SHIPPING_SUCCESS,
  UPDATE_USERDETAILS_FAIL,
  UPDATE_USERDETAILS_REQUEST,
  UPDATE_USERDETAILS_SUCCESS,
  USER_SIGN_IN_FAIL,
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_UP_REQUEST,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAIL,
  USER_SIGN_OUT,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAIL,
  UPDATE_ROLE_REQUEST,
  GET_BILLING_REQUEST,
  GET_BILLING_SUCCESS,
  GET_BILLING_FAIL,
  UPDATE_BILLING_REQUEST,
  UPDATE_BILLING_SUCCESS,
  UPDATE_BILLING_FAIL,
} from "../constants/userConstants.js";

const signIn = (uid, remember, history) => async (dispatch) => {
  window.localStorage.setItem("remember", remember);

  try {
    // dispatch({ type: USER_SIGN_IN_REQUEST });
    const { data } = await Axios.post(`${API}/account/login/`, {
      user_uuid: uid,
    });

    if (data.user && data.user.is_active === true) {
      dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data });
      window.sessionStorage.setItem("userInfo", JSON.stringify(data));
      if (remember) {
        window.localStorage.setItem("userInfo", JSON.stringify(data));
      }
      history.push("/");
    } else {
      history.push("/blocked");
    }
  } catch (error) {
    dispatch({
      type: USER_SIGN_IN_FAIL,
      payload: error.message,
    });
  }
};

const socialSignIn = (user, remember, history) => async (
  dispatch,
  getState
) => {
  try {
    const { data } = await Axios.post(`${API}/account/social-login/`, user);

    if (data.user && data.user.is_active === true) {
      dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data });
      window.sessionStorage.setItem("userInfo", JSON.stringify(data));
      if (remember)
        window.localStorage.setItem("userInfo", JSON.stringify(data));
      history.push("/");
    } else {
      history.push("/blocked");
    }
  } catch (error) {
    dispatch({
      type: USER_SIGN_IN_FAIL,
      payload: error.message,
    });
  }
};

const signOut = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("userInfo");
  localStorage.removeItem("verified");
  sessionStorage.removeItem("verified");
  window.localStorage.setItem("CREDENTIALS_FLUSH", Date.now().toString());
  window.localStorage.removeItem("CREDENTIALS_FLUSH");
  dispatch({ type: USER_SIGN_OUT });
};

const getUserProfileDetails = () => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();

  try {
    dispatch({ type: GET_USER_INFO_REQUEST });
    const data = await Axios.get(`${API}/account/user-profile/`, {
      headers: { Authorization: "JWT " + userInfo.token },
    });

    dispatch({
      type: GET_USER_INFO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_USER_INFO_FAIL, payload: error.message });
  }
};

const updateUserProfileDetails = (updateProfile) => async (
  dispatch,
  getState
) => {
  const {
    userInfo: { userInfo },
  } = getState();

  try {
    dispatch({ type: UPDATE_USERDETAILS_REQUEST });
    const { data } = await Axios.post(
      `${API}/account/user-profile/`,
      updateProfile,
      {
        headers: { Authorization: "JWT " + userInfo.token },
      }
    );

    dispatch({
      type: UPDATE_USERDETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: UPDATE_USERDETAILS_FAIL, payload: error.message });
  }
};

const getShippingDetails = () => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: GET_SHIPPING_REQUEST });
    const { data } = await Axios.get(`${API}/account/shipping/`, {
      headers: { Authorization: "JWT " + userInfo.token },
    });
    dispatch({
      type: GET_SHIPPING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_SHIPPING_FAIL, payload: error.message });
  }
};

const updateShippingDetails = (updateShip) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: UPDATE_SHIPPING_REQUEST });
    const { data } = await Axios.post(`${API}/account/shipping/`, updateShip, {
      headers: { Authorization: "JWT " + userInfo.token },
    });
    dispatch({
      type: UPDATE_SHIPPING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SHIPPING_FAIL,
      payload: error.message,
    });
  }
};

const addNewsletterSubscription = (email) => async (dispatch) => {
  try {
    dispatch({ type: ADD_NEWSLETTER_SUBSCRIPTION_REQUEST });
    const { data } = await Axios.post(`${API}/newsletter/subscribe/`, email);
    dispatch({
      type: ADD_NEWSLETTER_SUBSCRIPTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_NEWSLETTER_SUBSCRIPTION_FAIL,
      payload: error,
    });
  }
};

const getRoles = () => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: GET_ROLE_REQUEST });
    const { data } = await Axios.get(`${API}/account/roles/`, {
      headers: { Authorization: "JWT " + userInfo.token },
    });
    dispatch({
      type: GET_ROLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ROLE_FAIL,
      payload: error,
    });
  }
};

const addRole = (roleData) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: ADD_ROLE_REQUEST });
    const data = await Axios.post(`${API}/account/roles/`, roleData, {
      headers: { Authorization: "JWT " + userInfo.token },
    });
    dispatch({
      type: ADD_ROLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ROLE_FAIL,
      payload: error,
    });
  }
};

const updateRole = (roleData, slug) => async (dispatch, getState) => {
  console.log("llsadasd");
  console.log(roleData);
  console.log(slug);
  console.log("llsadasd");

  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: UPDATE_ROLE_REQUEST });
    const data = await Axios.put(`${API}/account/roles/${slug}/`, roleData, {
      headers: { Authorization: "JWT " + userInfo.token },
    });

    dispatch({
      type: UPDATE_ROLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ROLE_FAIL,
      payload: error,
    });
  }
};

// USER BILLING DETAILS ACTIONS

const getBillingDetailsAction = () => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: GET_BILLING_REQUEST });
    const { data } = await Axios.get(`${API}/account/billing/`, {
      headers: { Authorization: "JWT " + userInfo.token },
    });
    dispatch({
      type: GET_BILLING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_BILLING_FAIL, payload: error.message });
  }
};

const updateBillingDetailsAction = (updateBillingData) => async (
  dispatch,
  getState
) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: UPDATE_BILLING_REQUEST });
    const { data } = await Axios.post(
      `${API}/account/billing/`,
      updateBillingData,
      {
        headers: { Authorization: "JWT " + userInfo.token },
      }
    );
    dispatch({
      type: UPDATE_BILLING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BILLING_FAIL,
      payload: error.message,
    });
  }
};

export {
  signIn,
  signOut,
  socialSignIn,
  getUserProfileDetails,
  updateUserProfileDetails,
  getShippingDetails,
  addNewsletterSubscription,
  updateShippingDetails,
  getRoles,
  addRole,
  updateRole,
  getBillingDetailsAction,
  updateBillingDetailsAction,
};
