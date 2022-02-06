import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { TMDBKey } from "../secrets";

chai.use(chaiHttp);

describe("TMDB api working", function () {
  it("Responds with 200 status", function () {
    chai
      .request(`https://api.themoviedb.org/3/movie/76341?api_key=${TMDBKey}`)
      .get("/")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
      });
  });
});
