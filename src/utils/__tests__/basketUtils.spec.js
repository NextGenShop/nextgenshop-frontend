import {
  addBasketItem,
  removeBasketItem,
  calcTotalPrice,
} from '../basketUtils';
import mockProducts from '../../store/mock/MockSupermarketDataset.json';
import mockBasketItems from '../../store/mock/MockBasketItems.json';

describe('basketUtils', () => {
  describe('addBasketItem', () => {
    const mockProduct = mockProducts[0];
    const mockBasket = {
      basketId: 'mockBasketId',
      items: mockBasketItems,
    };
    const mockEmptyBasket = {
      basketId: 'mockEmptyBasketId',
      items: [],
    };
    test('should correctly add a product to an empty basket', () => {
      const { items } = addBasketItem(mockProduct, mockEmptyBasket, 1);
      const expectedItems = [{ product: mockProduct, quantity: 1 }];
      expect(items).toEqual(expectedItems);
    });
    test('should correctly add a product with greater than 1 quantity to an empty basket', () => {
      const { items } = addBasketItem(mockProduct, mockEmptyBasket, 3);
      const expectedItems = [{ product: mockProduct, quantity: 3 }];
      expect(items).toEqual(expectedItems);
    });
    test('should correctly add a product to an existing basket', () => {
      const { items } = addBasketItem(mockProduct, mockBasket, 1);
      const expectedItems = mockBasket.items;
      expectedItems.find(
        (basketItem) => basketItem.product.productId === mockProduct.productId
      ).quantity += 1;
      expect(items).toEqual(expectedItems);
    });
  });
});
