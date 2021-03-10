import React from 'react';
import { shallow } from 'enzyme';
import VideoChat from '../VideoChat';

describe('VideoChat', () => {
  test('should correctly render', () => {
    const component = shallow(<VideoChat />);
    expect(component).toMatchSnapshot();
  });
});
