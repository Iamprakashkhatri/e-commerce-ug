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
  GET_RELATED_PRODUCTS_SUCCESS,
  GET_RELATED_PRODUCTS_FAIL,
  GET_RELATED_PRODUCTS_REQUEST,
  GET_DEALS_REQUEST,
  GET_DEALS_SUCCESS,
  GET_DEALS_FAIL,
  GET_TOP_SIX_CATEGORIES_REQUEST,
  GET_TOP_SIX_CATEGORIES_SUCCESS,
  GET_TOP_SIX_CATEGORIES_FAIL,
  GET_SHOP_PRODUCTS_REQUEST,
  GET_SHOP_PRODUCTS_SUCCESS,
  GET_SHOP_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  GET_MORE_PRODUCTS_REQUEST,
  GET_MORE_PRODUCTS_SUCCESS,
  GET_MORE_PRODUCTS_FAIL,
  GET_CART_COUNT_REQUEST,
  GET_CART_COUNT_SUCCESS,
  GET_CART_COUNT_FAIL,
} from "../constants/productConstants";

const stateProducts = { products: [] };
const stateCategories = { categories: [] };
const stateSubCategories = { subCategories: [] };
const stateLabels = { labels: [] };
const stateFeatured = { featured: {} };
const stateRelatedProducts = { relatedProducts: [] };
const stateTopSixCategories = { topSixCategories: [] };
const stateShopProducts = { shopProducts: [] };
const stateAllProducts = { allProducts: [] };
const stateViewMoreProducts = { moreProducts: [] };
const stateCartItems = { cartItemsInfo: [] };

function allProductsReducer(state = stateAllProducts, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_PRODUCTS_SUCCESS:
      return { ...state, loading: false, allProducts: action.payload };
    case GET_ALL_PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function productReducer(state = stateProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_PRODUCTS_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case GET_PRODUCTS_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function productCategoryReducer(state = stateCategories, action) {
  switch (action.type) {
    case GET_CATEGORY_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_CATEGORY_LIST_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case GET_CATEGORY_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function productSubCategoryReducer(state = stateSubCategories, action) {
  switch (action.type) {
    case GET_SUBCATEGORY_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_SUBCATEGORY_LIST_SUCCESS:
      return { ...state, loading: false, subCategories: action.payload };
    case GET_SUBCATEGORY_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function productLabelsReducer(state = stateLabels, action) {
  switch (action.type) {
    case GET_LABELS_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_LABELS_LIST_SUCCESS:
      return { ...state, loading: false, labels: action.payload };
    case GET_LABELS_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function productFeaturedReducer(state = stateFeatured, action) {
  switch (action.type) {
    case GET_FEATURED_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case GET_FEATURED_PRODUCT_SUCCESS:
      return { ...state, loading: false, featured: action.payload };
    case GET_FEATURED_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function productRelatedReducer(state = stateRelatedProducts, action) {
  switch (action.type) {
    case GET_RELATED_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case GET_RELATED_PRODUCTS_SUCCESS:
      return { ...state, loading: false, relatedProducts: action.payload };
    case GET_RELATED_PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function getDealsReducer(state = { deals: [] }, action) {
  switch (action.type) {
    case GET_DEALS_REQUEST:
      return { ...state, loading: true };
    case GET_DEALS_SUCCESS:
      return { ...state, loading: false, deals: action.payload };
    case GET_DEALS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function getMoreProductsReducer(state = stateViewMoreProducts, action) {
  switch (action.type) {
    case GET_MORE_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case GET_MORE_PRODUCTS_SUCCESS:
      return { ...state, loading: false, moreProducts: action.payload };
    case GET_MORE_PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function cartItemsReducer(state = stateCartItems, action) {
  switch (action.type) {
    case GET_CART_COUNT_REQUEST:
      return { loading: true };
    case GET_CART_COUNT_SUCCESS:
      return { loading: false, cartItemsInfo: action.payload };
    case GET_CART_COUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function topSixCategoriesReducer(state = stateTopSixCategories, action) {
  switch (action.type) {
    case GET_TOP_SIX_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case GET_TOP_SIX_CATEGORIES_SUCCESS:
      return { ...state, loading: false, topSixCategories: action.payload };
    case GET_TOP_SIX_CATEGORIES_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function shopProductsReducer(state = stateShopProducts, action) {
  switch (action.type) {
    case GET_SHOP_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case GET_SHOP_PRODUCTS_SUCCESS:
      return { ...state, loading: false, shopProducts: action.payload };
    case GET_SHOP_PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  productReducer,
  productCategoryReducer,
  productSubCategoryReducer,
  productLabelsReducer,
  productFeaturedReducer,
  productRelatedReducer,
  getDealsReducer,
  getMoreProductsReducer,
  topSixCategoriesReducer,
  shopProductsReducer,
  allProductsReducer,
  cartItemsReducer,
};
