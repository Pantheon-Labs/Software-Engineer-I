import chai from "chai";
import chaiHttp from "chai-http";
import assert from "assert";
import app from "../server";
import { it } from "mocha";

chai.use(chaiHttp);

describe("Basic test test", function () {
  it("should run an app", function () {
    chai.request(app).get("/");
  });
});
