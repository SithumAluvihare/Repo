export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate total price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc, item) =>
        acc + (item.isOnSale ? item.salePrice : item.price) * item.qty,
      0
    )
  );
  // Shipping is free for all items
  state.shippingPrice = "0.00";
  // No tax
  state.taxPrice = "0.00";
  // Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice)
  ).toFixed(2);
  // Calculate items number
  state.itemsNumber =
    state.cartItems.reduce((acc, item) => acc + item.qty, 0) || 0;
  // items number text
  state.itemsNumberText =
    state.itemsNumber <= 1
      ? `${state.itemsNumber} item`
      : `${state.itemsNumber} items`;

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
