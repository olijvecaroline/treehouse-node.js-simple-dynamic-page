var renderer = require("fs");

function mergeValues(values,content){
  for(var key in values){
    content = content.replace("{{"+key+"}}",values[key]);
  }
  return content;
}

function view(templateName, values, response){
  
  var fileContents = fs.readFileSync('./views/' + templateName + '.html');
  fileContents = mergeValues(values,fileContents)
  response.write(fileContents);
}
module.exports.view = view;
