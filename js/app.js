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
    var onlineStatus;
    var streamImage = "";
    var userValid = "";

    if (user.live == null) {
      onlineStatus = "Offline";
    } else {
      onlineStatus = "Online";
    }

    if (user.data.status == 404) {
      userLogo = "<div class='col-lg-3'><img class='img-circle' width='240' height='240'" + "<span class='glyphicon glyphicon-remove-sign'></span></div>";
      userValid = "<p>" + user.name + " does not exist or was banhammered!</p>"
    } else {
      userLogo = "<div class='col-lg-3'><img class='img-circle' width='240' height='240'" + "src='" + user.data.logo + "'></div>";

      if (onlineStatus == "Online") {
        streamImage = "<img src='" + user.live.preview.medium + "' width='400' height='240'>";
        userValid = "<p>" + user.name + " is streaming " + user.live.game + "<p>";
      }
    }


    $(".streaming").append(
      "<hr class='featurette-divider'>" +
      "<div class= 'row'>" + userLogo +
        "<div class='col-lg-3'>" +
          "<h2 class='featurette-heading'><a target='_blank' href='https://www.twitch.tv/" + user.name + "'>" + user.name + "</a><span class='text-muted'> is " + onlineStatus + "</span></h2>" + userValid +
        "</div>" +
            "<div class='row'>" +
            "</div>" +
        "<div class='col-lg-5'>" +
          streamImage +
        "</div>" +
      "</div>"
    );

  };

});