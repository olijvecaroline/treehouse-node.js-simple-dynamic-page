
//require router
const router = require('./router.js');
//Create a web-server


const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((request, response) => {
  router.home(request, response);
  router.user(request, response);
});

server.listen(port)
  console.log(`Server running at http://<workspace_url ${port}/`);


//Function that handles the reading of files and merge in values(populate the profile)
	//read from file and get a string
	//merge values in to string
