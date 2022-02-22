import "jsdom-global/register";
import { expect } from "chai";
import React from "react";
import enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import store from "../client/store";
import Home from "../client/components/Home";
import jsdom from "jsdom";

const { JSDOM } = jsdom;
const { document } = new JSDOM("").window;
global.document = document;

const adapter = new Adapter();
enzyme.configure({ adapter });

describe("Components", () => {
  let home;

  beforeEach(() => {
    home = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });

  it("renders Home component", () => {
    expect(home.find("h1").text()).to.be.equal("Star Signs");
  });
});
