import axios from "axios";
import { API } from "../config";
import {
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
} from "../constants/notificationConstants";

const getNotificationListAction = () => async (dispatch, getState) => {
  const {
    userInfo: { userInfo },
  } = getState();
  try {
    dispatch({ type: GET_NOTIFICATIONS_REQUEST });

    const { data } = await axios.get(`${API}/notification/notification-list/`, {
      headers: { Authorization: "JWT " + userInfo.token },
    });

    dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_NOTIFICATIONS_FAIL, payload: error.message });
  }
};

export { getNotificationListAction };
