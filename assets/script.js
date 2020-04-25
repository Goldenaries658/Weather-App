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
      error: function (xhr, ajaxOptions, thrownError) {
        if (xhr.status == 400) {
          alert('400: Invalid Input.');
        } else if (xhr.status == 404) {
          alert('404: Not Found.');
        }
      },
    }).then(function (response) {
      var icon =
        'http://openweathermap.org/img/wn/' +
        response.weather[0].icon +
        '@2x.png';
      var temp = response.main.temp - 273.15;
      var humidity = response.main.humidity + '%';
      var windSpeed = response.wind.speed + ' m/s';
      var cloudiness = response.clouds.all + '%';

      $('#city-name').text(response.name);
      $('#date').text(moment().format('MMMM Do YYYY, H:mm'));
      $('#weather-icon').attr('src', icon);
      $('#temp').text(temp.toFixed(2) + ' °C');
      $('#humidity').text('Humidity: ' + humidity);
      $('#wind-speed').text('Windspeed: ' + windSpeed);
      $('#cloudiness').text('Cloudiness: ' + cloudiness);
    });
  });
});
