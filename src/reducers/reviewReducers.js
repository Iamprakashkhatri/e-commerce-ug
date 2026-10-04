import {
  POST_REVIEW_FAIL,
  POST_REVIEW_REQUEST,
  POST_REVIEW_SUCCESS,
} from "../constants/reviewConstants";

const statePostReview = { postReview: {} };

function postReviewReducer(state = statePostReview, action) {
  switch (action.type) {
    case POST_REVIEW_REQUEST:
      return { ...state, loading: true };
    case POST_REVIEW_SUCCESS:
      return { ...state, loading: false, postReview: action.payload };
    case POST_REVIEW_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export { postReviewReducer };
