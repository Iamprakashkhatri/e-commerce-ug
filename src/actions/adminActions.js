import {
  ADD_ADMIN_PRODUCT_REQUEST,
  ADD_ADMIN_PRODUCT_SUCCESS,
  ADD_ADMIN_PRODUCT_FAIL,
  DELETE_ADMIN_PRODUCT_REQUEST,
  DELETE_ADMIN_PRODUCT_SUCCESS,
  DELETE_ADMIN_PRODUCT_FAIL,
  UPDATE_ADMIN_PRODUCT_REQUEST,
  UPDATE_ADMIN_PRODUCT_SUCCESS,
  UPDATE_ADMIN_PRODUCT_FAIL,
  ADD_ADMIN_CATEGORY_REQUEST,
  ADD_ADMIN_CATEGORY_SUCCESS,
  ADD_ADMIN_CATEGORY_FAIL,
  UPDATE_ADMIN_CATEGORY_REQUEST,
  UPDATE_ADMIN_CATEGORY_SUCCESS,
  UPDATE_ADMIN_CATEGORY_FAIL,
  DELETE_ADMIN_CATEGORY_REQUEST,
  DELETE_ADMIN_CATEGORY_SUCCESS,
  DELETE_ADMIN_CATEGORY_FAIL,
  ADD_ADMIN_SUBCATEGORY_REQUEST,
  ADD_ADMIN_SUBCATEGORY_SUCCESS,
  ADD_ADMIN_SUBCATEGORY_FAIL,
  UPDATE_ADMIN_SUBCATEGORY_REQUEST,
  UPDATE_ADMIN_SUBCATEGORY_SUCCESS,
  UPDATE_ADMIN_SUBCATEGORY_FAIL,
  DELETE_ADMIN_SUBCATEGORY_REQUEST,
  DELETE_ADMIN_SUBCATEGORY_SUCCESS,
  DELETE_ADMIN_SUBCATEGORY_FAIL,
  ADD_ADMIN_LABEL_REQUEST,
  ADD_ADMIN_LABEL_SUCCESS,
  ADD_ADMIN_LABEL_FAIL,
  UPDATE_ADMIN_LABEL_REQUEST,
  UPDATE_ADMIN_LABEL_SUCCESS,
  UPDATE_ADMIN_LABEL_FAIL,
  DELETE_ADMIN_LABEL_REQUEST,
  DELETE_ADMIN_LABEL_SUCCESS,
  DELETE_ADMIN_LABEL_FAIL,
  ADD_ADMIN_FAQ_REQUEST,
  ADD_ADMIN_FAQ_SUCCESS,
  ADD_ADMIN_FAQ_FAIL,
  UPDATE_ADMIN_FAQ_REQUEST,
  UPDATE_ADMIN_FAQ_SUCCESS,
  UPDATE_ADMIN_FAQ_FAIL,
  DELETE_ADMIN_FAQ_REQUEST,
  DELETE_ADMIN_FAQ_SUCCESS,
  DELETE_ADMIN_FAQ_FAIL,
  ADD_ADMIN_SLIDER_REQUEST,
  ADD_ADMIN_SLIDER_SUCCESS,
  ADD_ADMIN_SLIDER_FAIL,
  UPDATE_ADMIN_SLIDER_REQUEST,
  UPDATE_ADMIN_SLIDER_SUCCESS,
  UPDATE_ADMIN_SLIDER_FAIL,
  DELETE_ADMIN_SLIDER_REQUEST,
  DELETE_ADMIN_SLIDER_SUCCESS,
  DELETE_ADMIN_SLIDER_FAIL,
  ADD_NEWSLETTER_REQUEST,
  ADD_NEWSLETTER_SUCCESS,
  ADD_NEWSLETTER_FAIL,
  UPDATE_NEWSLETTER_REQUEST,
  UPDATE_NEWSLETTER_SUCCESS,
  UPDATE_NEWSLETTER_FAIL,
  DELETE_NEWSLETTER_REQUEST,
  DELETE_NEWSLETTER_SUCCESS,
  DELETE_NEWSLETTER_FAIL,
  GET_NEWSLETTER_LIST_REQUEST,
  GET_NEWSLETTER_LIST_SUCCESS,
  GET_NEWSLETTER_LIST_FAIL,
  GET_NEWSLETTER_DATA_REQUEST,
  GET_NEWSLETTER_DATA_SUCCESS,
  GET_NEWSLETTER_DATA_FAIL,
  SEND_SUBSCRIPTION_MAIL_REQUEST,
  SEND_SUBSCRIPTION_MAIL_SUCCESS,
  SEND_SUBSCRIPTION_MAIL_FAIL,
  SET_FEATURED_PRODUCT_REQUEST,
  SET_FEATURED_PRODUCT_SUCCESS,
  SET_FEATURED_PRODUCT_FAIL,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAIL,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAIL,
  GET_DASHBOARD_COUNT_REQUEST,
  GET_DASHBOARD_COUNT_SUCCESS,
  GET_DASHBOARD_COUNT_FAIL,
  GET_TOTAL_REVENUE_REQUEST,
  GET_TOTAL_REVENUE_SUCCESS,
  GET_TOTAL_REVENUE_FAIL,
  GET_TODAY_ORDER_REQUEST,
  GET_TODAY_ORDER_SUCCESS,
  GET_TODAY_ORDER_FAIL,
} from '../constants/adminConstants';

