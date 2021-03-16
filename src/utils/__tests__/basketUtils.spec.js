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
    test('should correctly add a product to an empty basket without specifying quantity', () => {
      const { items } = addBasketItem(mockProduct, mockEmptyBasket);
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

  describe('removeBasketItem', () => {
    const mockProduct = mockProducts[0];
    const mockBasket = {
      basketId: 'mockBasketId',
      items: mockBasketItems,
    };

    test('should correctly remove a product from a basket with the product', () => {
      const { items } = removeBasketItem(mockProduct.productId, mockBasket);
      const expectedItems = mockBasketItems.filter(
        (item) => item.product.productId !== mockProduct.productId
      );
      expect(items).toEqual(expectedItems);
    });

    test('should correctly remove a product from a basket with the product and its quantity greater than 1', () => {
      const mockProductB = mockProducts[2];
      const { items } = removeBasketItem(mockProductB.productId, mockBasket);
      const expectedItems = mockBasketItems.filter(
        (item) => item.product.productId !== mockProductB.productId
      );
      expect(items).toEqual(expectedItems);
    });

    test('should not remove any products if product id does not exist in basket', () => {
      const mockProductC = mockProducts[7];
      const { items } = removeBasketItem(mockProductC.productId, mockBasket);
      expect(items).toEqual(mockBasketItems);
    });
  });

  describe('calcTotalPrice', () => {
    const mockItemsA = [
      {
        product: {
          productId: 0,
          name: 'Milk Chocolate Biscuits 9 Pack',
          price: 1.5,
          image: 'mockImageUrl',
          retailer: 'Mock Retailer A',
        },
        quantity: 2,
      },
    ];
    const expectedTotalA = 3;
    const mockItemsB = [
      {
        product: {
          productId: 0,
          name: 'Milk Chocolate Biscuits 9 Pack',
          price: 1.5,
          image: 'mockImageUrl',
          retailer: 'Mock Retailer A',
        },
        quantity: 1,
      },
      {
        product: {
          productId: 2,
          name: 'Sparkling Water 330Ml',
          price: 2.5,
          image: 'mockImageUrl',
          retailer: 'Mock Retailer A',
        },
        quantity: 2,
      },
    ];
    const expectedTotalB = 6.5;

    test('should correctly calculate total price A', () => {
      const totalPrice = calcTotalPrice(mockItemsA);
      expect(totalPrice).toEqual(expectedTotalA);
    });

    test('should correctly calculate total price B', () => {
      const totalPrice = calcTotalPrice(mockItemsB);
      expect(totalPrice).toEqual(expectedTotalB);
    });

    test('should correctly calculate total price for empty basket items', () => {
      const mockEmptyItems = [];
      const totalPrice = calcTotalPrice(mockEmptyItems);
      expect(totalPrice).toEqual(0);
    });
  });
});
