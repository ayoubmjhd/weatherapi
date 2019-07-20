/**
* @description <br/> <br/> Cities Tests Class <br/>Defines the Weather Api unit tests

* @author Ayoub Elmoujahid
*/
let supertest = require("supertest");
let should = require("should");
let app = require('../app.js');
let request = require("supertest").agent(app.listen());

// UNIT tests begin
describe("Weather API tests",function(){

  // # should returns close Cities near lat=49.48 lng=8.46 
  it("Cities near lat=49.48 lng=8.46 found",function(done){

    // calling home page api
    request
    .get("/cities?lat=49.48&lng=8.46")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.should.be.an.Array();
      res.body.length.should.be.aboveOrEqual(0);
      done();
    });
  });

  // # parameters lat/lng are missing
  it("parameters lat/lng are missing",function(done){

    // calling home page api
    request
    .get("/cities")
    .expect("Content-type",/json/)
    .expect(400) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 400
      res.status.should.equal(400);
      res.body.code.should.equal("BadRequestError");
      res.body.message.should.equal("lat/lng required");
      done();
    });
  });
   // # should Retrieve Mannheim details
   it("Retrieve the details for a city",function(done){

    // calling home page api
    request
    .get("/cities/2873891")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.id.should.equal(2873891);
      res.body.name.should.equal("Mannheim");
      res.body.should.have.ownProperty('name');
      res.body.should.have.ownProperty('lat');
      res.body.should.have.ownProperty('lng');
      done();
    });
  });
// # city id not found 
it("City id not found",function(done){

    // calling home page api
    request
    .get("/cities/111")
    .expect("Content-type",/json/)
    .expect(404) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 404
      res.status.should.equal(404);
      res.body.code.should.equal("NotFoundError");
      res.body.message.should.equal("not found");
      done();
    });
  });
// # Retrieve weather data for mannheim
  it("Retrieve the weather data",function(done){

    // calling home page api
    request
    .get("/cities/2873891/weather")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.should.be.an.Array();
      res.body.length.should.be.above(0);      
      res.body[0].should.have.ownProperty('type');
      res.body[0].should.have.ownProperty('type_description');
      res.body[0].should.have.ownProperty('humidity');
      done();
    });
  });
  // # suld not found the city in the open weather api
  it("City id not found in openweathermap",function(done){

    // calling home page api
    request
    .get("/cities/111/weather")
    .expect("Content-type",/json/)
    .expect(404) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 404
      res.status.should.equal(404);
      res.body.code.should.equal("NotFoundError");
      res.body.message.should.equal("not found");
      done();
    });
  });

  // # url does not exist in the api
  it("url does not exist in the api",function(done){

    // calling home page api
    request
    .get("/")
    .expect("Content-type",/json/)
    .expect(404) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 404
      res.status.should.equal(404);
      res.body.code.should.equal("ResourceNotFound");
      res.body.message.should.equal("/ does not exist");
      done();
    });
  });
    

});