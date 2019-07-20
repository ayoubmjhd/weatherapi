/**
* @description <br/> <br/> <The description of the Class>
* @author Ayoub Elmoujahid
*/
require('dotenv').config({silent: true});
const router = new (require('restify-router')).Router();
const ctr = require('../controller/cities');
const request = require('request');
router.get('/', function (req, res, next) {
	var _lat=req.query.lat;
	var _lng=req.query.lng;
	if((_lng==undefined)||(_lat==undefined))
	{
		res.status(400);
		res.json({
		  code:"BadRequestError",
		  message:"lat/lng required"	
		});
	}
	else{
		res.status(200);
		res.json(ctr.closeCities(_lat, _lng));
	}
	next();
});

router.get('/:id', function (req, res, next) {
	let _id=req.params.id;
	let _out=ctr.findCityById(_id);
	if (_out.id==undefined){
		res.status(404);
		res.json({
			message:"not found",
			code:"NotFoundError"
		});
	}
	else{
		res.status(200);
		res.json(_out);	
	}
	next();
});

router.get('/:id/weather', function (req, res, next) {
	request(process.env.WEATHERURL+'?id='+req.params.id+'&APPID='+process.env.APPID, function (error, response, body) {
		var _data = JSON.parse(body);
		if(_data.cod!=200){
			res.status(404);
			res.json({
			  code:"NotFoundError",
			  message:"not found"
			});
		}
		else{
			var _out= new Array()
			for(var i=0;i<_data.list.length;i++)
			{
			  _out.push({
				  type: _data.list[i].weather[0].main,
				  type_description: _data.list[i].weather[0].description,
				  sunrise: _data.list[i].dt_txt,
				  sunset: _data.list[i].dt_txt,
				  temp: _data.list[i].main.temp,
				  temp_min: _data.list[i].main.temp_max,
				  temp_max: _data.list[i].main.temp_max,
				  pressure: _data.list[i].main.pressure,
				  humidity:  _data.list[i].main.humidity,
				  clouds_percent: _data.list[i].clouds.all,
				  wind_speed: _data.list[i].wind.speed
				});
			}
			res.status(200);
			res.json(_out);
		}
	});
	next();
});

module.exports = router;