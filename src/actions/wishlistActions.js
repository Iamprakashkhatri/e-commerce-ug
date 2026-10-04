import axios from "axios";
import { API } from "../config.js";
import {
  ADD_WISH_LIST_FAIL,
  ADD_WISH_LIST_REQUEST,
  ADD_WISH_LIST_SUCCESS,
  DELETE_WISH_LIST_FAIL,
  DELETE_WISH_LIST_ITEM_FAIL,
  DELETE_WISH_LIST_ITEM_REQUEST,
  DELETE_WISH_LIST_ITEM_SUCCESS,
  DELETE_WISH_LIST_REQUEST,
  DELETE_WISH_LIST_SUCCESS,
  GET_WISH_LIST_FAIL,
  GET_WISH_LIST_REQUEST,
  GET_WISH_LIST_SUCCESS,
} from "../constants/wishlistConstants.js";

const getUserWishList = () => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();

  try {
    dispatch({ type: GET_WISH_LIST_REQUEST });
    const { data } = await axios.get(`${API}/product/my-wishlist/`, {
      headers: { Authorization: "JWT " + userInfo.token },
    });

    dispatch({
      type: GET_WISH_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_WISH_LIST_FAIL, payload: error.message });
  }
};

const addItemToWishList = (formData) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();

  try {
    dispatch({ type: ADD_WISH_LIST_REQUEST });
    const { data } = await axios.post(`${API}/product/my-wishlist/`, formData, {
      headers: { Authorization: "JWT " + userInfo.token },
    });

    dispatch({
      type: ADD_WISH_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: ADD_WISH_LIST_FAIL, payload: error.message });
  }
};

const deleteUserWishListItem = (deleteItem) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();

  try {
    dispatch({ type: DELETE_WISH_LIST_ITEM_REQUEST });
    const { data } = await axios.post(
      `${API}/product/clear-wishlist-item/`,
      deleteItem,
      {
        headers: { Authorization: "JWT " + userInfo.token },
      }
    );

    dispatch({
      type: DELETE_WISH_LIST_ITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: DELETE_WISH_LIST_ITEM_FAIL, payload: error.message });
  }
};

const deleteUserWishList = (clearWishlistData) => async (
  dispatch,
  getState
) => {
  const {
    userInfo: { userInfo },
  } = getState();

  try {
    dispatch({ type: DELETE_WISH_LIST_REQUEST });
    const { data } = await axios.post(
      `${API}/product/clear-wishlist/`,
      clearWishlistData,
      {
        headers: { Authorization: "JWT " + userInfo.token },
      }
    );

    dispatch({
      type: DELETE_WISH_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: DELETE_WISH_LIST_FAIL, payload: error.message });
  }
};

export {
  getUserWishList,
  addItemToWishList,
  deleteUserWishListItem,
  deleteUserWishList,
};
