const fs = require('fs');
const routeModel = require('../../src/model/routeModel');

const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');

let stub;
let someRoute = {
    "url": "/api/unit-test/someroute",
    "method": "GET",
    "response": {
        "status": 200,
        "body": {}
    }
};

describe('routeModel', () => {
    beforeEach(() => {
        stub = sinon.stub(fs, 'readFileSync').callsFake(path => {
            return JSON.stringify([someRoute]);
        });
    });

    it('should return an array of route instances when getRoutes is called', () => {
        // arrange
        routeModel.init();

        // act
        let result = routeModel.getRoutes();

        // assert
        should.equal(result[0].url, someRoute.url);
    });

    afterEach(() => {
        stub ? stub.restore() : null;
    });
});