import React from 'react';
import { shallow } from 'enzyme';
import { Navbar, mapDispatchToProps } from '../Navbar';
import { displayToast } from '../../utils/displayToast';

jest.mock('../../store/api/auth', () => {
  return {
    ...jest.requireActual('../../store/api/auth'),
    actions: {
      logout: () => 'LOGOUT',
    },
  };
});

jest.mock('../../utils/displayToast', () => {
  return {
    displayToast: jest.fn(),
  };
});

describe('Navbar', () => {
  const defaultProps = {
    auth: { isAuthenticated: true },
    dispatchLogout: jest.fn(),
  };

  test('should correctly render', () => {
    const component = shallow(<Navbar />);
    expect(component).toMatchSnapshot();
  });

  test('should correctly render with props', () => {
    const component = shallow(<Navbar {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });

  test('should correctly handle logout', () => {
    const component = shallow(<Navbar {...defaultProps} />);
    expect(component.exists('#logoutButton')).toEqual(true);
    component.find('#logoutButton').first().simulate('click');
    expect(defaultProps.dispatchLogout).toBeCalled();
    expect(displayToast).toBeCalled();
  });

  test('should dispatch correct actions', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).dispatchLogout();
    expect(dispatch.mock.calls[0][0]).toEqual('LOGOUT');
  });
});
