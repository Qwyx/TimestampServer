var express = require('express');
var app = express();
var portNumber = process.env.PORT;


app.get(
  '/',
  function(request, response) {
    response.setHeader('Content-Type', 'text/plain');
    response.write('Timestamp Microservice\n\n');
    response.write('example:  ../1234567890000 or ../February 13, 2009 \n\n');
    response.write('returns JSON:  {"unix:":1234567890000,"natural":"February 13, 2009"}');
    response.end();
  }
);


app.get('/:time', listener);


function listener(request, response) {
  var timeObject = {unix: null, natural: null};
  var requestedTime = request.params.time;

  
  if ( isNaN(requestedTime) == true) {
    
    if ( isNaN( Date.parse(requestedTime) ) == false) {      
      timeObject.unix = Date.parse(requestedTime);
      timeObject.natural = requestedTime;
    }
               
  }
  else {
    timeObject.unix = +requestedTime;
    
    var dateObject = new Date(+requestedTime);        
    
    var month = "";
    
    switch (dateObject.getMonth()) {
      case 0:
        month = "January";
        break;
        
      case 1:
        month = "February";
        break;
        
      case 2:
        month = "March";
        break;
        
      case 3:
        month = "April";
        break;
        
      case 4:
        month = "May";
        break;
        
      case 5:
        month = "June";
        break;
        
      case 6:
        month = "July";
        break;
        
      case 7:
        month = "August";
        break;
        
      case 8:
        month = "September";
        break;
        
      case 9:
        month = "October";
        break;
        
      case 10:
        month = "November";
        break;
        
      case 11:
        month = "December";
        break;
    }
    
    var naturalDate = month
                    + " "
                    + dateObject.getDate()
                    + ", "
                    + dateObject.getFullYear();
                          
    timeObject.natural = naturalDate;
  }

  
  response.setHeader('Content-Type', 'application/json');
  response.write(JSON.stringify(timeObject));
  response.end();
}


app.listen(portNumber);