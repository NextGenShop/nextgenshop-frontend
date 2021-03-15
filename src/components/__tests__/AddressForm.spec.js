import React from 'react';
import { shallow } from 'enzyme';
import AddressForm from '../AddressForm';

describe('AddressForm', () => {
  test('should correctly render', () => {
    const component = shallow(<AddressForm />);
    expect(component).toMatchSnapshot();
  });
});
