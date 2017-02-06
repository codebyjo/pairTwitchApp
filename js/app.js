$(document).ready(function () {

  var userArray = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "brunofin", "comster404", "habathcx", "RobotCaleb", "noobs2ninjas"];

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
    $(".Online").fadeIn();
    $(".Offline").fadeIn();
  });

  $(".onlineUsers").click(function () {
    $(".Online").fadeIn();
    $(".Offline").fadeOut();
  });

  $(".offlineUsers").click(function () {
    $(".Offline").fadeIn();
    $(".Online").fadeOut();
  });

  userArray.forEach(function (user) {

    $.ajax("https://wind-bow.gomix.me/twitch-api/streams/" + user, {
      jsonp: 'callback',
      dataType: 'jsonp',
      data: {id: 123}
    }).then(function (firstResponse) {

      var userStatus = new Object();

      userStatus.name = user;
      userStatus.live = firstResponse.stream;

      $.ajax("https://wind-bow.gomix.me/twitch-api/channels/" + user, {
        jsonp: 'callback',
        dataType: 'jsonp',
        data: {id: 123}
      }).then(function (secondResponse) {

        // food for thought: When userStatus is created in this loop, but the next loop iteration has started and this API call has just finished, does JavaScript know that this userStatus is refering to the version of the previous loop iteration?
        userStatus.data = secondResponse;

        loadHTML(userStatus);
      });

    });

  });

  function loadHTML(user) {

    var userLogo;
    var onlineStatus;
    var classStatus;
    var streamImage = "";
    var userValid = "";

    if (user.live === null) {
      onlineStatus = "Offline";
    } else {
      onlineStatus = "Online";
    }

    if (user.data.status === 404) {
      userLogo = "<div class='col-lg-3'><span style='font-size:240px;' class='glyphicon glyphicon-remove-sign'></span></div>";
      userValid = "<p>" + user.name + " does not exist or was banhammered!</p>";
      classStatus = "Offline";
    } else {
      userLogo = "<div class='col-lg-3'><img class='img-circle' width='240' height='240'" + "src='" + user.data.logo + "'></div>";
      classStatus = "Offline";

      if (onlineStatus === "Online") {
        streamImage = "<img src='" + user.live.preview.medium + "' width='360' height='240'>";
        userValid = "<p>" + user.name + " is streaming " + user.live.game + "<p>";
        classStatus = "Online";
      }
    }


    $(".streaming").append(
      "<hr class='featurette-divider'>" +
      "<div class= 'row " + classStatus + "'>" + userLogo +
        "<div class='col-lg-4'>" +
          "<h2 class='featurette-heading'><a target='_blank' href='https://www.twitch.tv/" + user.name + "'>" + user.name + "</a><span class='text-muted'> is " + onlineStatus + "</span></h2>" + userValid +
        "</div>" +
        "<div class='col-lg-5'>" +
          streamImage +
        "</div>" +
      "</div>"
    );

  }

});
