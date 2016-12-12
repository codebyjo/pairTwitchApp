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

});