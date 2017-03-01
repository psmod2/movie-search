var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var serverFile = require('../server.js');


  describe('getting data from api', function() {
    it('searchMovieAPI() should return nothing path and query parameters empty', function() {
      return serverFile.searchMovieAPI('', '').then(function(data){
          expect(data.url).to.equal('/');
      })
    })
  });
