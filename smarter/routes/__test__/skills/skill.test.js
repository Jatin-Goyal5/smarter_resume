const chai = require('chai');
const chaiHttp = require('chai-http');
const Skill = require('../../../models/skill');
const User = require('../../../models/User');
const app = require('../../../index');

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('*********************Test Skill API*********************************', () => {
    // user
    // token 
    // token -> userId 
    // userId skill get /create
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYyZDgzZDI3ZTRkNDQ5MzliY2NmNTE5YSIsImlhdCI6MTY1ODQ5NjkxMCwiZXhwIjoxNjU4NTAwNTEwfQ.3DTBn7ANL5tGi9Okz2c0h0E4Wa4nCht_t_Za7ruAEGY";
    beforeEach(function (done) {
        var newSkill = new Skill({
            name: 'html',
            rating: 4,
            user: "62d83d27e4d44939bccf519a"
        });
        newSkill.save(function (err) {
            done();
        });
    });

    afterEach(function (done) {
        Skill.collection.drop().then(function () {
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
    describe('GET /skill', () => {

        it('it should get all the skill of user with status code 200', (done) => {
            chai.request(app)
                .get("/skill")
                .set({ "Authorization": `${token}` })
                .end((err, response) => {
                    response.body.should.be.a('object')
                    done();
                })
        })

        it('return 401 when get skill with message auth_failed', (done) => {
            chai.request(app)
                .get("/skill")
                .end((err, response) => {
                    response.should.have.status(401)
                    done();
                })
        })
    })

    /**
     * Test The POST routes
     */
    describe('POST /skill', () => {
        // success full creating a skill
        it('it should create a skill with status 200', (done) => {
            let data = {
                name: "html",
                rating: 4,
                user: "62d83d27e4d44939bccf519a"
            }
            chai.request(app)
                .post('/skill')
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
            let data = {
                name: "html",
                rating: 4,
                user:  "62d83d27e4d44939bccf519a"
            }
            chai.request(app)
                .post('/skill')
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
