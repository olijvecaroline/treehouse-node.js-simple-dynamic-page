var Profile = require("./profile.js");

//home route
//Handle HTTP route GET / and POST / i.e. Home
	//if url ==== "/" && GET
		// show searchfield
	//if url ==="/"  && POST
		// redirect to /username
function home(request, response){
	if(request.url === "/"){
	  response.statusCode = 200;
	  response.setHeader('Content-Type', 'text/plain');
	  response.write("Header Homepage\n");
	  response.write("Search\n");
	  response.end("Footer HomePage\n");
	}//end of if statement
}//end of homeRoute()

//user route
//Handle HTTP route GET /:username i.e. /chalkers
	//if url == "/..."
		//get json from Treehouse
			//on "end"
				//show profile
			//on "error"
				//show error
function user(request, response){
	var username = request.url.replace("/", "")
	if(username.length >= 0){
	  response.statusCode = 200;
	  //response.setHeader('Content-Type', 'text/plain');
	  //removed because: 'Can't set headers after they are sent'
	  response.write("Header\n");

		//get json from treehouse
	  var studentProfile = new Profile(username);

		//on end
		studentProfile.on("end", function(profileJSON){
		 //show profile

		 //store values which we need
		 var values = {
		 	avatarUrl: profileJSON.gravatar_url,
			 username: profileJSON.profile_name,
			 badges: profileJSON.badges.length,
			 javaScriptPoints: profileJSON.points.JavaScript
		 }//end of values-object
		 //simple response
		 response.write(username + "\n");
		 response.write(values.username + " has " + values.badges + "  badges \n");

		 response.end("Footer1\n");
		});// end of studentprofile on-end-handler

		//on error
		studentProfile.on("error", function(error){
		 //show error
			response.write(error.message + "\n");
			response.end("Footer2\n");
		});// end of studentprofile on-error-handler

	}//end of if-statement
}//end of userRoute()

module.exports.home = home;
module.exports.user = user;
