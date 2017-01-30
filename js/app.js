$(document).ready(function() {

  userArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "brunofin", "comster404", "habathcx", "RobotCaleb", "noobs2ninjas"];

  /*

  $(".userStatus div").on('click',function () {
      $(".userStatus div").removeClass('element');
      $(this).addClass('element');
  });

  $("#statusBar").click(function () {
      $(".streaming").show();
  })

  */

  $(".allUsers").click(function () {
    $(".row .Online").fadeIn();
    $(".row .Offline").fadeIn();
  })

  $(".onlineUsers").click(function () {
    $(".row .Online").fadeIn();
    $(".row .Offline").fadeOut();
  })

  $(".offlineUsers").click(function () {
    $(".row .Offline").fadeIn();
    $(".row .Online").fadeOut();
  })

  userArray.forEach(function(user) {

    $.ajax("https://wind-bow.gomix.me/twitch-api/streams/" + user, {
      jsonp: 'callback',
      dataType: 'jsonp',
      data: {id: 123}
    }).then(function(firstResponse) {

      var userStatus = new Object();

      userStatus.name = user;
      userStatus.live = firstResponse.stream;

      $.ajax("https://wind-bow.gomix.me/twitch-api/channels/" + user, {
        jsonp: 'callback',
        dataType: 'jsonp',
        data: {id: 123}
      }).then(function(secondResponse) {

        // food for thought: When userStatus is created in this loop, but the next loop iteration has started and this API call has just finished, does JavaScript know that this userStatus is refering to the version of the previous loop iteration?
        userStatus.data = secondResponse;

        loadHTML(userStatus);
      });

    });

  });

  function loadHTML(user) {

    var userLogo;
    var userStatus;
    var onlineStatus;

    if (user.live == null) {
      onlineStatus = "Offline";
    } else {
      onlineStatus = "Online";
    }

    if (user.data.status == 404) {
      userLogo = "<div class='col-sm-4'><img class='img-circle' width='150' height='150'" + "src='http://placehold.it/150x150'></div>";
      userStatus = "<div class='col-sm-4'>" + user.name + " does not exist or was banhammered!</div>"
    } else {
      userLogo = "<div class='col-sm-4'><img class='img-circle' width='150' height='150'" + "src='" + user.data.logo + "'></div>";
      userStatus = "<div class='col-sm-4'>" + user.name + " is currently " + "<a target='_blank' href=" + "https://www.twitch.tv/" + user.name + ">" + onlineStatus + "!</a>"

      if (onlineStatus == "Online") {
        userStatus += "<p>" + user.name + " is streaming " + user.live.game + "<p><img src='" + user.live.preview.medium + "' width='320' height='180'>";

        console.log(user.live.preview.medium);
      }

      userStatus += "</div>";
    }

    $(".streaming").append(
      "<div class='row " + onlineStatus + "' id='" + user.name + "'>" + userLogo +
      "<div class='col-sm-4'><p><a target='_blank' href=" + "https://www.twitch.tv/" + user.name + ">" + user.name + "</a></p></div>" + userStatus + "</div>"
    );

  };

});