import axios from 'axios';
import { API } from '../config';

// PRODUCT ACTIONS
const addProduct = (productFormData) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();

  try {
    dispatch({ type: ADD_ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.post(
      `${API}/product/products/`,
      productFormData,
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    );

    dispatch({ type: ADD_ADMIN_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_ADMIN_PRODUCT_FAIL, payload: error.message });
  }
};

const updateProduct = (id, updatedProductData) => async (
  dispatch,
  getState
) => {
  const {
    userInfo: { userInfo },
  } = getState();

  try {
    dispatch({ type: UPDATE_ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.put(
      `${API}/product/products/${id}/`,
      updatedProductData,
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    );

    dispatch({ type: UPDATE_ADMIN_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_ADMIN_PRODUCT_FAIL, payload: error.message });
  }
};

const deleteProduct = (id) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: DELETE_ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.delete(`${API}/product/products/${id}/`, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    });

    dispatch({ type: DELETE_ADMIN_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_ADMIN_PRODUCT_FAIL, payload: error.message });
  }
};

// CATEGORY ACTIONS
const addCategory = (categoryData) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: ADD_ADMIN_CATEGORY_REQUEST });

    const { data } = await axios.post(
      `${API}/product/categories/`,
      categoryData,
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    );

    dispatch({ type: ADD_ADMIN_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_ADMIN_CATEGORY_FAIL, payload: error.message });
  }
};

const updateCategoryAction = (id, updatedCategoryData) => async (
  dispatch,
  getState
) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: UPDATE_ADMIN_CATEGORY_REQUEST });

    const { data } = await axios.put(
      `${API}/product/categories/${id}/`,
      updatedCategoryData,
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    );

    dispatch({ type: UPDATE_ADMIN_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_ADMIN_CATEGORY_FAIL, payload: error.message });
  }
};

const deleteCategory = (id) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: DELETE_ADMIN_CATEGORY_REQUEST });

    const { data } = await axios.delete(`${API}/product/categories/${id}/`, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    });
    dispatch({ type: DELETE_ADMIN_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_ADMIN_CATEGORY_FAIL, payload: error.message });
  }
};

//SUB CATEGORY ACTIONS
const addSubCategory = (subCategoryData) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: ADD_ADMIN_SUBCATEGORY_REQUEST });

    const { data } = await axios.post(
      `${API}/product/sub-categories/`,
      subCategoryData,
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    );

    dispatch({ type: ADD_ADMIN_SUBCATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_ADMIN_SUBCATEGORY_FAIL, payload: error.message });
  }
};

const updateSubCategory = (id, updatedSubCategoryData) => async (
  dispatch,
  getState
) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: UPDATE_ADMIN_SUBCATEGORY_REQUEST });

    const { data } = await axios.put(
      `${API}/product/sub-categories/${id}/`,
      updatedSubCategoryData,
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    );

    dispatch({ type: UPDATE_ADMIN_SUBCATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_ADMIN_SUBCATEGORY_FAIL, payload: error.message });
  }
};

