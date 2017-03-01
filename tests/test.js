var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var serverFile = require('../server.js');


  describe('getting data from api', function() {
    it('searchMovieAPI() should return home/empty path and query parameters empty', function() {
      return serverFile.searchMovieAPI('', '').then(function(data){
          expect(data.url).to.equal('/');
      })
    })
  });

  describe('getting data from api', function() {
    it('searchMovieAPI() should return undefined and query parameters null', function() {
      return serverFile.searchMovieAPI(null, null).then(function(data){
          expect(data.url).to.equal(undefined);
      })
    })
  });

  
