$(function () {
  $('#submit-button').on('click', function (event) {
    event.preventDefault();
    var city = $('#city-input').val();
    var queryURL =
      'http://api.openweathermap.org/data/2.5/weather?q=' +
      city +
      '&appid=23cadb273565bbb0f7aaa7a5b98a990a';

    $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function (response) {
      console.log(response);
    });
  });
});
