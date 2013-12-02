var mocha = require('mocha');
var request = require('supertest');
var chai  = require('chai');
var cheerio = require('cheerio');

var expect = chai.expect;
var request = request('http://127.0.0.1:3000');

var $;

describe('Login', function() {
	it("GET /login should return HTML", function(done) {
		request
			.get('/login')
			.expect(200)
			.expect('Content-Type', /html/)
			.end(function(err, res) {
      	res.should.be.html;
      	res.text.should.not.contain('404!');
      	done();
    	});
	});
	it("GET /login should have the option to register/login", function(done) {
		request
			.get('/login')
			.end(function(err, res) {
      	$ = cheerio.load(res.text);
      	$('form[action="login/local"]').should.have.length(1);
      	$('a[href="account/new"]').should.have.length(1);
      	done();
    	});
	});
	it("POST /login with credentials should redirect to index", function(done) {
		request
			.post('/login/local')
			.type('form')
			.field('username', 'jeroen@outlook.com')
			.field('password', 'test')
			.expect(200)
			.end(function(err, res) {
      	res.header.location.should.equal('/');
      	done();
    	});
	});
	it("POST /login without credentials should redirect to login", function(done) {
		request
			.post('/login/local')
			.type('form')
			.field('username', '')
			.field('password', '')
			.expect(302)
			.end(function(err, res) {
      	res.header.location.should.equal('/login');
      	done();
    	});
	});
});