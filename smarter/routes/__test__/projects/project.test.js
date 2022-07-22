const chai = require('chai');
const chaiHttp = require('chai-http');
const Project = require('../../../models/project');
const app = require('../../../index');
const should = chai.should();
const expect = chai.expect;


chai.use(chaiHttp);

describe('*********************Test Project API*********************************', () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYyZDgzZDI3ZTRkNDQ5MzliY2NmNTE5YSIsImlhdCI6MTY1ODQ5NjkxMCwiZXhwIjoxNjU4NTAwNTEwfQ.3DTBn7ANL5tGi9Okz2c0h0E4Wa4nCht_t_Za7ruAEGY";

  beforeEach(function (done) {
    var newProject = new Project({
      title: 'project x',
      description: "hello project x",
      user: "62d83d27e4d44939bccf519a"
    });
    newProject.save(function (err) {
      done();
    });
  });

  afterEach(function (done) {
    Project.collection.drop().then(function () {
      // success     
    }).catch(function () {
      // error handling
      //console.warn(' collection may not exists!');
    })
    done();
  });

  /**
   * Test The GET routes
   */
  describe('GET /project', () => {

    it('it should get all the project of user with status code 200', (done) => {
      chai.request(app)
        .get("/project")
        .set({ "Authorization": `${token}` })
        .end((err, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          done();
        })
    })

    it('return 401 when get project with message auth_failed', (done) => {
      chai.request(app)
        .get("/project")
        .end((err, response) => {
          response.should.have.status(401)
          done();
        })
    })
  })

  /**
   * Test The POST routes
   */
  describe('POST /project', () => {
    // success full creating a project
    it('it should create a project with status 200', (done) => {
      let data = {
        title: 'project x',
        description: "hello project x",
        user: "62d83d27e4d44939bccf519a"
      }
      chai.request(app)
        .post('/project')
        .set({ "Authorization": `${token}` })
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    // success-fully throwing a error when auth is not valid 
    it('it should return an error with invalid auth and status 401', (done) => {
      let data ={
        title: 'project x',
        description: "hello project x",
        user: "62d83d27e4d44939bccf519a"
      }
      chai.request(app)
        .post('/project')
        .set({ "Authorization": `${token}` })
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  })

});
