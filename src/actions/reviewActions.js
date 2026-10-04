import axios from "axios";
import { API } from "../config";
import {
  POST_REVIEW_FAIL,
  POST_REVIEW_REQUEST,
  POST_REVIEW_SUCCESS,
} from "../constants/reviewConstants";

const postProductReview = (formData) => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();

  try {
    dispatch({ type: POST_REVIEW_REQUEST });
    const { data } = await axios.post(`${API}/product/comments/`, formData, {
      headers: { Authorization: "JWT " + userInfo.token },
    });
    dispatch({
      type: POST_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: POST_REVIEW_FAIL, payload: error.message });
  }
};

export { postProductReview };
