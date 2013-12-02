var mocha = require('mocha');
var request = require('supertest');
var chai  = require('chai');

var expect = chai.expect;
var should = chai.should();
var request = request.agent('http://127.0.0.1:3000');

describe('Account', function() {
	before(function(done) {
		request
			.post('/login/local')
			.type('form')
			.field('username', 'jeroen@outlook.com')
			.field('password', 'test')
			.end(function(err, res) {
				done();
			});
	});
	it("GET /account should return HTML", function(done) {
		request
			.get('/account')
			.expect(200)
			.expect('Content-Type', /html/)
			.end(function(err, res) {
      	res.should.be.html;
      	res.text.should.not.contain('404!');
      	done();
    	});
	});
	it("GET /account/edit should return HTML", function(done) {
		request
			.get('/account/edit')
			.expect(200)
			.expect('Content-Type', /html/)
			.end(function(err, res) {
      	res.should.be.html;
      	res.text.should.contain('Edit account!');
      	done();
    	});
	});
	it("PUT /account valid should update account and return HTML", function(done) {
		request
			.post('/account')
			.type('form')
			.field('firstname', 'Jeroen')
			.field('email', 'jeroen@outlook.com')
			.field('lastname', 'van Leeuwen')
			.field('_id', '52778bfe369b53ad11f4fdd3')
			.field('_method', 'PUT')
			.expect(200)
			.expect('Content-Type', /html/)
			.end(function(err, res) {
      	res.text.should.contain('Your account');
      	done();
    	});
	});
	after(function(done) {
		request
			.get('/logout')
			.end(function(err, res) {
				done();
			});
	});
});