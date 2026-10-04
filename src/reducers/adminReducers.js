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
  UPDATE_ADMIN_CATEGORY_REQUEST,
  ADD_ADMIN_CATEGORY_REQUEST,
  ADD_ADMIN_CATEGORY_SUCCESS,
  ADD_ADMIN_CATEGORY_FAIL,
  UPDATE_ADMIN_CATEGORY_SUCCESS,
  UPDATE_ADMIN_CATEGORY_FAIL,
  DELETE_ADMIN_CATEGORY_REQUEST,
  DELETE_ADMIN_CATEGORY_SUCCESS,
  DELETE_ADMIN_CATEGORY_FAIL,
  UPDATE_ADMIN_SUBCATEGORY_REQUEST,
  ADD_ADMIN_SUBCATEGORY_REQUEST,
  ADD_ADMIN_SUBCATEGORY_SUCCESS,
  ADD_ADMIN_SUBCATEGORY_FAIL,
  UPDATE_ADMIN_SUBCATEGORY_SUCCESS,
  UPDATE_ADMIN_SUBCATEGORY_FAIL,
  DELETE_ADMIN_SUBCATEGORY_REQUEST,
  DELETE_ADMIN_SUBCATEGORY_SUCCESS,
  DELETE_ADMIN_SUBCATEGORY_FAIL,
  UPDATE_ADMIN_LABEL_REQUEST,
  ADD_ADMIN_LABEL_REQUEST,
  ADD_ADMIN_LABEL_SUCCESS,
  ADD_ADMIN_LABEL_FAIL,
  UPDATE_ADMIN_LABEL_SUCCESS,
  UPDATE_ADMIN_LABEL_FAIL,
  DELETE_ADMIN_LABEL_REQUEST,
  DELETE_ADMIN_LABEL_SUCCESS,
  DELETE_ADMIN_LABEL_FAIL,
  UPDATE_ADMIN_FAQ_REQUEST,
  ADD_ADMIN_FAQ_REQUEST,
  ADD_ADMIN_FAQ_SUCCESS,
  ADD_ADMIN_FAQ_FAIL,
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
  GET_NEWSLETTER_LIST_REQUEST,
  GET_NEWSLETTER_LIST_SUCCESS,
  GET_NEWSLETTER_LIST_FAIL,
  UPDATE_NEWSLETTER_REQUEST,
  UPDATE_NEWSLETTER_SUCCESS,
  UPDATE_NEWSLETTER_FAIL,
  DELETE_NEWSLETTER_REQUEST,
  DELETE_NEWSLETTER_SUCCESS,
  DELETE_NEWSLETTER_FAIL,
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
} from "../constants/adminConstants";

const stateAddProduct = { addProduct: {} };
const stateUpdateProduct = { updateProduct: {} };
const stateDeleteProduct = { deleteProduct: {} };

const stateAddCategory = { addCategory: {} };
const stateUpdateCategory = { updateCategory: {} };
const stateDeleteCategory = { deleteCategory: {} };

const stateAddSubCategory = { addSubCategory: {} };
const stateUpdateSubCategory = { updateSubCategory: {} };
const stateDeleteSubCategory = { deleteSubCategory: {} };

const stateAddLabel = { addLabel: {} };
const stateUpdateLabel = { updateLabel: {} };
const stateDeleteLabel = { deleteLabel: {} };

const stateAddFAQ = { addFAQ: {} };
const stateUpdateFAQ = { updateFAQ: {} };
const stateDeleteFAQ = { deleteFAQ: {} };

const stateAddSlider = { addSlider: {} };
const stateUpdateSlider = { updateSlider: {} };
const stateDeleteSlider = { deleteSlider: {} };

const stateNewsletterList = { newsletters: [] };
const stateNewsletterData = {
  newsletterData: { id: "", title: "", email_subject: "", content: "" },
};
const stateAddNewsletter = { addNewsletter: {} };
const stateUpdateNewsletter = { updateNewsletter: {} };
const stateDeleteNewsletter = { deleteNewsletter: {} };
const stateSendSubscriptionMail = { sendSubscriptionMail: {} };

