/**
* @description <br/> <br/> Cities Controller Definition<br/> Represents methods used for cities coordinates 

* @author Ayoub Elmoujahid
*/


const fs = require('fs');
const geoDistance = require('geo-distance');

/**
 * Conatins Cities details
 */
let _cities = new Array();
fs.readFile('./data/city.list.json', 'utf8', function (err, data) {
	_cities = JSON.parse(data);
});

class ctr{
	constructor(row){
		this.row=row;
	}
	/**
	 * Retrieve the details for a city
	 * @param   _id City id
	 *
     * @returns    City details
     */
	static findCityById(_id){
		var _out={}
		for(var i=0;i<_cities.length;i++){
			if(_cities[i].id==_id){
				_out.id=_cities[i].id,
				_out.name=_cities[i].name,
				_out.lat=_cities[i].coord.lat,
				_out.lng=_cities[i].coord.lon;
				return _out;
			}
		}
		return _out;
	} 
	/**
	 * List the available cities around the specified latitude/longitude within a radius of 10 kilometers
	 * @param   _lat City latitude
	 * @param   _lng City longitude
	 *
     * @returns     List of close cities
     */
	static closeCities(_lat, _lng){
		var _outs=new Array();
		var _ref={lon:_lng, lat:_lat};
		for(var i=0;i<_cities.length;i++){
			if(geoDistance.between(_ref, _cities[i].coord).human_readable().distance<=10){
				_outs.push({id:_cities[i].id,name:_cities[i].name});
			}
		}
		return _outs;
	}

}
module.exports = ctr;