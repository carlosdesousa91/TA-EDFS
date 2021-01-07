// __author__ = 'Carlos araújo de sousa carlos.desousa91@outlook.com'
// __date__ = 'Copyright $Oct 07, 2021 19:00:00 PM$'
// __version__ = '0.1.1.1'

var fs = require('fs');
var httpProxy = require('http-proxy');
var https = require('https');

//get config arguments
var remote_user = process.argv[2],
locale = 'en-US',
proxy_port = process.argv[3],
connect_from = process.argv[4],
splunk_port = '8000';

var proxy = httpProxy.createServer({
  ssl:{
    key: fs.readFileSync('/opt/splunk/etc/auth/mycerts/mykey.key',  'utf8'),
    cert: fs.readFileSync('/opt/splunk/etc/auth/mycerts/mycert.pem',  'utf8')
  },
  target: 'https://127.0.0.1:' + splunk_port,
  secure: false
});

// Modify the header to allow the user to login
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('Accept-Language', locale);
  proxyReq.setHeader('REMOTE_USER', remote_user);
});

proxy.listen(proxy_port);

