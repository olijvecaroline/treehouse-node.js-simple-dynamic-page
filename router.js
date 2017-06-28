var Profile = require("./profile.js");
var renderer = require("./renderer.js");


function home(request, response){
	if(request.url === "/"){
	  response.setHead(200,{'Content-Type': 'text/plain'});
		renderer.view('header', {}, response);
	  renderer.view('search',{}, response);
	  renderer.view('footer',{}, response);
    response.end();
	}//end of if statement
}//end of homeRoute()


function user(request, response){
	var username = request.url.replace("/", "")
	if(username.length > 0){ //!: >= cause of 'write after end'-error
	  response.setHead(200,{'Content-Type': 'text/plain'});
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
