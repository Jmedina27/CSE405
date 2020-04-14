//?
var express = require('express');
//?
var server = express();
//?
server.use('/', express.static('/Users/jesusmedina/School/Spring2020/CSE405' + '/'));
//?
server.listen(9998);

