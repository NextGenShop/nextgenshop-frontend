const calcTotalPrice = (items) => {
  let totalPrice = 0;
  for (let item of items) {
    totalPrice += item.product.price * item.quantity;
  }
  return totalPrice;
};

const addBasketItem = (product, basket) => {
  let newItems = [];
  const foundItem = basket.items.find((item) => item.product.productId === product.productId);
  if (foundItem) {
    newItems = basket.items.map((item) =>
      item.product.productId === foundItem.product.productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    newItems = [...basket.items, { product, quantity: 1 }];
  }
  return { items: newItems };
};

const removeBasketItem = (productId, basket) => {
  let newItems = basket.items.map((item) => {
    if (item.product.productId === productId) {
      if (item.quantity <= 1) {
        return null;
      } else {
        return { ...item, quantity: item.quantity - 1 };
      }
    }
    return item;
  });
  newItems = newItems.filter((item) => item !== null);
  return { items: newItems };
};

export { addBasketItem, removeBasketItem, calcTotalPrice };
