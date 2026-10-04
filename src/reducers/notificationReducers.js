import {
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
} from "../constants/notificationConstants";

const stateNotificationList = { notificationList: [] };

function getNotificationListReducer(state = stateNotificationList, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS_REQUEST:
      return { ...state, loading: true };
    case GET_NOTIFICATIONS_SUCCESS:
      return { ...state, loading: false, notificationList: action.payload };
    case GET_NOTIFICATIONS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export { getNotificationListReducer };
