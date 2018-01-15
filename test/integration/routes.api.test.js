const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../app');
const fs = require('fs');
const routeModel = require('../../src/model/routeModel');

let stub;
let someRoute = {
    "url": "/api/integration-test/someroute",
    "method": "GET",
    "response": {
        "status": 200,
        "body": {
            "hello": "real world"
        }
    }
};

describe('Dynamic routing, when GET /api/helloworld', () => {
    beforeEach(() => {
        stub = sinon.stub(fs, 'readFileSync').callsFake(path => {
            return JSON.stringify([someRoute]);
        });

        routeModel.init();
    });

    it('should respond with a dynamic response', done => {
        chai.request(server)
            .get('/api/integration-test/someroute')
            .end((err, res) => {
                should.not.exist(err);

                res.status.should.equal(200);
                res.type.should.equal('application/json');

                res.body.should.include.keys('hello');
                res.body["hello"].should.equal("real world");

                done();
            });
    });

    afterEach(() => {
        stub ? stub.restore() : null;
    });
});