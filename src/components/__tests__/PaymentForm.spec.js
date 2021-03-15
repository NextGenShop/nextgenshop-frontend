import React from 'react';
import { shallow } from 'enzyme';
import PaymentForm from '../PaymentForm';

describe('PaymentForm', () => {
  test('should correctly render', () => {
    const component = shallow(<PaymentForm />);
    expect(component).toMatchSnapshot();
  });
});
