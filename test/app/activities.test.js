var mocha = require('mocha');
var request = require('supertest');
var chai  = require('chai');

var expect = chai.expect;
var should = chai.should();
var request = request('http://127.0.0.1:3000');

describe('Activities', function() {
	it("GET /activities.html should return HTML", function(done) {
		request
			.get('/activities.html')
			.expect(200)
			.expect('Content-Type', /html/)
			.end(function(err, res) {
      	res.should.be.html;
      	res.text.should.not.contain('404');
      	done();
    	});
	});
	it("GET /tweets.json should return JSON", function(done) {
		request
			.get('/tweets.json')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res) {
      	res.body.should.be.instanceOf(Object).and.not.be.empty;
      	done();
    	});
	});
});