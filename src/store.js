import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import {
  userSigninReducer,
  userVerifiedReducer,
  getShippingDetailsReducer,
  updateUserDetailsReducer,
  getRoleReducer,
  addRoleReducer,
  updateRoleReducer,
  getBillingDetailsReducer,
  updateBillingDetailsReducer,
  updateShippingDetailsReducer,
} from "./reducers/userReducers.js";

import {
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
} from "./reducers/productReducers";

import { faqReducer, contactReducer } from "./reducers/contactReducers";
import {
  addCategoryReducer,
  addProductReducer,
  addSubCategoryReducer,
  addLabelReducer,
  addFAQReducer,
  addSliderReducer,
  deleteCategoryReducer,
  deleteProductReducer,
  deleteSubCategoryReducer,
  deleteLabelReducer,
  deleteFAQReducer,
  deleteSliderReducer,
  updateCategoryReducer,
  updateProductReducer,
  updateSubCategoryReducer,
  updateLabelReducer,
  updateFAQReducer,
  updateSliderReducer,
  addNewsletterReducer,
  updateNewsletterReducer,
  deleteNewsletterReducer,
  getNewsletterReducer,
  getNewsletterDataReducer,
  sendSubscriptionMailReducer,
  setFeaturedProductReducer,
  getUsersReducer,
  getUserDataReducer,
  getDashboardCalculateTotalReducer,
  getDashboardTotalReducer,
  getDashboardTodayOrderReducer,
} from "./reducers/adminReducers.js";

import {
  checkoutReducer,
  myOrderListReducer,
  orderCompleteReducer,
  orderDetailsReducer,
  orderListReducer,
  userOrderDetailsReducer,
} from "./reducers/orderReducers";

import { sliderImagesReducer } from "./reducers/sliderReducers";
import {
  addWishlistItemReducer,
  deleteWishlistItemReducer,
  deleteWishlistReducer,
  wishlistReducer,
} from "./reducers/wishlistReducers.js";
import { postReviewReducer } from "./reducers/reviewReducers.js";
import { addNewsletterSubscriptionReducer } from "./reducers/userReducers.js";
import { getSiteSettingsReducer } from "./reducers/siteSettingsReducers.js";
import { getNotificationListReducer } from "./reducers/notificationReducers.js";

const userInfoData =
  JSON.parse(sessionStorage.getItem("userInfo")) ||
  JSON.parse(localStorage.getItem("userInfo")) ||
  null;

const userVerification =
  localStorage.getItem("verified") ||
  sessionStorage.getItem("verified") ||
  null;

const cartItemsData = JSON.parse(localStorage.getItem("cartItems"));

const initialState = {
  userInfo: {
    userInfo: userInfoData,
  },
  cartItems: {
    cartItems: cartItemsData,
  },
  userVerified: userVerification,
};

const rootReducer = combineReducers({
  userInfo: userSigninReducer,
  cartItems: cartItemsReducer,
  userVerified: userVerifiedReducer,
  updateUser: updateUserDetailsReducer,
  shippingDetails: getShippingDetailsReducer,
  updateShipping: updateShippingDetailsReducer,
  product: productReducer,
  category: productCategoryReducer,
  subCategory: productSubCategoryReducer,
  labels: productLabelsReducer,
  faq: faqReducer,
  contact: contactReducer,
  addProduct: addProductReducer,
  updateProduct: updateProductReducer,
  deleteProduct: deleteProductReducer,
  addCategory: addCategoryReducer,
  updateCategory: updateCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  addSubCategory: addSubCategoryReducer,
  updateSubCategory: updateSubCategoryReducer,
  deleteSubCategory: deleteSubCategoryReducer,
  addLabel: addLabelReducer,
  updateLabel: updateLabelReducer,
  deleteLabel: deleteLabelReducer,
  addFAQ: addFAQReducer,
  updateFAQ: updateFAQReducer,
  deleteFAQ: deleteFAQReducer,
  addSlider: addSliderReducer,
  updateSlider: updateSliderReducer,
  deleteSlider: deleteSliderReducer,
  orderList: orderListReducer,
  myOrderList: myOrderListReducer,
  orderDetails: orderDetailsReducer,
  orderCreate: orderCompleteReducer,
  sliderImages: sliderImagesReducer,
  productFeatured: productFeaturedReducer,
  wishlist: wishlistReducer,
  addWishlistItem: addWishlistItemReducer,
  deleteWishlistItem: deleteWishlistItemReducer,
  deleteWishlist: deleteWishlistReducer,
  postReview: postReviewReducer,
  relatedProducts: productRelatedReducer,
  addNewsletterSubscription: addNewsletterSubscriptionReducer,
  newsletter: getNewsletterReducer,
  newsletterData: getNewsletterDataReducer,
  addNewsletter: addNewsletterReducer,
  updateNewsletter: updateNewsletterReducer,
  deleteNewsletter: deleteNewsletterReducer,
  sendSubscriptionMail: sendSubscriptionMailReducer,
  setFeaturedProduct: setFeaturedProductReducer,
  roles: getRoleReducer,
  addRole: addRoleReducer,
  updateRole: updateRoleReducer,
  users: getUsersReducer,
  userData: getUserDataReducer,
  deals: getDealsReducer,
  moreProducts: getMoreProductsReducer,
  topSixCategories: topSixCategoriesReducer,
  shopProducts: shopProductsReducer,
  checkout: checkoutReducer,
  siteSettings: getSiteSettingsReducer,
  allProducts: allProductsReducer,
  billingDetails: getBillingDetailsReducer,
  updateBilling: updateBillingDetailsReducer,
  userOrderDetails: userOrderDetailsReducer,
  notificationList: getNotificationListReducer,
  dashboardCalculateTotal: getDashboardCalculateTotalReducer,
  dashboardTotalRevenue: getDashboardTotalReducer,
  dashboardTodayOrder: getDashboardTodayOrderReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
