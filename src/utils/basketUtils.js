const addBasketItem = (product, items, setItems) => {
  const newId = items.length;
  let newItems = [...items, { basketItemId: newId, product, quantity: 1 }];
  const foundItem = items.find((item) => item.product.productId === product.productId);
  if (foundItem) {
    newItems = items.map((item) =>
      item.basketItemId === foundItem.basketItemId ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  setItems(newItems);
};

const removeBasketItem = (basketItemId, items, setItems) => {
  const newItems = items.filter((item) => item.basketItemId !== basketItemId);
  setItems(newItems);
};

export { addBasketItem, removeBasketItem };
