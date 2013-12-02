var mocha = require('mocha');
var request = require('supertest');
var chai  = require('chai');

var expect = chai.expect;
var request = request('http://127.0.0.1:3000');

describe('Index', function() {
	it("GET /index.html should return HTML", function(done) {
		request
			.get('/')
			.expect(200)
			.expect('Content-Type', /html/)
			.end(function(err, res) {
      	res.should.be.html;
      	res.text.should.not.contain('404!');
      	done();
    	});
	});
});