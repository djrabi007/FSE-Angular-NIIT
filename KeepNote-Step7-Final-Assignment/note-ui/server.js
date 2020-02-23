
var path = require('path');
var url = require('url');
var  _ = require('lodash');
var express = require("express");
var app = express();

app.use(express.static(__dirname + '/dist'));
var httpProxy = require("http-proxy");
var apiProxy = httpProxy.createProxyServer();
var gatewayServer = "http://localhost:8765";

app.all("/noteservice/*",function(req,res){

console.log("redirecting to noteservice");
const __path = _.drop(req.url.split('/'),1);
__path[0] = "";
console.log(__path);
console.log(url.resolve(gatewayServer,__path.join('/')));
apiProxy.proxyRequest(req,res,{
  target:url.resolve(gatewayServer,__path.join('/')),
  port:9300,
  ignorePath:false
});
});

app.all("/authenticationservice/*",function(req,res){
console.log("redirecting to authenticationservice");
const __path = _.drop(req.url.split('/'),1);
console.log(__path);
console.log(url.resolve(gatewayServer,__path.join('/')));
apiProxy.proxyRequest(req,res,{
  target:url.resolve(gatewayServer,__path.join('/')),
  port:9100,
  ignorePath:false
});
});

app.all("/categoryservice/*",function(req,res){
console.log("redirecting to categoryservice");
const __path = _.drop(req.url.split('/'),1);
__path[0] = "";
console.log(__path);
console.log(url.resolve(gatewayServer,__path.join('/')));
apiProxy.proxyRequest(req,res,{
  target:url.resolve(gatewayServer,__path.join('/')),
  port:9400,
  ignorePath:false
}); 
});

app.all("/reminderservice/*",function(req,res){
console.log("redirecting to reminderservice");
const __path = _.drop(req.url.split('/'),1);
__path[0] = "";
console.log(__path);
console.log(url.resolve(gatewayServer,__path.join('/')));
apiProxy.proxyRequest(req,res,{
  target:url.resolve(gatewayServer,__path.join('/')),
  port:9500,
  ignorePath:false
});
});
var server = require('http').createServer(app);
server.listen(4200);