const deleteSubCategory = (id) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: DELETE_ADMIN_SUBCATEGORY_REQUEST });

    const { data } = await axios.delete(
      `${API}/product/sub-categories/${id}/`,
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    );

    dispatch({ type: DELETE_ADMIN_SUBCATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_ADMIN_SUBCATEGORY_FAIL, payload: error.message });
  }
};

//LABEL ACTIONS
const addLabel = (labelFormData) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: ADD_ADMIN_LABEL_REQUEST });

    const { data } = await axios.post(`${API}/product/labels/`, labelFormData, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    });

    dispatch({ type: ADD_ADMIN_LABEL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_ADMIN_LABEL_FAIL, payload: error.message });
  }
};

const updateLabel = (id, updatedLabelData) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: UPDATE_ADMIN_LABEL_REQUEST });

    const { data } = await axios.put(
      `${API}/product/labels/${id}/`,
      updatedLabelData,
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    );

    dispatch({ type: UPDATE_ADMIN_LABEL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_ADMIN_LABEL_FAIL, payload: error.message });
  }
};

const deleteLabel = (id) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: DELETE_ADMIN_LABEL_REQUEST });

    const { data } = await axios.delete(`${API}/product/labels/${id}/`, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    });

    dispatch({ type: DELETE_ADMIN_LABEL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_ADMIN_LABEL_FAIL, payload: error.message });
  }
};

//FAQ ACTIONS
const addFAQ = (FAQFormData) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: ADD_ADMIN_FAQ_REQUEST });

    const { data } = await axios.post(`${API}/misc/faq/`, FAQFormData, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    });

    dispatch({ type: ADD_ADMIN_FAQ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_ADMIN_FAQ_FAIL, payload: error.message });
  }
};

const updateFAQ = (id, updatedFAQData) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: UPDATE_ADMIN_FAQ_REQUEST });

    const { data } = await axios.put(`${API}/misc/faq/${id}/`, updatedFAQData, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    });

    dispatch({ type: UPDATE_ADMIN_FAQ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_ADMIN_FAQ_FAIL, payload: error.message });
  }
};

const deleteFAQ = (id) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: DELETE_ADMIN_FAQ_REQUEST });

    const { data } = await axios.delete(`${API}/misc/faq/${id}/`, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    });

    dispatch({ type: DELETE_ADMIN_FAQ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_ADMIN_FAQ_FAIL, payload: error.message });
  }
};

//SLIDER IMAGES ACTIONS
const addSlider = (SliderFormData) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: ADD_ADMIN_SLIDER_REQUEST });

    const { data } = await axios.post(
      `${API}/misc/slider-images/`,
      SliderFormData,
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    );

    dispatch({ type: ADD_ADMIN_SLIDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_ADMIN_SLIDER_FAIL, payload: error.message });
  }
};

const updateSlider = (id, updatedSliderData) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: UPDATE_ADMIN_SLIDER_REQUEST });

    const { data } = await axios.put(
      `${API}/misc/slider-images/${id}/`,
      updatedSliderData,
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    );

    dispatch({ type: UPDATE_ADMIN_SLIDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_ADMIN_SLIDER_FAIL, payload: error.message });
  }
};

const deleteSlider = (id) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: DELETE_ADMIN_SLIDER_REQUEST });

    const { data } = await axios.delete(`${API}/misc/slider-images/${id}/`, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    });
    dispatch({ type: DELETE_ADMIN_SLIDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_ADMIN_SLIDER_FAIL, payload: error.message });
  }
};

//NEWSLETTER ACTIONS
const getNewsletterList = () => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: GET_NEWSLETTER_LIST_REQUEST });

    const { data } = await axios.get(`${API}/newsletter/newsletters/`, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    });

    dispatch({ type: GET_NEWSLETTER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_NEWSLETTER_LIST_FAIL, payload: error.message });
  }
};

const getNewsletterData = (id) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: GET_NEWSLETTER_DATA_REQUEST });

    const { data } = await axios.get(`${API}/newsletter/newsletters/${id}`, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    });

    dispatch({ type: GET_NEWSLETTER_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_NEWSLETTER_DATA_FAIL, payload: error.message });
  }
};

