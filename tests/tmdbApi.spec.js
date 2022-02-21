import chai, { expect } from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

describe("TMDB api working", function () {
  it("Responds with 200 status", function () {
    chai
      .request(
        `https://api.themoviedb.org/3/movie/76341?api_key=${process.env.TMDB_KEY}`
      )
      .get("/")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
      });
  });

  it("Responds with 200 status for popular actors", function () {
    chai
      .request(
        `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}`
      )
      .get("/")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
      });
  });
});
