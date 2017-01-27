$(document).ready(function() {

  userArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", , "brunofin", "comster404", "habathcx", "RobotCaleb", "noobs2ninjas"];

  userArray.forEach(function(user) {

    $.ajax("https://wind-bow.gomix.me/twitch-api/streams/" + user, {
      jsonp: 'callback',
      dataType: 'jsonp',
      data: {id: 123}
    }).then(function(firstResponse) {

      userStatus = firstResponse.stream;

      // FIX THIS

      if (firstResponse.stream) {
        userStatus = "Online";
      }else {
        userStatus = "Offline";
      };

      console.log(userStatus);


      $.ajax("https://wind-bow.gomix.me/twitch-api/channels/" + user, {
        jsonp: 'callback',
        dataType: 'jsonp',
        data: {id: 123}
      }).then(function(secondResponse) {
        // EVERYTHING GOES IN HERE
        userData = secondResponse;

        console.log(user);

        if(userStatus == "Offline") {
          var url = "https://www.twitch.tv/" + userData.name; //url with the "channel.name" for existing channels
        }
        else {
          url = '#';
        }

        $(".streaming").append(
          "<div class='row "+ userData.status + "' id='" + user +"'>"+
          "<div class='col-xs-2 col-sm-2'><img class='img-custom' " + "src='" + userData.logo +"'></div>"+
          "<div class='col-xs-10 col-sm-3'><p><a target='_blank' href=" + url + ">" + userData.name + "</a></p></div>" +
          "<div class='col-xs-10 col-sm-7'><p class='hidden-xs'>" + /*innerHTML*/ "#" + "</p></div> </div>"
        );

        $(".status div").on('click',function () {
            $(".status div").removeClass('element');
            $(this).addClass('element');
        });

        $("#all").click(function () {
            $("#streaming .row").show();
        })

        $("#onlineUsers").click(function () {
            $("#streaming .row").show();
            $("#streaming .offlineUsers, #streaming .disabled").hide();
        })

        $("#offlineUsers").click(function () {
            $("#streaming .row").show();
            $("#streaming .onlineUsers").hide();
        })

        console.log("The Script has finished.");
      });

    });

  });

});
