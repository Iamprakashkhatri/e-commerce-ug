import {
  GET_CATEGORY_LIST_FAIL,
  GET_CATEGORY_LIST_REQUEST,
  GET_CATEGORY_LIST_SUCCESS,
  GET_PRODUCTS_LIST_REQUEST,
  GET_PRODUCTS_LIST_SUCCESS,
  GET_PRODUCTS_LIST_FAIL,
  GET_SUBCATEGORY_LIST_REQUEST,
  GET_SUBCATEGORY_LIST_SUCCESS,
  GET_SUBCATEGORY_LIST_FAIL,
  GET_LABELS_LIST_REQUEST,
  GET_LABELS_LIST_SUCCESS,
  GET_LABELS_LIST_FAIL,
  GET_FEATURED_PRODUCT_REQUEST,
  GET_FEATURED_PRODUCT_SUCCESS,
  GET_FEATURED_PRODUCT_FAIL,
  GET_RELATED_PRODUCTS_REQUEST,
  GET_RELATED_PRODUCTS_SUCCESS,
  GET_RELATED_PRODUCTS_FAIL,
  GET_DEALS_FAIL,
  GET_DEALS_REQUEST,
  GET_DEALS_SUCCESS,
  GET_TOP_SIX_CATEGORIES_SUCCESS,
  GET_TOP_SIX_CATEGORIES_REQUEST,
  GET_TOP_SIX_CATEGORIES_FAIL,
  GET_SHOP_PRODUCTS_SUCCESS,
  GET_SHOP_PRODUCTS_FAIL,
  GET_SHOP_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  GET_MORE_PRODUCTS_REQUEST,
  GET_MORE_PRODUCTS_SUCCESS,
  GET_MORE_PRODUCTS_FAIL,
} from "../constants/productConstants";

import axios from "axios";
import { API } from "../config";

const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
    const { data } = await axios.get(`${API}/product/products/`);
    dispatch({
      type: GET_ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_ALL_PRODUCTS_FAIL, payload: error.message });
  }
};

const getProducts = (search, searchFilter) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_LIST_REQUEST });
    const { data } = await axios.get(
      `${API}/product/products/?active=true&${
        search ? `search=${search}&` : ``
      }${
        searchFilter && searchFilter.categoryField
          ? `sub_category__category=${searchFilter.categoryField}&`
          : ``
      }${
        searchFilter && searchFilter.subCategoryField
          ? `sub_category=${searchFilter.subCategoryField}&`
          : ``
      }`
    );
    dispatch({
      type: GET_PRODUCTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_PRODUCTS_LIST_FAIL, payload: error.message });
  }
};

const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_LIST_REQUEST });
    const { data } = await axios.get(`${API}/product/categories/`);
    dispatch({
      type: GET_CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

const getSubCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SUBCATEGORY_LIST_REQUEST });
    const { data } = await axios.get(`${API}/product/sub-categories/`);
    dispatch({
      type: GET_SUBCATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_SUBCATEGORY_LIST_FAIL, payload: error.message });
  }
};

const getLabels = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LABELS_LIST_REQUEST });
    const { data } = await axios.get(`${API}/product/labels/`);
    dispatch({
      type: GET_LABELS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_LABELS_LIST_FAIL, payload: error.message });
  }
};

const getFeaturedProduct = () => async (dispatch) => {
  try {
    dispatch({ type: GET_FEATURED_PRODUCT_REQUEST });
    const { data } = await axios.get(`${API}/product/featured-product/`);
    dispatch({
      type: GET_FEATURED_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_FEATURED_PRODUCT_FAIL, payload: error.message });
  }
};

const getRelatedProducts = (cat_id) => async (dispatch) => {
  try {
    dispatch({ type: GET_RELATED_PRODUCTS_REQUEST });
    const { data } = await axios.get(
      `${API}/product/products/?sub_category__category=${cat_id}&active=true`
    );
    dispatch({
      type: GET_RELATED_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_RELATED_PRODUCTS_FAIL, payload: error.message });
  }
};

const getDeals = (sort, page) => async (dispatch) => {
  console.log(page);
  try {
    dispatch({ type: GET_DEALS_REQUEST });
    const { data } = await axios.get(
      `${API}/product/products/?ordering=-discount&page=${page}&size=12&active=true`
    );
    dispatch({
      type: GET_DEALS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_DEALS_FAIL, payload: error.message });
  }
};

const getMoreProducts = (sort, page, slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_MORE_PRODUCTS_REQUEST });
    const { data } = await axios.get(
      `${API}/product/products/?sub_category__category__slug=${slug}&page=${page}&size=10&active=true`
    );
    dispatch({
      type: GET_MORE_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MORE_PRODUCTS_FAIL,
      payload: error.message,
    });
  }
};

const getTopSixCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TOP_SIX_CATEGORIES_REQUEST });
    const { data } = await axios.get(`${API}/product/top-six-category/`);
    dispatch({
      type: GET_TOP_SIX_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_TOP_SIX_CATEGORIES_FAIL, payload: error.message });
  }
};

const getShopFilteredProductsAction = (filter, page) => async (dispatch) => {
  try {
    dispatch({ type: GET_SHOP_PRODUCTS_REQUEST });
    const { data } = await axios.get(
      `${API}/product/products/?active=true&page=${page}&size=9&${
        filter.sale_price_min ? `sale_price_min=${filter.sale_price_min}&` : ``
      }${
        filter.category_slug
          ? `sub_category__category__slug=${filter.category_slug}&`
          : ``
      }${
        filter.subCategory_slug
          ? `sub_category__slug=${filter.subCategory_slug}&`
          : ``
      }${
        filter.sale_price_max ? `sale_price_max=${filter.sale_price_max}&` : ``
      }${filter.rating ? `rating=${filter.rating}&` : ``}`
    );
    dispatch({
      type: GET_SHOP_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: GET_SHOP_PRODUCTS_FAIL, payload: error.message });
  }
};

export {
  getProducts,
  getCategories,
  getSubCategories,
  getLabels,
  getFeaturedProduct,
  getRelatedProducts,
  getDeals,
  getMoreProducts,
  getTopSixCategories,
  getShopFilteredProductsAction,
  getAllProducts,
};
