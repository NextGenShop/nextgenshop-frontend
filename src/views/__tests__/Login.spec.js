import React from 'react';
import { shallow, mount } from 'enzyme';
import { Login } from '../Login';
import { displayToast } from '../../utils/displayToast';

jest.mock('../../utils/displayToast', () => {
  return {
    displayToast: jest.fn(),
  };
});

describe('Login', () => {
  let props;
  beforeEach(() => {
    props = {
      auth: { isAuthenticated: false },
      error: null,
      dispatchLogin: jest.fn(),
      dispatchClearErrors: jest.fn(),
    };
  });
  test('should correctly render', () => {
    const component = shallow(<Login />);
    expect(component).toMatchSnapshot();
  });
  test('should correctly render with props', () => {
    const component = shallow(<Login {...props} />);
    expect(component).toMatchSnapshot();
  });
  test('should correctly login with email and password', () => {
    const email = 'mockEmail';
    const password = 'mockPassword';
    const component = shallow(<Login {...props} />);
    component
      .find('#emailTextField')
      .first()
      .simulate('change', {
        target: { value: email },
      });
    expect(component.find('#emailTextField').first().prop('value')).toEqual(
      email
    );
    component
      .find('#passwordTextField')
      .first()
      .simulate('change', { target: { value: password } });
    expect(component.find('#passwordTextField').first().prop('value')).toEqual(
      password
    );
    component.find('#loginButton').first().simulate('click');
    expect(props.dispatchLogin).toBeCalledWith({ email, password });
  });
  test('should correctly login as shopper', () => {
    const component = mount(<Login {...props} />);
    component.find('#loginShopperButton').first().simulate('click');
    expect(props.dispatchLogin).toBeCalledWith({
      email: 'mockuser1@gmail.com',
      password: 'password',
    });
  });
  test('should correctly login as cashier', () => {
    const component = mount(<Login {...props} />);
    component.find('#loginCashierButton').first().simulate('click');
    expect(props.dispatchLogin).toBeCalledWith({
      email: 'mockcashieruser@gmail.com',
      password: 'password',
    });
  });
  test('should display toast message on error', () => {
    props.error = 'mockError';
    const component = mount(<Login {...props} />);
    component.find('#loginShopperButton').first().simulate('click');
    expect(displayToast).toBeCalledWith(
      '',
      'mockError',
      'danger',
      props.dispatchClearErrors
    );
  });
});
