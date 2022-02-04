import chai from "chai";
import chaiHttp from "chai-http";
import assert from "assert";
import app from "../server";
import { it } from "mocha";

chai.use(chaiHttp);
chai.should();

describe("Basic test test", function () {
  it("should be able to assert", function () {
    assert.equal("Hello".length, 5);
  });
});
