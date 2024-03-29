/**
* @description <br/> <br/> Initializing the weather api and creating the server
* @author Ayoub Elmoujahid
*/

const restify = require('restify');
const router = new (require('restify-router')).Router();
const server = restify.createServer({
	name: 'api',
	version: '1.0.0',
});

//used to insert info to log files
const logger = require('./basic-logger');

//Cities Api routes definition
const cities = require('./routes/cities');

server.use(restify.plugins.throttle({
	burst: 100,  	// Max 10 concurrent requests (if tokens)
	rate: 2,  		// Steady state: 2 request / 1 seconds
	ip: true,		// throttle per IP
}));
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());

//Nest the routes defined in the given router under the given path
router.add('/cities', cities);
router.applyRoutes(server);

server.on('after', restify.plugins.metrics({ server: server }, function onMetrics(err, metrics) {
	logger.trace(`${metrics.method} ${metrics.path} ${metrics.statusCode} ${metrics.latency} ms`);
}));
if(!module.parent) {
	server.listen(process.env.PORT, function () {
		logger.info('%s listening at %s', server.name, server.url);
	});
}

server.on('uncaughtException', function (req, res, route, err) {
	logger.error(err);
});
module.exports = server; // for testing