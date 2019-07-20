# Rest Weather Api
This is a REST based service to retrieve information about the weather in different cities. 
The service is powered by node.js and used the data provided by openweathermap.org. 
The list of available cities can be found in /data/city.list.json.

## Main Used Libraries
The following libraries are used to implement the service:
* restify (http://restify.com/) ­ as the baseline to implement the REST web service
* request (https://github.com/request/request) ­ to communicate and make requests to the http://openweathermap.org/ API
* mocha (https://mochajs.org/) to develop test cases for the service and execute them in serial with proper reporting
* supertest (https://github.com/visionmedia/supertest/)  to test HTTP calls in node.js

## Dockerizing the code
Docker was used to build up the code,  it moves the code into an image or container: bind mounts and the Dockerfile COPY instruction.

## Testing tools 
* postman (https://www.getpostman.com/) a tool to test the service


## Testing scenarios
The service provides routes which deliver the response as json and indicate the response type with the proper content type.
They fulfill the following scenarios:

### `GET /cities?lat={latitude}&lng={longitude}`
List the available cities around the specified latitude/longitude within a radius of 10 kilometers Example: http://localhost:8081/cities?lat=49.48&lng=8.46

Returns:
* `HTTP 200 Ok` with body:
```js
[
  {"id":2873891,"name":"Mannheim"}, {"id":6555232,"name":"Altrip"}, ...
]
```

* `HTTP 400 Bad Request` if parameters are missing:
```js
{
  "code":"BadRequestError",
  "message":"lat/lng required"	
}
```

### `GET /cities/{city_id}`
Retrieve the details for a city (by city_id) Example: http://localhost:8080/cities/2873891

Returns:
* `HTTP 200 Ok` with body:
```js
{
  "id":2873891,
  "name":"Mannheim", "lat":49.488331, "lng":8.46472
}
```

* `HTTP 404 Not Found` if the city_id was not found:
```js
{
  "code":"NotFoundError",
  "message":"not found"
}
```

### `GET /cities/{city_id}/weather`
Retrieve the weather data for a city (by city_id) Example: http://localhost:8080/cities/2873891/weather

Returns:

* `HTTP 200 Ok` with body:
```js
{
  "type": "Clear",
  "type_description": "clear sky",
  "sunrise": "2016-08-23T08:00:00.000Z",
  "sunset": "2016-08-23T22:00:00.000Z",
  "temp": 29.72,
  "temp_min": 26.67,
  "temp_max": 35,
  "pressure": 1026,
  "humidity": 36,
  "clouds_percent": 0,
  "wind_speed": 1.5
}
```
* `HTTP 404 Not Found` if the city_id was not found:
```js
{
  "code":"NotFoundError",
  "message":"not found"
}
```
* `HTTP 404 Not Found` if Resource Not Found:
```js
{
    "code": "ResourceNotFound",
    "message": "/ does not exist"
}
```
### Getting started
To Build and start the service :

1. open a terminal window and run `docker-compose up --build`
2. Use postman to test each scenario

### Unit tests
There is a unit test case for each scenario.
To run the tests open the terminal window and run:

* `docker exec -it weatherapi npm run test`
