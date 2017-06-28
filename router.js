var Profile = require("./profile.js");
var renderer = require("./renderer.js");

var queryString = require("querystring");

const commonHeader = {'Content-Type': 'text/plain'};

function home(request, response){
	if(request.url === "/"){
		if(request.method.toLowerCase === 'get'){
		  response.setHead(200,commonHeader);
			renderer.view('header', {}, response);
		  renderer.view('search',{}, response);
		  renderer.view('footer',{}, response);
	    response.end();
		}else{
			//get post-data from body
      request.on("data", function(postBody){
      //extract username
      var query = queryString.parse(postBody.toString());
      //redirect to username
      response.writeHead(303,{"location": "/" + query.username});
      response.end();
      console.log (query["username"]);
      });
		}//end of if-get-else-post statement
	}//end of if-home-url statement
}//end of homeRoute()


function user(request, response){
	var username = request.url.replace("/", "")
	if(username.length > 0){ //!: >= cause of 'write after end'-error
	  response.setHead(200,commonHeader);
	  renderer.view('header',{},response);

		//get json from treehouse
	  var studentProfile = new Profile(username);

		//on end
		studentProfile.on("end", function(profileJSON){
			 //store values which we need
			 var values = {
			 	avatarUrl: profileJSON.gravatar_url,
				 username: profileJSON.profile_name,
				 badges: profileJSON.badges.length,
				 javaScriptPoints: profileJSON.points.JavaScript
			 }//end of values-object

		 //simple response
		 renderer.view('profile',values, response);
		 renderer.view('footer',{},response);
     response.end();
		});// end of studentprofile on-end-handler

		//on error
		studentProfile.on("error", function(error){
		 //show error
		 renderer.view('header', {}, response);
		 renderer.view('error',{errorMessage: error.message}, response);
		 renderer.view('search',{}, response);
		 renderer.view('footer',{},response);
		 response.end();
		});// end of studentprofile on-error-handler
	}//end of if-statement
}//end of userRoute()

module.exports.home = home;
module.exports.user = user;
