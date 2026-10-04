import {
  GET_CART_COUNT_REQUEST,
  GET_CART_COUNT_SUCCESS,
  GET_CART_COUNT_FAIL,
} from "../constants/productConstants";

const getCartItemsCount = (
  id,
  name,
  finalPrice,
  image,
  quantity,
  productTotal,
  slug
) => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_COUNT_REQUEST });
    let currentCart = [];
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));

    if (cartItems) currentCart = cartItems;

    const prodObj = {
      id,
      name,
      finalPrice,
      image,
      quantity,
      productTotal,
      slug,
    };

    currentCart.push(prodObj);

    let finalCart = currentCart.filter(
      (product, index, self) =>
        index === self.findIndex((t) => t.id === product.id)
    );

    localStorage.setItem("cartItems", JSON.stringify(finalCart));

    //    message.success(`Added to Cart - ${product.name}`);

    dispatch({
      type: GET_CART_COUNT_SUCCESS,
      payload: finalCart,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_COUNT_FAIL,
      payload: error.message,
    });
  }
};

export { getCartItemsCount };
