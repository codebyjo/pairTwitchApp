$(document).ready(function() {

  userArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", , "brunofin", "comster404", "habathcx", "RobotCaleb", "noobs2ninjas"];
  userData = [];
  userStatus = [];

  userArray.forEach(function(user) {

    $.ajax("https://wind-bow.gomix.me/twitch-api/streams/" + user, {
      jsonp: 'callback',
      dataType: 'jsonp',
      data: {id: 123}
    }).then(function(response) {

      console.log(response);
      userStatus.push(response.stream);

      if (response.stream) {
        console.log("The user " + user + " is online!");
      }else {
        console.log("The user " + user + " is offline.");
      };

    });

    $.ajax("https://wind-bow.gomix.me/twitch-api/channels/" + user, {
      jsonp: 'callback',
      dataType: 'jsonp',
      data: {id: 123}
    }).then(function(response) {

      console.log(response);
      userData.push(response.stream);

    });

    console.log(userStatus);

  });



//Function which checks if the Channel exists, and gathers the channel data and streaming data
function setUserData (userArray) {  

    userArray.forEach(function (value) {
        $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + value , function(data) {
            var channelDetails = {
                 "logo" : data.logo || "https://d30y9cdsu7xlg0.cloudfront.net/png/90580-200.png", //Adds a default logo to deleted/non-existing accounts 
                 "name" : data.display_name || value, //Adds the name of the channel, if doesn't exist in data the default is 'value'
                 "exists" : (data.error) ? false : true, //Checks if the channel exists or not
                 "status" : "offline", // If a channel exists it checks for the status (online/offline) default value is offline
                 "class"  : value.toLowerCase().substr(0,15) // converts the channel name to a substr of max. 15 characters to be used as a class name
            }
            
            $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + value ,function(data) {
                var innerHtml = 'Offline' ; //Default value for offline channels 
                
                if(channelDetails.exists == false) {
                    //Sets the values if the channel is closed/ doesn't exist
                    channelDetails.status = "disabled";
                    var innerHtml = "Account Closed / Doesn't exist";
                }
                else if(data.stream !== null) { 
                  //Sets the values for a channel online
                    channelDetails.status = "online";
                    innerHtml = data.stream.channel.game + " - "+ data.stream.channel.status;
                }
                addElements(channelDetails, innerHtml);
            });
            
        });    
    });
}

//Adds the channels to the DOM after gatherin stream & channel data
function addElements(channel, innerHtml) {
    if(channel.exists === true) { 
        var Url = "https://www.twitch.tv/" + channel.name; //url with the "channel.name" for existing channels
    }
    else {
        Url = '#';
    }
    $("#streaming").append("<div class='row "+ channel.status + "' id='" + channel.class +"'>"+
        "<div class='col-xs-2 col-sm-2'><img class='img-custom' " + "src='" + channel.logo +"'></div>"+ 
        "<div class='col-xs-10 col-sm-3'><p><a target='_blank' href='" + 
                           Url + "'>" + channel.name + "</a></p></div>" + 
        "<div class='col-xs-10 col-sm-7'><p class='hidden-xs'>" + innerHtml + "</p></div> </div>");
   
}
//Event listener to add the caret symbol to indicate the channels
$(".status div").on('click',function () {
    $(".status div").removeClass('element');
    $(this).addClass('element');
});
//Click events to show/hide channels online/offline

//Shows all channels
$("#all").click(function () {
    $("#streaming .row").show();
})

//Shows only online channels
$("#onlineUsers").click(function () {
    $("#streaming .row").show();
    $("#streaming .offlineUsers, #streaming .disabled").hide();
})

//Shows offline and deleted channels
$("#offlineUsers").click(function () {
    $("#streaming .row").show();
    $("#streaming .onlineUsers").hide();
})



//Function call to execute 
setUserData(userArray);


});