const stateFeaturedProduct = { setFeaturedProduct: {} };

const stateUserList = { users: [] };
const stateUserData = { userData: {} };

const stateDashboardData = { calculateTotalData: {} };

const stateTotalRevenueData = { totalRevenueData: [] };

const stateTodayOrderData = { todayOrderData: [] };

// PRODUCT REDUCERS
function addProductReducer(state = stateAddProduct, action) {
  switch (action.type) {
    case ADD_ADMIN_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case ADD_ADMIN_PRODUCT_SUCCESS:
      return { ...state, loading: false, addProduct: action.payload };
    case ADD_ADMIN_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function updateProductReducer(state = stateUpdateProduct, action) {
  switch (action.type) {
    case UPDATE_ADMIN_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ADMIN_PRODUCT_SUCCESS:
      return { ...state, loading: false, updateProduct: action.payload };
    case UPDATE_ADMIN_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function deleteProductReducer(state = stateDeleteProduct, action) {
  switch (action.type) {
    case DELETE_ADMIN_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case DELETE_ADMIN_PRODUCT_SUCCESS:
      return { ...state, loading: false, deleteProduct: action.payload };
    case DELETE_ADMIN_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// CATEGORY REDUCERS
function addCategoryReducer(state = stateAddCategory, action) {
  switch (action.type) {
    case ADD_ADMIN_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case ADD_ADMIN_CATEGORY_SUCCESS:
      return { ...state, loading: false, addCategory: action.payload };
    case ADD_ADMIN_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function updateCategoryReducer(state = stateUpdateCategory, action) {
  switch (action.type) {
    case UPDATE_ADMIN_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ADMIN_CATEGORY_SUCCESS:
      return { ...state, loading: false, updateCategory: action.payload };
    case UPDATE_ADMIN_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function deleteCategoryReducer(state = stateDeleteCategory, action) {
  switch (action.type) {
    case DELETE_ADMIN_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case DELETE_ADMIN_CATEGORY_SUCCESS:
      return { ...state, loading: false, deleteCategory: action.payload };
    case DELETE_ADMIN_CATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

//SUB CATEGORY REDUCERS
function addSubCategoryReducer(state = stateAddSubCategory, action) {
  switch (action.type) {
    case ADD_ADMIN_SUBCATEGORY_REQUEST:
      return { ...state, loading: true };
    case ADD_ADMIN_SUBCATEGORY_SUCCESS:
      return { ...state, loading: false, addSubCategory: action.payload };
    case ADD_ADMIN_SUBCATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function updateSubCategoryReducer(state = stateUpdateSubCategory, action) {
  switch (action.type) {
    case UPDATE_ADMIN_SUBCATEGORY_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ADMIN_SUBCATEGORY_SUCCESS:
      return { ...state, loading: false, updateSubCategory: action.payload };
    case UPDATE_ADMIN_SUBCATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function deleteSubCategoryReducer(state = stateDeleteSubCategory, action) {
  switch (action.type) {
    case DELETE_ADMIN_SUBCATEGORY_REQUEST:
      return { ...state, loading: true };
    case DELETE_ADMIN_SUBCATEGORY_SUCCESS:
      return { ...state, loading: false, deleteSubCategory: action.payload };
    case DELETE_ADMIN_SUBCATEGORY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

//LABEL REDUCERS
function addLabelReducer(state = stateAddLabel, action) {
  switch (action.type) {
    case ADD_ADMIN_LABEL_REQUEST:
      return { ...state, loading: true };
    case ADD_ADMIN_LABEL_SUCCESS:
      return { ...state, loading: false, addLabel: action.payload };
    case ADD_ADMIN_LABEL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function updateLabelReducer(state = stateUpdateLabel, action) {
  switch (action.type) {
    case UPDATE_ADMIN_LABEL_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ADMIN_LABEL_SUCCESS:
      return { ...state, loading: false, updateLabel: action.payload };
    case UPDATE_ADMIN_LABEL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function deleteLabelReducer(state = stateDeleteLabel, action) {
  switch (action.type) {
    case DELETE_ADMIN_LABEL_REQUEST:
      return { ...state, loading: true };
    case DELETE_ADMIN_LABEL_SUCCESS:
      return { ...state, loading: false, deleteLabel: action.payload };
    case DELETE_ADMIN_LABEL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

//FAQ REDUCERS
function addFAQReducer(state = stateAddFAQ, action) {
  switch (action.type) {
    case ADD_ADMIN_FAQ_REQUEST:
      return { ...state, loading: true };
    case ADD_ADMIN_FAQ_SUCCESS:
      return { ...state, loading: false, addFAQ: action.payload };
    case ADD_ADMIN_FAQ_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function updateFAQReducer(state = stateUpdateFAQ, action) {
  switch (action.type) {
    case UPDATE_ADMIN_FAQ_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ADMIN_FAQ_SUCCESS:
      return { ...state, loading: false, updateFAQ: action.payload };
    case UPDATE_ADMIN_FAQ_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function deleteFAQReducer(state = stateDeleteFAQ, action) {
  switch (action.type) {
    case DELETE_ADMIN_FAQ_REQUEST:
      return { ...state, loading: true };
    case DELETE_ADMIN_FAQ_SUCCESS:
      return { ...state, loading: false, deleteFAQ: action.payload };
    case DELETE_ADMIN_FAQ_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

//SLIDER IMAGES REDUCERS
function addSliderReducer(state = stateAddSlider, action) {
  switch (action.type) {
    case ADD_ADMIN_SLIDER_REQUEST:
      return { ...state, loading: true };
    case ADD_ADMIN_SLIDER_SUCCESS:
      return { ...state, loading: false, addSlider: action.payload };
    case ADD_ADMIN_SLIDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function updateSliderReducer(state = stateUpdateSlider, action) {
  switch (action.type) {
    case UPDATE_ADMIN_SLIDER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ADMIN_SLIDER_SUCCESS:
      return { ...state, loading: false, updateSlider: action.payload };
    case UPDATE_ADMIN_SLIDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function deleteSliderReducer(state = stateDeleteSlider, action) {
  switch (action.type) {
    case DELETE_ADMIN_SLIDER_REQUEST:
      return { ...state, loading: true };
    case DELETE_ADMIN_SLIDER_SUCCESS:
      return { ...state, loading: false, deleteSlider: action.payload };
    case DELETE_ADMIN_SLIDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

//NEWSLETTER REDUCERS
function getNewsletterReducer(state = stateNewsletterList, action) {
  switch (action.type) {
    case GET_NEWSLETTER_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_NEWSLETTER_LIST_SUCCESS:
      return { ...state, loading: false, newsletters: action.payload };
    case GET_NEWSLETTER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function getNewsletterDataReducer(state = stateNewsletterData, action) {
  switch (action.type) {
    case GET_NEWSLETTER_DATA_REQUEST:
      return { ...state, loading: true };
    case GET_NEWSLETTER_DATA_SUCCESS:
      return { ...state, loading: false, newsletterData: action.payload };
    case GET_NEWSLETTER_DATA_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function addNewsletterReducer(state = stateAddNewsletter, action) {
  switch (action.type) {
    case ADD_NEWSLETTER_REQUEST:
      return { ...state, loading: true };
    case ADD_NEWSLETTER_SUCCESS:
      return { ...state, loading: false, addNewsletter: action.payload };
    case ADD_NEWSLETTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function updateNewsletterReducer(state = stateUpdateNewsletter, action) {
  switch (action.type) {
    case UPDATE_NEWSLETTER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_NEWSLETTER_SUCCESS:
      return { ...state, loading: false, updateNewsletter: action.payload };
    case UPDATE_NEWSLETTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function deleteNewsletterReducer(state = stateDeleteNewsletter, action) {
  switch (action.type) {
    case DELETE_NEWSLETTER_REQUEST:
      return { ...state, loading: true };
    case DELETE_NEWSLETTER_SUCCESS:
      return { ...state, loading: false, deleteNewsletter: action.payload };
    case DELETE_NEWSLETTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function sendSubscriptionMailReducer(
  state = stateSendSubscriptionMail,
  action
) {
  switch (action.type) {
    case SEND_SUBSCRIPTION_MAIL_REQUEST:
      return { ...state, loading: true };
    case SEND_SUBSCRIPTION_MAIL_SUCCESS:
      return { ...state, loading: false, sendSubscriptionMail: action.payload };
    case SEND_SUBSCRIPTION_MAIL_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

//FEATURED PRODUCT REDUCERS
function setFeaturedProductReducer(state = stateFeaturedProduct, action) {
  switch (action.type) {
    case SET_FEATURED_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case SET_FEATURED_PRODUCT_SUCCESS:
      return { ...state, loading: false, setFeaturedProduct: action.payload };
    case SET_FEATURED_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

//ADMIN PANEL USER REDUCERS
function getUsersReducer(state = stateUserList, action) {
  switch (action.type) {
    case GET_USER_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_USER_LIST_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case GET_USER_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function getUserDataReducer(state = stateUserData, action) {
  switch (action.type) {
    case GET_USER_DATA_REQUEST:
      return { ...state, loading: true };
    case GET_USER_DATA_SUCCESS:
      return { ...state, loading: false, userData: action.payload };
    case GET_USER_DATA_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

//ADMIN DASHBOARD TOTAL_COUNTS REDUCERS
function getDashboardCalculateTotalReducer(state = stateDashboardData, action) {
  switch (action.type) {
    case GET_DASHBOARD_COUNT_REQUEST:
      return { ...state, loading: true, error: action.payload };
    case GET_DASHBOARD_COUNT_SUCCESS:
      return { ...state, loading: false, calculateTotalData: action.payload };
    case GET_DASHBOARD_COUNT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
//ADMIN DASHBOARD TOTAL REVENUE CHARTS
function getDashboardTotalReducer(state = stateTotalRevenueData, action) {
  switch (action.type) {
    case GET_TOTAL_REVENUE_REQUEST:
      return { ...state, loading: true, error: action.payload };
    case GET_TOTAL_REVENUE_SUCCESS:
      return { ...state, loading: false, totalRevenueData: action.payload };
    case GET_TOTAL_REVENUE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
//ADMIN DASHBOARD TODAY ORDERS
function getDashboardTodayOrderReducer(state = stateTodayOrderData, action) {
  switch (action.type) {
    case GET_TODAY_ORDER_REQUEST:
      return { ...state, loading: true, error: action.payload };
    case GET_TODAY_ORDER_SUCCESS:
      return { ...state, loading: false, todayOrderData: action.payload };
    case GET_TODAY_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  addProductReducer,
  updateProductReducer,
  deleteProductReducer,
  addCategoryReducer,
  updateCategoryReducer,
  deleteCategoryReducer,
  addSubCategoryReducer,
  updateSubCategoryReducer,
  deleteSubCategoryReducer,
  addLabelReducer,
  updateLabelReducer,
  deleteLabelReducer,
  addFAQReducer,
  updateFAQReducer,
  deleteFAQReducer,
  addSliderReducer,
  updateSliderReducer,
  deleteSliderReducer,
  getNewsletterReducer,
  getNewsletterDataReducer,
  addNewsletterReducer,
  updateNewsletterReducer,
  deleteNewsletterReducer,
  sendSubscriptionMailReducer,
  setFeaturedProductReducer,
  getUsersReducer,
  getUserDataReducer,
  getDashboardCalculateTotalReducer,
  getDashboardTotalReducer,
  getDashboardTodayOrderReducer,
};
