import { expect } from "chai";
import React from "react";
import enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Home from "../client/components/Home";

const adapter = new Adapter();
enzyme.configure({ adapter });

describe("Components", () => {
  let home;

  beforeEach(() => {
    home = shallow(<Home />);
  });

  it("renders Home component", () => {
    expect(home.find("h1").text()).to.be.equal("Home");
  });
});
