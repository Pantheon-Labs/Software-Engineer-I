const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = require("assert");
const app = require("../server");
const { it } = require("mocha");

chai.use(chaiHttp);
chai.should();

describe("Basic test test", function () {
  it("should be able to assert", function () {
    assert.equal("Hello".length, 5);
  });
});
