const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../index');

chai.use(chaiHttp);

describe('*********************Test Users API*********************************', () => {
    /**
     * Get User
     */
     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiQGdtYWlsLmNvbSIsInVzZXJJZCI6IjYyZDgzZDI3ZTRkNDQ5MzliY2NmNTE5YSIsImlhdCI6MTY1ODQ5NjkxMCwiZXhwIjoxNjU4NTAwNTEwfQ.3DTBn7ANL5tGi9Okz2c0h0E4Wa4nCht_t_Za7ruAEGY";
     describe('GET /user', () => {

        it('it should get all the user of user with status code 200', (done) => {
            chai.request(app)
                .get("/user")
                .set({ "Authorization": `${token}` })
                .end((err, response) => {
                    response.body.should.be.a('object')
                    done();
                })
        })

        it('return 401 when get user with message auth_failed', (done) => {
            chai.request(app)
                .get("/user")
                .end((err, response) => {
                    response.should.have.status(401)
                    done();
                })
        })
    })

    /**
     * Test The LOGIN routes
     */
    describe('Login API', function () {
        it('Should success if credential is valid', function (done) {
            chai.request(app)
                .post('/user/login')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({ email: 'ab@gmail,com', password: '123456789' })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    /**
     * Test The SIGNUP routes
     */
    describe('SIGNUP API', function () {
        it('Should success if credential is valid', function (done) {
            chai.request(app)
                .post('/user/signup')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({ email: 'ab@gmail,com', password: '123456789' })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    /**
     * Test The UPDATE routes
     */
    describe('UPDATE API', function () {
        it('Should success if credential is valid', function (done) {
            chai.request(app)
                .put('/user')
                .set({ "Authorization": `${token}` })
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({ email: 'ab@gmail.com', password: '123456789' })
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
    });

    

});
