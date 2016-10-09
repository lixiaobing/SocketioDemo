log = require('./log')
log.level  = log.DEBUG;
var Server = require('./server');
Server.init();
Server.listen(3000);