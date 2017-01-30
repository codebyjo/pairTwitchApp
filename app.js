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

        if(userStatus == "offline") {
          var url = "https://www.twitch.tv/" + userData.name; //url with the "channel.name" for existing channels
        }
        else {
          url = '#';
        }

        $(".streaming").append(
          "<div class='row "+ userData.status + "' id='" + user +"'>"+
          "<div class='col-sm-3'><img class='img-circle' width='150' height='150'" + "src='" + userData.logo +"'></div>"+
          "<div class='col-sm-3'><p><a target='_blank' href=" + url + ">" + userData.name + "</a></p></div>" +
           "<div class='col-sm-6'>" + /*innerHTML*/ "#" + "</div></div>"
        );


        $(".userStatus div").on('click',function () {
            $(".userStatus div").removeClass('element');
            $(this).addClass('element');
        });

        $(".allUsers").click(function () {
            $(".streaming").show();
        })

        $(".onlineUsers").click(function () {
            $(".streaming").show();
            $(".streaming .offlineUsers").hide();
        })

        $(".offlineUsers").click(function () {
            $(".streaming").show();
            $(".streaming .onlineUsers").hide();
        })

        console.log("The Script has finished.");
      });

    });

  });

});