const addNewsletter = (newsletterData) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: ADD_NEWSLETTER_REQUEST });

    const { data } = await axios.post(
      `${API}/newsletter/newsletters/`,
      newsletterData,
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    );

    dispatch({ type: ADD_NEWSLETTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_NEWSLETTER_FAIL, payload: error.message });
  }
};

const updateNewsletter = (id, updatedNewsletterData) => async (
  dispatch,
  getState
) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: UPDATE_NEWSLETTER_REQUEST });

    const { data } = await axios.put(
      `${API}/newsletter/newsletters/${id}/`,
      updatedNewsletterData,
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    );

    dispatch({ type: UPDATE_NEWSLETTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_NEWSLETTER_FAIL, payload: error.message });
  }
};

const deleteNewsletter = (id) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: DELETE_NEWSLETTER_REQUEST });

    const { data } = await axios.delete(
      `${API}/newsletter/newsletters/${id}/`,
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    );
    dispatch({ type: DELETE_NEWSLETTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_NEWSLETTER_FAIL, payload: error.message });
  }
};

const sendSubscriptionMailAction = (id) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: SEND_SUBSCRIPTION_MAIL_REQUEST });
    const { data } = await axios.post(
      `${API}/newsletter/send-subscription-mail/${id}/`,
      {},
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    );

    dispatch({ type: SEND_SUBSCRIPTION_MAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SEND_SUBSCRIPTION_MAIL_FAIL, payload: error.message });
  }
};

//FEATURED PRODUCT ACTIONS
const setFeaturedProduct = (formData) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: SET_FEATURED_PRODUCT_REQUEST });

    const { data } = await axios.post(
      `${API}/product/featured-product/`,
      formData,
      {
        headers: { Authorization: 'JWT ' + userInfo.token },
      }
    );

    dispatch({ type: SET_FEATURED_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_FEATURED_PRODUCT_FAIL, payload: error.message });
  }
};

//USER ACTIONS
const getUserList = () => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: GET_USER_LIST_REQUEST });

    const { data } = await axios.get(`${API}/account/users/`, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    });

    dispatch({ type: GET_USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_LIST_FAIL, payload: error.message });
  }
};

const getUserData = (id) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: GET_USER_DATA_REQUEST });

    const { data } = await axios.get(`${API}/account/users/${id}`, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    });

    dispatch({ type: GET_USER_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_DATA_FAIL, payload: error.message });
  }
};

// DASHBOARD ACTION
const getDashboardCalculateTotal = () => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: GET_DASHBOARD_COUNT_REQUEST });
    const { data } = await axios.get(`${API}/dashboard/calculate-total/`, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    });
    dispatch({ type: GET_DASHBOARD_COUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_DASHBOARD_COUNT_FAIL, payload: error.message });
  }
};

// dashboard total yearly revenue
const getTotalRevenue = () => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: GET_TOTAL_REVENUE_REQUEST });
    const { data } = await axios.get(`${API}/dashboard/total-revenue/`, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    });
    dispatch({ type: GET_TOTAL_REVENUE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_TOTAL_REVENUE_FAIL, payload: error.message });
  }
};

// dashboard today order
const getDashboardTodayOrder = () => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: GET_TODAY_ORDER_REQUEST });
    const { data } = await axios.get(`${API}/dashboard/today-order/`, {
      headers: { Authorization: 'JWT ' + userInfo.token },
    });
    dispatch({ type: GET_TODAY_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_TODAY_ORDER_FAIL, payload: error.message });
  }
};

export {
  addProduct,
  updateProduct,
  deleteProduct,
  addCategory,
  updateCategoryAction,
  deleteCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  addLabel,
  updateLabel,
  deleteLabel,
  addFAQ,
  updateFAQ,
  deleteFAQ,
  addSlider,
  updateSlider,
  deleteSlider,
  getNewsletterList,
  getNewsletterData,
  addNewsletter,
  updateNewsletter,
  deleteNewsletter,
  sendSubscriptionMailAction,
  setFeaturedProduct,
  getUserList,
  getUserData,
  getDashboardCalculateTotal,
  getTotalRevenue,
  getDashboardTodayOrder,
};
