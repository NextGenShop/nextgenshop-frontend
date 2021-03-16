import React from 'react';
import { shallow } from 'enzyme';
import { ShopperPage } from '../ShopperPage';
import mockUsers from '../../../store/mock/MockUsers.json';

describe('ShopperPage', () => {
  test('should correctly render with props', () => {
    const component = shallow(<ShopperPage authUser={mockUsers[0]} />);
    expect(component).toMatchSnapshot();
  });
});
