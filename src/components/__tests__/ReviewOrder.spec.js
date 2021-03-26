import React from "react";
import { shallow } from "enzyme";
import { Review } from "../ReviewOrder";
import mockBasketItems from "../../store/mock/MockBasketItems.json";

describe("ReviewOrder", () => {
  const defaultProps = {
    basket: {},
  };

  test("should correctly render", () => {
    const component = shallow(<Review />);
    expect(component).toMatchSnapshot();
  });

  test("should correctly render with props", () => {
    const component = shallow(<Review {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });

  test("should correctly render a single basket item", () => {
    const mockBasket = { items: [mockBasketItems[0]], totalPrice: 0 };
    const component = shallow(<Review {...defaultProps} basket={mockBasket} />);
    expect(component).toMatchSnapshot();
  });

  test("should correctly render multiple basket items", () => {
    const mockBasket = {
      items: [mockBasketItems[0], mockBasketItems[1]],
      totalPrice: 0,
    };
    const component = shallow(<Review {...defaultProps} basket={mockBasket} />);
    expect(component).toMatchSnapshot();
  });
});
