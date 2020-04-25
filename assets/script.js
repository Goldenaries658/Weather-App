// Function to display weather info
function displayWeatherInfo(queryURL) {
  // Calling the Open Weather Map API
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
    // Saving to local storage and increasing index
    var alreadyInHistory = 0;
    for (i = 0; i < localStorage.length; i++) {
      var historyItem = localStorage.getItem(localStorage.key(i));
      if (queryURL == historyItem) {
        alreadyInHistory = 1;
      }
    }

    if (!alreadyInHistory) {
      var index = localStorage.getItem('index');
      localStorage.setItem(index, queryURL);
      localStorage.setItem('index', parseInt(index) + 1);
    }

    // Hiding the search box
    $('#search-form').hide();
    $('#show-search-button').show();

    // Setting all variables
    var name = response.name;
    var icon =
      'http://openweathermap.org/img/wn/' +
      response.weather[0].icon +
      '@2x.png';
    var temp = response.main.temp - 273.15;
    var humidity = response.main.humidity + '%';
    var windSpeed = response.wind.speed + ' m/s';
    var cloudiness = response.clouds.all + '%';

    // Setting Display values
    $('#city-name').text(name);
    $('#date').text(moment().format('MMMM Do YYYY, H:mm'));
    $('#weather-icon').attr('src', icon);
    $('#temp').text(temp.toFixed(2) + ' °C');
    $('#humidity').text('Humidity: ' + humidity);
    $('#wind-speed').text('Windspeed: ' + windSpeed);
    $('#cloudiness').text('Cloudiness: ' + cloudiness);
  });
}

$(function () {
  // Setting an index for history entries.
  if (!localStorage.getItem('index')) {
    localStorage.setItem('index', 0);
  }

  $('#submit-button').on('click', function (event) {
    event.preventDefault();
    var city = $('#city-input').val();
    var queryURL =
      'http://api.openweathermap.org/data/2.5/weather?q=' +
      city +
      '&appid=23cadb273565bbb0f7aaa7a5b98a990a';
    displayWeatherInfo(queryURL);
  });

  // Displaying search
  $('#show-search-button').on('click', function (e) {
    e.preventDefault();
    $('#search-form').show();
    $('#show-search-button').hide();
  });
});
