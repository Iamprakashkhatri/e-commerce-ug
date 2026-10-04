const {
  GET_WISH_LIST_REQUEST,
  GET_WISH_LIST_SUCCESS,
  GET_WISH_LIST_FAIL,
  ADD_WISH_LIST_REQUEST,
  ADD_WISH_LIST_SUCCESS,
  ADD_WISH_LIST_FAIL,
  DELETE_WISH_LIST_ITEM_REQUEST,
  DELETE_WISH_LIST_ITEM_SUCCESS,
  DELETE_WISH_LIST_ITEM_FAIL,
  DELETE_WISH_LIST_REQUEST,
  DELETE_WISH_LIST_SUCCESS,
  DELETE_WISH_LIST_FAIL,
} = require("../constants/wishlistConstants");

const stateWishlist = { wishlist: [] };
const stateAddWishlistItem = { addWishlistItem: [] };
const stateDeleteWishlistItem = { deleteWishlistItem: [] };
const stateDeleteWishlist = { deletWishlist: [] };

function wishlistReducer(state = stateWishlist, action) {
  switch (action.type) {
    case GET_WISH_LIST_REQUEST:
      return { ...state, loading: true };
    case GET_WISH_LIST_SUCCESS:
      return { ...state, loading: false, wishlist: action.payload };
    case GET_WISH_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function addWishlistItemReducer(state = stateAddWishlistItem, action) {
  switch (action.type) {
    case ADD_WISH_LIST_REQUEST:
      return { ...state, loading: true };
    case ADD_WISH_LIST_SUCCESS:
      return { ...state, loading: false, addWishlistItem: action.payload };
    case ADD_WISH_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function deleteWishlistItemReducer(state = stateDeleteWishlistItem, action) {
  switch (action.type) {
    case DELETE_WISH_LIST_ITEM_REQUEST:
      return { ...state, loading: true };
    case DELETE_WISH_LIST_ITEM_SUCCESS:
      return { ...state, loading: false, deleteWishlistItem: action.payload };
    case DELETE_WISH_LIST_ITEM_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function deleteWishlistReducer(state = stateDeleteWishlist, action) {
  switch (action.type) {
    case DELETE_WISH_LIST_REQUEST:
      return { ...state, loading: true };
    case DELETE_WISH_LIST_SUCCESS:
      return { ...state, loading: false, deleteWishlist: action.payload };
    case DELETE_WISH_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  wishlistReducer,
  addWishlistItemReducer,
  deleteWishlistItemReducer,
  deleteWishlistReducer,
};
